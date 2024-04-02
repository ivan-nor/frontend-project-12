/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import filter from 'leo-profanity'

import { selectors as channelsSelectors, fetchChannels, setActiveId } from '../../slices/channelsSlice.js'
import { selectors as messagesSelectors, fetchMessages, addMessage } from '../../slices/messagesSlice.js'
import { initSocket } from '../../slices/socketSlice.js'

import ChatComponent from '../ui/Chat.jsx'
import getModal from '../modals/modals.js'
import { setCurrentChannel } from '../../slices/usersSlice.js'

const ChatPage = () => {
  const dispatch = useDispatch()
  const messages = useSelector(messagesSelectors.selectAll)
  const channels = useSelector(channelsSelectors.selectAll)
  const user = useSelector((state) => state.users.currentUser)
  const activeId = useSelector((state) => state.channels.activeId)

  const currentChannel = useSelector((state) => state.channels.currentChannel)
  const [modalState, setModalState] = useState({ type: null, item: null })

  const hideModal = () => setModalState({ type: null, item: null })
  const showModal = (type, item = null) => setModalState({ type, item })

  useEffect(() => { // загрузка сообщений и каналов при старте, установка активной вкладки
    dispatch(fetchMessages())
    dispatch(fetchChannels())
    dispatch(setActiveId(channels[0]?.id))
    dispatch(initSocket())
  }, [])

  useEffect(() => {
    if (!activeId && channels.length > 0) {
      dispatch(setActiveId(channels[0]?.id))
      dispatch(setCurrentChannel(channels.filter(({ id }) => id === activeId)))
    }
  }, [channels, activeId])

  const handleSendMessage = async (body) => {
    const newMessage = { body, channelId: activeId, username: user.username }
    try {
      const response = dispatch(addMessage(newMessage)).unwrap()
      console.info('ChatPage success addMesage', response)
    } catch (err) {
      console.err(err)
    }
  }

  const renderModal = (modalState, hideModal) => {
    if (!modalState.type) {
      return null
    }

    const Component = getModal(modalState.type)
    return <Component channel={modalState.item} onHide={hideModal} />
  }

  const handleSetActiveId = (id) => dispatch(setActiveId(id))

  return (
    <>
      <ChatComponent
        handleSendMessage={handleSendMessage}
        handleActiveTab={handleSetActiveId}
        hideModal={hideModal}
        showModal={showModal}
        channels={channels}
        currentChannel={currentChannel}
        activeId={activeId}
      />

      {renderModal(modalState, hideModal)}
    </>
  )
}

export default ChatPage

/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import filter from 'leo-profanity'

import { selectors as channelsSelectors, fetchChannels } from '../../slices/channelsSlice.js'
import { selectors as messagesSelectors, fetchMessages, addMessage } from '../../slices/messagesSlice.js'
import { initSocket } from '../../slices/socketSlice.js'

import ChatComponent from '../ui/ChatComponent'
import getModal from '../modals/modals.js'

export default function ChatPage () {
  const dispatch = useDispatch()
  const messages = useSelector(messagesSelectors.selectAll)
  const channels = useSelector(channelsSelectors.selectAll)
  const user = useSelector(state => state.users.currentUser)

  const [activeId, setActiveId] = useState(null)
  const currentChannel = useSelector((state) => channelsSelectors.selectById(state, activeId))
  const [modalState, setModalState] = useState({ type: null, item: null })

  const hideModal = () => setModalState({ type: null, item: null })
  const showModal = (type, item = null) => setModalState({ type, item })

  useEffect(() => { // загрузка сообщений и каналов при старте, установка активной вкладки
    dispatch(fetchMessages())
    dispatch(fetchChannels())
    setActiveId(channels[0]?.id)
    // setCurrentChannel(channels[0])
    dispatch(initSocket())
    filter.loadDictionary('ru')
  }, [])

  useEffect(() => { // #TODO Доработать установку активной вкладки
    if (!modalState.type || !currentChannel) {
      setActiveId(channels[channels.length - 1]?.id)
    } else {
      setActiveId(channels[0]?.id)
    }
    console.log('set activeId')
  }, [channels])

  // useEffect(() => {
  //   console.log('effect set curr channel', activeId, currentChannel)
  //   // setCurrentChannel(currentChannel)
  // }, [activeId])

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

  const handleSetActiveId = (id = channels[0].id) => setActiveId(id)

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

/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { selectors as channelsSelectors, fetchChannels } from '../../slices/channelsSlice.js'
import { selectors as messagesSelectors, fetchMessages, addMessage } from '../../slices/messagesSlice.js'
import { selectors as usersSelector } from '../../slices/usersSlice.js'

import ChatComponent from '../ui/ChatComponent'
import ChannelsComponent from '../ui/ChannelsComponent'
import InputMessageComponent from '../ui/InputMessageComponent'
import ChatWindow from '../ui/ChatWindow'
import getModal from '../modals/modals.js'

// #TODO перенести сюда всю логику и сделать чат инпут модалку и каналы глупыми компонентами
export default function ChatPage () {
  const dispatch = useDispatch()
  const messages = useSelector(messagesSelectors.selectAll)
  const channels = useSelector(channelsSelectors.selectAll)
  const user = useSelector(state => state.users.currentUser)
  const [activeId, setActiveId] = useState(null)
  const [modalState, setModalState] = useState({ type: null, item: null })

  const hideModal = () => setModalState({ type: null, item: null })
  const showModal = (type, item = null) => setModalState({ type, item })

  useEffect(() => { // загрузка сообщений и каналов при старте, установка активной вкладки
    dispatch(fetchMessages())
    dispatch(fetchChannels())
    setActiveId(channels[0]?.id)
  }, [])

  // #TODO возможно стоит убрать активную вкладку в ChatComponent
  useEffect(() => { // установка активной вкладки
    if (!modalState.type) {
      setActiveId(channels[channels.length - 1]?.id)
    } else {
      setActiveId(channels[0]?.id)
    }
  }, [channels])

  const handleSendMessage = (body) => { // обработка отправки сообщения
    const newMessage = { body, channelId: activeId, username: user.username }
    dispatch(addMessage(newMessage))
  }

  const renderModal = (modalState, hideModal) => {
    if (!modalState.type) {
      return null
    }

    const Component = getModal(modalState.type)
    return <Component channel={modalState.item} onHide={hideModal} />
  }

  // #TODO изменить на вложенную структуру компонентов
  return (
    <>
      <ChatComponent
        handleSendMessage={handleSendMessage}
        handleActiveTab={(id = channels[0].id) => setActiveId(id)}
        activeId={activeId}
        hideModal={hideModal}
        showModal={showModal}
        channels={channels}
      />
      {renderModal(modalState, hideModal)}
    </>
  )
}

/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { selectors as channelsSelectors, fetchChannels } from '../../slices/channelsSlice.js'
import { selectors as messagesSelectors, fetchMessages, addMessage } from '../../slices/messagesSlice.js'

import ChatComponent from '../ui/ChatComponent'
import ChannelsComponent from '../ui/ChannelsComponent'
import InputMessageComponent from '../ui/InputMessageComponent'
import ChatWindow from '../ui/ChatWindow'
import getModal from '../../modals.js'

// #TODO перенести сюда всю логику и сделать чат инпут и каналы глупыми компонентами
export default function ChatPage () {
  const dispatch = useDispatch()
  const messages = useSelector(messagesSelectors.selectAll)
  const channels = useSelector(channelsSelectors.selectAll)
  const [activeId, setActiveId] = useState(null)
  const [modalState, setModalState] = useState({ type: null, item: null })

  const hideModal = () => setModalState({ type: null, item: null })
  const showModal = (type, item = null) => setModalState({ type, item })

  useEffect(() => { // загрузка сообщений и каналов при старте
    dispatch(fetchMessages())
    dispatch(fetchChannels())

    // console.log('CHAT PAGE', channels)
    setActiveId(channels[0]?.id)
  }, [])

  useEffect(() => { // установка активной вкладки
    // console.log('EFFECT', channels, activeId, Object.values(channels), channels[0]?.id)

    if (!activeId && Object.values(channels).length > 0) {
      setActiveId(channels[0].id)
    }
    console.log('CHAT PAGE channels updated', channels)
  }, [channels])

  useEffect(() => console.log('CHAT PAGE modalState', modalState), [modalState])

  const handleSendMessage = (body) => { // обработка отправки сообщения
    const newMessage = { body, channelId: activeId, username: 'admin' }
    // console.log('SEND MESSAGE id', activeId, body)
    dispatch(addMessage(newMessage))
  }

  const renderModal = (modalState, hideModal) => {
    if (!modalState.type) {
      return null
    }

    const Component = getModal(modalState.type)
    return <Component channel={modalState.item} onHide={hideModal} />
  }

  return (
    <>
      <ChatComponent
        handleSendMessage={handleSendMessage}
        handleActiveTab={(id) => setActiveId(id)}
        activeId={activeId}
        hideModal={hideModal}
        showModal={showModal}
        channels={channels}
      />
      {renderModal(modalState, hideModal)}
    </>
  )
}

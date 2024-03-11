/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { selectors as channelsSelectors, fetchChannels } from '../../slices/channelsSlice.js'
import { selectors as messagesSelectors, fetchMessages, addMessage } from '../../slices/messagesSlice.js'

import ChatComponent from '../ui/ChatComponent'
import ChannelsComponent from '../ui/ChannelsComponent'
import InputMessageComponent from '../ui/InputMessageComponent'
import ChatWindow from '../ui/ChatWindow'

// #TODO перенести сюда всю логику и сделать чат инпут и каналы глупыми компонентами
export default function ChatPage () {
  const [activeId, setActiveId] = useState(null)
  const dispatch = useDispatch()
  const messages = useSelector(messagesSelectors.selectAll)
  const channels = useSelector(channelsSelectors.selectAll)

  useEffect(() => {
    dispatch(fetchMessages()) // загрузка сообщений при старте
    dispatch(fetchChannels()) // загрузка каналов при старте

    console.log('CHAT PAGE')
    setActiveId(channels[1]?.id)
  }, [])

  useEffect(() => {
    console.log('EFFECT', channels, messages, activeId, channels[0])

    if (!activeId && channels[1]?.id) {
      setActiveId(channels[1].id)
      console.log('SET aCtive ID', activeId)
    }
  }, [channels])

  const handleSubmit = (body) => {
    const newMessage = { body, channelId: activeId, username: 'admin' }
    console.log('SEND MESSAGE id', activeId, body)
    dispatch(addMessage(newMessage))
  }

  return (
    <ChatComponent handleSubmit={handleSubmit} />
  )
}

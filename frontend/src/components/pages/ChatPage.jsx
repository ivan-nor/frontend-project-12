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

    console.log('CHAT PAGE', channels)
    setActiveId(channels[0]?.id)
  }, [])

  useEffect(() => {
    console.log('EFFECT', channels, activeId, Object.values(channels), channels[0]?.id)

    if (!activeId && Object.values(channels).length > 0) {
      setActiveId(channels[0].id)
      console.log('SET aCtive ID', activeId, channels)
    }
  }, [channels])

  useEffect(() => console.log('active id', activeId), [activeId])

  const handleSubmit = (body) => {
    const newMessage = { body, channelId: activeId, username: 'admin' }
    console.log('SEND MESSAGE id', activeId, body)
    dispatch(addMessage(newMessage))
  }

  const handleEditChannel = () => {
    console.log('edit channel')
  }

  const handleRemoveChannel = () => {
    console.log('remove channel')
  }

  return (
    <ChatComponent handleSubmit={handleSubmit} handleActiveTab={(id) => setActiveId(id)} activeId={activeId} handleEditChannel={handleEditChannel} handleRemoveChannel={handleRemoveChannel}/>
  )
}

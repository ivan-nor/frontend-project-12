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
  const [text, setText] = useState('')
  const dispatch = useDispatch()

  useEffect(() => { // загрузка сообщений при старте
    dispatch(fetchMessages())
  }, [])

  useEffect(() => { // загрузка каналов при старте
    dispatch(fetchChannels())
  }, [])

  useEffect(() => console.log('CHAT PAGE'), [])

  const handleChange = (e) => {
    setText(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newMessage = { body: text, channelId: activeId, username: 'admin' }
    console.log('SEND MESSAGE id', activeId, text)
    dispatch(addMessage(newMessage))
    setText('')
  }

  return (
    <>
      <ChatComponent />
        
      <ChatWindow />
      <InputMessageComponent handleChange={handleChange} handleSubmit={handleSubmit} value={text} />
    </>
  )
}

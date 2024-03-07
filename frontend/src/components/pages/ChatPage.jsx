import { useState, useEffect } from 'react'
import routes from '../../routes'
import axios from 'axios'

import ChatComponent from '../ui/ChatComponent'

export default function ChatPage () { // заменить все на redux entity adapter
  const [channels, setChannels] = useState([])
  const [messages, setMessages] = useState([])

  useEffect(() => { // загрузка каналов при старте
    const { token } = JSON.parse(localStorage.getItem('userId'))
    console.log(token)

    const fetchChannels = async () => {
      const res = await axios.get(routes.channelsPath(), {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setChannels(res.data)
    }
    fetchChannels()
  }, [])

  useEffect(() => { // загрузка сообщений при старте
    const { token } = JSON.parse(localStorage.getItem('userId'))

    const fetchMessages = async () => {
      const res = await axios.get(routes.messagesPath(), {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setMessages(res.data)
    }
    fetchMessages()
  }, [])

  useEffect(() => console.log(channels, messages), [channels, messages])

  return (
    <ChatComponent channels={channels} messages={messages} />
  )
}

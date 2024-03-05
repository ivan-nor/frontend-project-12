import { useState, useEffect } from 'react'
import routes from '../../routes'
import axios from 'axios'

import ChatComponent from '../ui/ChatComponent'
import ChannelsComponent from '../ui/ChannelsComponent'
import InputMessageComponent from '../ui/InputMessageComponent'

export default function ChatPage () {
  const [channels, setChannels] = useState([])

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

  useEffect(() => console.log(channels), [channels])

  return (
    <ChatComponent>
      <ChannelsComponent channels={channels}/>
      <InputMessageComponent />
    </ChatComponent>
  )
}

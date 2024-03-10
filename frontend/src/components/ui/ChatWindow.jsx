/* eslint-disable react/prop-types */
import { useEffect } from 'react'
// import { useSelector } from 'react-redux'
// import { selectors } from '../../slices/messagesSlice'

const ChatWindow = ({ id, messages }) => {
  // const messages = useSelector((state) => selectors.selectById(state, id))
  // const currentMessages = messages.filter(({ channelId }) => channelId === id)

  useEffect(() => console.log('CHAT WINDOW', messages))

  return (
    <>
      <h1>CHAT WINDOW {id}</h1>
      <ul>
        {messages.map((message) => (
          <li key={message.id}>USER: {message.username} | MESSAGE: {message.body}</li>
        ))}
      </ul>
    </>
  )
}

export default ChatWindow

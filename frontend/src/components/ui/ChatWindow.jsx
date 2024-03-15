/* eslint-disable react/prop-types */
import { useSelector } from 'react-redux'
import { messagesOfChannelSelector } from '../../slices/messagesSlice'

const ChatWindow = ({ channel }) => {
  const { id, name } = channel
  const messages = useSelector(messagesOfChannelSelector(id))

  return (
    <>
      <h1>CHAT WINDOW {id} {name}</h1>
      <ul>
        {messages?.map((message) => (
          <li key={message.id}>USER: {message.username} | MESSAGE: {message.body}</li>
        ))}
      </ul>
    </>
  )
}

export default ChatWindow

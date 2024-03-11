/* eslint-disable react/prop-types */
import { useEffect, memo } from 'react'
import { useSelector } from 'react-redux'
import { selectors } from '../../slices/messagesSlice'

const ChatWindow = ({ id }) => {
  const messages = useSelector((state) => {
    const currentMessages = selectors.selectById(state, id)
    const messages = selectors.selectAll(state)
    console.log('CaT WINDOW curr messages', id, typeof id, selectors.selectById, currentMessages, messages)

    if (!currentMessages) {
      return []
    }

    return currentMessages
  })
  // const currentMessages = messages.filter(({ channelId }) => channelId === id)

  // useEffect(() => console.log('CHAT WINDOW', messages, id))

  const ChatTitle = memo(function ChatTitle ({ id }) {
    return <h1>CHAT WINDOW {id}</h1>
  })

  return (
    <>
      <ChatTitle id={id} />
      <ul>
        {messages?.map((message) => (
          <li key={message.id}>USER: {message.username} | MESSAGE: {message.body}</li>
        ))}
      </ul>
    </>
  )
}

export default ChatWindow

/* eslint-disable react/prop-types */
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { selectors, messagesOfChannelSelector } from '../../slices/messagesSlice'

const ChatWindow = ({ id }) => {
  // const messages = useSelector((state) => {
  //   const messages = selectors.selectAll(state)
  //   const currentMessages = Object.values(messages).filter(({ channelId }) => channelId === id)
  //   console.log('CaT WINDOW curr messages', id, messages, currentMessages)

  //   if (!currentMessages) {
  //     return []
  //   }

  //   return currentMessages
  // })

  const messages = useSelector(messagesOfChannelSelector(id))

  // useEffect(() => console.log('CHAT WINDOW rerender?', id, messages), [id, messages])

  return (
    <>
      <h1>CHAT WINDOW {id}</h1>
      <ul>
        {messages?.map((message) => (
          <li key={message.id}>USER: {message.username} | MESSAGE: {message.body}</li>
        ))}
      </ul>
    </>
  )
}

export default ChatWindow

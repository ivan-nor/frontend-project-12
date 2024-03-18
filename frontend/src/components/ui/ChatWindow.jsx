/* eslint-disable react/prop-types */
import { useSelector } from 'react-redux'
import { messagesOfChannelSelector } from '../../slices/messagesSlice'
import { Container } from 'react-bootstrap'

const ChatWindow = ({ activeId, currentChannel: channel }) => {
  const messages = useSelector(messagesOfChannelSelector(activeId))

  return (
    <Container>
      <h1>CHAT WINDOW {channel?.id} {channel?.name}</h1>
      <div className='overflow-scroll'>
        <ul>
          {messages?.map((message) => (
            <li key={message.id}>USER: {message.username} | MESSAGE: {message.body}</li>
          ))}
        </ul>
      </div>
    </Container>
  )
}

export default ChatWindow

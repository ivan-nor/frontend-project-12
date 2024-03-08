/* eslint-disable react/prop-types */

const ChatWindow = (props) => {
  console.log(props.channels)
  return (
    <div>CHAT WINDOW {props?.channels?.id} | {props?.channels?.name}</div>
    // <div>CHAT WINDOW </div>
  )
}

export default ChatWindow

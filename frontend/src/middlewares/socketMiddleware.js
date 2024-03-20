import SocketFactory from './SocketFactory'
import { connectionEstablished, initSocket, connectionLost } from '../slices/socketSlice'
import { setMessageSync } from '../slices/messagesSlice'
import { addChannelSync, renameChannelSync, removeChannelSync } from '../slices/channelsSlice'

const socketMiddleware = (store) => {
  let socket

  return (next) => (action) => {
    // console.table('MIDDLSW', action, initSocket.match(action), setMessageSync.match(action))

    if (initSocket.match(action)) {
      if (!socket && typeof window !== 'undefined') {
        socket = SocketFactory.create()

        // console.log(socket.socket)

        socket.socket.on('connect', () => {
          store.dispatch(connectionEstablished())
        })

        socket.socket.on('err', (message) => {
          console.error(message)
        })

        socket.socket.on('disconnect', (reason) => {
          console.log('dissconnet reason :>> ', reason)
          store.dispatch(connectionLost())
        })

        socket.socket.on('newMessage', (action) => {
          // console.log('IN SOCKET MIDDLWR', action)
          store.dispatch(setMessageSync(action))
        })

        socket.socket.on('newChannel', (payload) => {
          console.log(payload) // { id: 6, name: "new channel", removable: true }
          store.dispatch(addChannelSync(payload))
        })

        socket.socket.on('removeChannel', (payload) => {
          console.log(payload) // { id: 6 }
          store.dispatch(removeChannelSync(payload))
        })

        socket.socket.on('renameChannel', (payload) => {
          console.log(payload) // { id: 7, name: "new name channel", removable: true }
          store.dispatch(renameChannelSync(payload))
        })
      }
    }

    next(action)
  }
}

export default socketMiddleware

/* eslint-disable max-classes-per-file */
import { io } from 'socket.io-client'
import { connectionEstablished, initSocket, connectionLost } from '../slices/socketSlice'
import { setMessageSync } from '../slices/messagesSlice'
import { addChannelSync, renameChannelSync, removeChannelSync } from '../slices/channelsSlice'

class SocketConnection {
  constructor () {
    this.socket = io()
  }
}

let socketConnection

class SocketFactory {
  static create () {
    if (!socketConnection) {
      socketConnection = new SocketConnection()
    }
    return socketConnection
  }
}

const socketMiddleware = (store) => {
  let socket

  return (next) => (action) => {
    if (initSocket.match(action)) {
      if (!socket && typeof window !== 'undefined') {
        socket = SocketFactory.create()

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

        socket.socket.on('newMessage', (payload) => {
          console.log('IN SOCKET MIDDLWR', payload)
          store.dispatch(setMessageSync(payload))
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

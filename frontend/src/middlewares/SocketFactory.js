import { io } from 'socket.io-client'

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

export default SocketFactory

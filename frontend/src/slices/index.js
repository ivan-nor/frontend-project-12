import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice.js'
import messagesReducer from './messagesSlice.js'
import channelsReducer from './channelsSlice.js'

export default configureStore({
  reducer: {
    user: userReducer,
    messages: messagesReducer,
    channels: channelsReducer
  }
})

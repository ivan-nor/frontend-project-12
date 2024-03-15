import { configureStore } from '@reduxjs/toolkit'
import usersReducer from './usersSlice.js'
import messagesReducer from './messagesSlice.js'
import channelsReducer from './channelsSlice.js'

export default configureStore({
  reducer: {
    users: usersReducer,
    messages: messagesReducer,
    channels: channelsReducer
  }
})

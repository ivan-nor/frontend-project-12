/* eslint-disable no-param-reassign */
import axios from 'axios'

import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit'
import routes from '../routes'

const { token } = JSON.parse(localStorage.getItem('userId')) // брать из редакса, начальное состояние, отдельный слайс
console.log(token)
const headers = { Authorization: `Bearer ${token}` }

export const fetchMessages = createAsyncThunk(
  'messages/fetchMessages',
  async () => {
    const response = await axios.get(routes.messagesPath(), { headers })
    console.log('fetch messages', response.data)
    return response.data // =>[{ id: '1', body: 'text message', channelId: '1', username: 'admin }, ...]
  }
)

export const addMessage = createAsyncThunk(
  'messages/addMessage',
  async (newMessage) => {
    const response = await axios.post(routes.messagesPath(), newMessage, { headers })
    return response.data // { id: '1', body: 'new message', channelId: '1', username: 'admin }
  }
)

export const editMessage = createAsyncThunk(
  'messages/editMessage',
  async ({ body, id }) => {
    const editedMessage = { body: 'new body message' }
    const response = await axios.patch(routes.messagePath(id), editedMessage, { headers })
    return response.data // => { id: '1', body: 'new body message', channelId: '1', username: 'admin }
  }
)

export const removeMessage = createAsyncThunk(
  'messages/removeMessage',
  async ({ id }) => {
    const editedMessage = { body: 'new body message' }
    const response = await axios.delete(routes.messagePath(id), editedMessage, { headers })
    return response.data // => { id: '3' }
  }
)

const messagesAdapter = createEntityAdapter()

const initialState = messagesAdapter.getInitialState()

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.fulfilled, (state, action) => {
        console.log('fetch messages', action)
        messagesAdapter.addMany(state, action.payload)
      })
      .addCase(addMessage.fulfilled, (state, action) => {
        messagesAdapter.addOne(state, action.payload)
      })
      .addCase(editMessage.fulfilled, (state, action) => {
        messagesAdapter.addOne(state, action.payload) // изменить одну сущность
      })
      .addCase(removeMessage.fulfilled, (state, action) => { // filter entities
        messagesAdapter.removeOne(state, action.payload)
      })
  }
})

export const { actions } = messagesSlice
export const selectors = messagesAdapter.getSelectors((state) => state.messages)
export default messagesSlice.reducer
// END

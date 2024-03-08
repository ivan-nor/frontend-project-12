/* eslint-disable no-param-reassign */
import axios from 'axios'

import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit'
import routes from '../routes'

export const fetchMessages = createAsyncThunk(
  'messages/fetchMessages',
  async () => {
    const response = await axios.get(routes.messagesPath())
    return response.data.items
  }
)

export const createMessage = createAsyncThunk(
  'messages/createMessage',
  async (name) => {
    const response = await axios.post(routes.messagesPath(), { name })
    return response.data
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
        messagesAdapter.addMany(state, action.payload)
      })
  }
})

export const { actions } = messagesSlice
export default messagesSlice.reducer
// END

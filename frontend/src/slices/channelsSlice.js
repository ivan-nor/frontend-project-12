/* eslint-disable no-param-reassign */
import axios from 'axios'

import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit'
import routes from '../routes'

export const fetchChannels = createAsyncThunk(
  'channels/fetchChannels',
  async () => {
    const response = await axios.get(routes.channelsPath())
    return response.data.items
  }
)

export const createChannel = createAsyncThunk(
  'channels/createChannel',
  async (name) => {
    const response = await axios.post(routes.channelsPath(), { name })
    return response.data
  }
)

export const removeChannel = createAsyncThunk(
  'channels/removeTask',
  async (id) => {
    const response = await axios.delete(routes.channelPath(id))
    return response.data
  }
)

const channelsAdapter = createEntityAdapter()

const initialState = channelsAdapter.getInitialState()

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchChannels.fulfilled, (state, action) => {
        channelsAdapter.addMany(state, action.payload)
      })
  }
})

export const { actions } = channelsSlice
export default channelsSlice.reducer

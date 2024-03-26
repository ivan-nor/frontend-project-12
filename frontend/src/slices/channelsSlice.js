/* eslint-disable no-param-reassign */
import axios from 'axios'
import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit'
import routes from '../routes'

const getHeaders = () => {
  const { token } = JSON.parse(localStorage.getItem('userId')) // ? брать из редакса, начальное состояние, отдельный слайс
  return { headers: { Authorization: `Bearer ${token}` } }
}

export const fetchChannels = createAsyncThunk(
  'channels/fetchChannels',
  async () => {
    const res = await axios.get(routes.channelsPath(), getHeaders())
    return res.data // =>[{ id: '1', name: 'general', removable: false }, ...]
  }
)

export const addChannel = createAsyncThunk(
  'channels/addChannel',
  async ({ name }) => {
    const newChannel = { name }
    const response = await axios.post(routes.channelsPath(), newChannel, getHeaders())
    return response.data // { id: '3', name: 'new channel', removable: true }
  }
)

export const editChannel = createAsyncThunk(
  'channels/editChannel',
  async ({ name, id }) => {
    const editedChannel = { name }
    const response = await axios.patch(routes.channelPath(id), editedChannel, getHeaders())
    return response.data // => { id: '3', name: 'new name channel', removable: true }
  }
)

export const removeChannel = createAsyncThunk(
  'channels/removeChannel',
  async ({ id }) => {
    const response = await axios.delete(routes.channelPath(id), getHeaders())
    return response.data // => { id: '3' }
  }
)

const channelsAdapter = createEntityAdapter()

const initialState = channelsAdapter.getInitialState({ activeId: null })

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    addChannelSync: channelsAdapter.addOne,
    removeChannelSync: (state, action) => channelsAdapter.removeOne(state, action.payload.id),
    renameChannelSync: (state, action) => channelsAdapter.updateOne(state, { id: action.payload.id, changes: action.payload }),
    setActiveId: (state, action) => {
      state.activeId = action.payload ?? null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChannels.fulfilled, (state, action) => {
        channelsAdapter.addMany(state, action.payload)
      })
      .addCase(addChannel.fulfilled, (state, action) => {
        channelsAdapter.addOne(state, action.payload)
        state.activeId = action.payload.id
      })
      .addCase(editChannel.fulfilled, (state, action) => {
        channelsAdapter.updateOne(state, { id: action.payload.id, changes: action.payload })
        state.activeId = action.payload.id
      })
      .addCase(removeChannel.fulfilled, (state, action) => {
        channelsAdapter.removeOne(state, action.payload.id)
        state.activeId = null
      })
  }
})

export const { addChannelSync, removeChannelSync, renameChannelSync, setActiveId } = channelsSlice.actions
export const selectors = channelsAdapter.getSelectors((state) => state.channels)
export default channelsSlice.reducer

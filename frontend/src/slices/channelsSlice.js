/* eslint-disable no-param-reassign */
import axios from 'axios'

import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit'
import routes from '../routes'

let headers = {}
if (localStorage.getItem('userId')) {
  const { token } = JSON.parse(localStorage.getItem('userId')) // брать из редакса, начальное состояние, отдельный слайс
  console.log(token)
  headers = { Authorization: `Bearer ${token}` }
}

export const fetchChannels = createAsyncThunk(
  'channels/fetchChannels',
  async () => {
    const res = await axios.get(routes.channelsPath(), { headers })
    return res.data // =>[{ id: '1', name: 'general', removable: false }, ...]
  }
)

export const addChannel = createAsyncThunk(
  'channels/addChannel',
  async (name) => {
    const newChannel = { name }
    const response = await axios.post(routes.channelsPath(), newChannel, { headers })
    return response.data // { id: '3', name: 'new channel', removable: true }
  }
)

export const editChannel = createAsyncThunk(
  'channels/editChannel',
  async (name) => {
    const editedChannel = { name }
    const response = await axios.patch(routes.channelPath(), editedChannel, { headers })
    return response.data // => { id: '3', name: 'new name channel', removable: true }
  }
)

export const removeChannel = createAsyncThunk(
  'channels/removeTask',
  async (id) => {
    const response = await axios.delete(routes.channelPath(id), { headers })
    return response.data // => { id: '3' }
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
        // console.log('FETCH CAHNNELS, action', action)
        channelsAdapter.addMany(state, action.payload)
      })
      .addCase(addChannel.fulfilled, (state, action) => {
        // console.log('ADD CAHNNELS, action', action)
        channelsAdapter.addOne(state, action.payload)
      })
      .addCase(editChannel.fulfilled, (state, action) => { // #TODO изменить, в адаптере посмотеть как изменять сущность
        channelsAdapter.changeOne(state, action.payload)
      })
      .addCase(removeChannel.fulfilled, (state, { payload }) => { // #TODO узнать как правильно обновлять
        const channelsIds = payload.channels

        const restEntities = Object.values(state.entities)
          .filter((e) => !channelsIds.includes(e.id))

        channelsAdapter.setAll(state, restEntities)
      })
  }
})

export const { actions } = channelsSlice
export const selectors = channelsAdapter.getSelectors((state) => state.channels)
export default channelsSlice.reducer

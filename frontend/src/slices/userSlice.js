/* eslint-disable no-param-reassign */
import axios from 'axios'

import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit'
import routes from '../routes'

export const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async () => {
    const response = await axios.get(routes.userPath())
    return response.data.items
  }
)

// BEGIN (write your solution here)
export const createUser = createAsyncThunk(
  'user/createUser',
  async (name) => {
    const response = await axios.post(routes.userPath(), { name })
    return response.data
  }
)

const userAdapter = createEntityAdapter()

const initialState = userAdapter.getInitialState()

const userSlice = createSlice({
  name: 'user',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.fulfilled, (state, action) => {
        userAdapter.addMany(state, action.payload)
      })
      .addCase(createUser.fulfilled, (state, action) => {
        userAdapter.addOne(state, action.payload)
      })
  }
})

export const { actions } = userSlice
export default userSlice.reducer

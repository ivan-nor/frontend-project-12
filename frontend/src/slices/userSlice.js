/* eslint-disable no-param-reassign */
import axios from 'axios'

import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit'
import routes from '../routes'

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async ({ username, password }) => {
    const response = await axios.get(routes.loginPath(), { username, password })
    return response.data // => { token: ..., username: 'admin' }
  }
)

export const createUser = createAsyncThunk(
  'user/createUser',
  async ({ username, password }) => {
    const response = await axios.post(routes.signupPatn(), { username, password })
    return response.data // => { token: ..., username: 'newuser' }
  }
)

const userAdapter = createEntityAdapter()

const initialState = userAdapter.getInitialState()

const userSlice = createSlice({
  name: 'user',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        userAdapter.addMany(state, action.payload) // изменить метод
      })
      .addCase(createUser.fulfilled, (state, action) => {
        userAdapter.addOne(state, action.payload)
      })
  }
})

export const { actions } = userSlice
export const selectors = userAdapter.getSelectors((state) => state.user)
export default userSlice.reducer

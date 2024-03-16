/* eslint-disable no-param-reassign */
import axios from 'axios'
import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit'
import routes from '../routes'

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async ({ username, password }) => {
    const response = await axios.post(routes.loginPath(), { username, password })
    const { token } = response.data // => { token: ..., username: 'admin' }
    const user = { token, username, currentChannel: null, id: username }
    return user
  }
)

export const createUser = createAsyncThunk(
  'user/createUser',
  async ({ username, password }) => {
    const response = await axios.post(routes.signupPatn(), { username, password })
    return response.data // => { token: ..., username: 'newuser' }
  }
)

const usersAdapter = createEntityAdapter()

const initialState = usersAdapter.getInitialState({ loadingStatus: 'idle', error: null, currentUser: null })

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    logoutUser (state) {
      state.currentUser = null
    },
    setCurrentChannel (state, action) {
      state.currentUser = { ...state.currentUser, currentChannel: action.payload }
    },
    setCurrentUser (state, action) {
      state.currentUser = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loadingStatus = 'loading'
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.currentUser = action.payload
        state.loadingStatus = 'idle'
        state.error = null
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loadingStatus = 'failed'
        state.error = action.error
      })
      .addCase(createUser.pending, (state) => {
        state.loadingStatus = 'loading'
        state.error = null
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loadingStatus = 'idle'
        state.error = null
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loadingStatus = 'failed'
        state.error = action.error
      })
  }
})

export const { logoutUser, setCurrentChannel, setCurrentUser } = usersSlice.actions
export const selectors = usersAdapter.getSelectors((state) => state.users)
export default usersSlice.reducer

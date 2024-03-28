/* eslint-disable no-param-reassign */
import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const socketAdapter = createEntityAdapter();

const initialState = socketAdapter.getInitialState({ isConnected: false });

const socketSlice = createSlice({
  name: 'socket',
  initialState,
  reducers: {
    initSocket: () => {
      // console.log('SOCKET SLICE initSocket', state.isConnected)
    },
    connectionEstablished: (state) => {
      // console.log('SOCKET SLICE conn estab', state.isConnected)
      state.isConnected = true;
    },
    connectionLost: (state) => {
      // console.log('SOCKET SLICE conn lost', state.isConnected)
      state.isConnected = false;
    },
  },
});

export const { initSocket, connectionEstablished, connectionLost } = socketSlice.actions;
export default socketSlice.reducer;

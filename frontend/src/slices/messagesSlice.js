/* eslint-disable no-param-reassign */
import axios from 'axios';
import {
  createSlice, createEntityAdapter, createAsyncThunk, createSelector,
} from '@reduxjs/toolkit';
import routes from '../routes';
import { removeChannel } from './channelsSlice';

const getHeaders = () => {
  const { token } = JSON.parse(localStorage.getItem('userId')); // ? брать из редакса, начальное состояние, отдельный слайс
  return { headers: { Authorization: `Bearer ${token}` } };
};

export const fetchMessages = createAsyncThunk(
  'messages/fetchMessages',
  async () => {
    const response = await axios.get(routes.messagesPath(), getHeaders());
    return response.data;
    // =>[{ id: '1', body: 'text message', channelId: '1', username: 'admin }, ...]
  },
);

export const addMessage = createAsyncThunk(
  'messages/addMessage',
  async (newMessage) => {
    const response = await axios.post(routes.messagesPath(), newMessage, getHeaders());
    return response.data; // { id: '1', body: 'new message', channelId: '1', username: 'admin }
  },
);

export const messagesOfChannelSelector = (channelId) => createSelector(
  [(state) => state.messages],
  (state) => Object.values(state.entities).filter((message) => message.channelId === channelId),
);

const messagesAdapter = createEntityAdapter();

const initialState = messagesAdapter.getInitialState();

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    setMessageSync: messagesAdapter.addOne,
  },
  extraReducers: (builder) => {
    builder
      .addCase(removeChannel.fulfilled, (state, action) => {
        const channelId = action.payload;
        const restEntities = Object.values(state.entities)
          .filter((e) => e.channelIdId !== channelId);
        console.log('remove channel in mess slice', action.payload, restEntities);
        messagesAdapter.setAll(state, restEntities);
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        messagesAdapter.addMany(state, action.payload);
      })
      .addCase(addMessage.fulfilled, (state, action) => {
        messagesAdapter.addOne(state, action.payload);
      });
  },
});

export const { setMessageSync } = messagesSlice.actions;
export const selectors = messagesAdapter.getSelectors((state) => state.messages);
export default messagesSlice.reducer;
// END

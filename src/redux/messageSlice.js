import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { messageService } from "../services/MessageService";

export const getAllMessages = createAsyncThunk(
  "messages/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await messageService.getAll();
      return response;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const getOneMessage = createAsyncThunk(
  "messages/getOne",
  async (data, { rejectWithValue }) => {
    try {
      const response = await messageService.getOne(data);
      return response;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

const initialState = {
  data: [],
  singleData: {},
  loading: false,
  error: false,
  message: "",
};

const slice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    checkAll: (state) => {
      state.isChecked = !state.isChecked;
    },
    resetSingleData: (state) => {
      state.singleData = {};
    },
  },
  extraReducers: {
    [getAllMessages.pending]: (state) => {
      if (state.data.length <= 0) {
        state.loading = true;
      }
    },
    [getAllMessages.fulfilled]: (state, action) => {
      state.error = false;
      state.data = action.payload;
      state.loading = false;
    },
    [getAllMessages.rejected]: (state, action) => {
      state.error = true;
      state.message = action.payload;
      state.loading = false;
    },

    [getOneMessage.pending]: (state) => {
      state.loading = true;
    },
    [getOneMessage.fulfilled]: (state, { payload }) => {
      state.message = payload?.message;
      state.loading = false;
      state.singleData = payload;
    },
    [getOneMessage.rejected]: (state, { payload }) => {
      state.error = true;
      state.message = payload;
      state.loading = false;
    },
  },
});

export const { resetSingleData } = slice.actions;
export default slice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { messageService } from "../services/MessageService";

// ✅ Async thunks
export const getAllMessages = createAsyncThunk(
  "messages/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await messageService.getAll();
      return response;
    } catch (error) {
      return rejectWithValue(error?.response?.data || error.message);
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
      return rejectWithValue(error?.response?.data || error.message);
    }
  }
);

// ✅ Initial state
const initialState = {
  data: [],
  singleData: {},
  loading: false,
  error: null,
  message: "",
  isChecked: false, // included since you toggle it in checkAll
};

// ✅ Slice
const MessagesSlice = createSlice({
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
 
  extraReducers: (builder) => {
    builder
      .addCase(getAllMessages.pending, (state) => {
        if (state.data.length === 0) state.loading = true;
      })
      .addCase(getAllMessages.fulfilled, (state, action) => {
        state.error = null;
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(getAllMessages.rejected, (state, action) => {
        state.error = action.payload;
        state.message = action.payload;
        state.loading = false;
      })
      .addCase(getOneMessage.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOneMessage.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.singleData = payload;
        state.message = payload?.message || "";
        state.error = null;
      })
      .addCase(getOneMessage.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
        state.message = payload;
      });
  },
});

export const { checkAll, resetSingleData } = MessagesSlice.actions;
export default MessagesSlice.reducer;

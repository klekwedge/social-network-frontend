import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";
import { IUser, LoadingStatus } from "../../types";


export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (id: string) => {
    const { data } = await axios.get(`/user/${id}`);
    return data;
  }
);


interface IState {
  currentUser: IUser | null
  status: LoadingStatus
}


const initialState: IState = {
  currentUser: null,
  status: 'loading'
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.currentUser = null;
        state.status = "loading";
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.currentUser = action.payload;
        state.status = "loaded";
      })
      .addCase(fetchUser.rejected, (state) => {
        state.currentUser = null;
        state.status = "error";
      })
  },
});

export const usersReducer = userSlice.reducer;

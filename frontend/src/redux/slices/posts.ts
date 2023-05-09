import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";
import { IPost } from "../../types";

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const { data } = await axios.get("/posts");
  return data;
});

export const fetchUserPosts = createAsyncThunk("posts/fetchUserPosts", async (userId: string) => {
  const { data } = await axios.get(`/user/posts/${userId}`);
  return data;
});

export const fetchRemovePost = createAsyncThunk(
  "posts/fetchRemovePost",
  async (id) => {
    await axios.delete(`/posts/${id}`);
  }
);

const initialState = {
  posts: { items: <IPost[]>[], status: "loading" },
  userPosts: { items: <IPost[]> [], status: "loading" },
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.posts.items = [];
        state.posts.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.posts.items = action.payload;
        state.posts.status = "loaded";
      })
      .addCase(fetchPosts.rejected, (state) => {
        state.posts.items = [];
        state.posts.status = "error";
      })
      .addCase(fetchUserPosts.pending, (state) => {
        state.userPosts.items = [];
        state.userPosts.status = "loading";
      })
      .addCase(fetchUserPosts.fulfilled, (state, action) => {
        state.userPosts.items = action.payload;
        state.userPosts.status = "loaded";
      })
      .addCase(fetchUserPosts.rejected, (state) => {
        state.userPosts.items = [];
        state.userPosts.status = "error";
      })
      .addCase(fetchRemovePost.pending, (state, action) => {
        state.posts.items = state.posts.items.filter(
          (obj) => obj._id !== action.meta.arg
        );
      })
  },
});

export const postsReducer = postsSlice.reducer;

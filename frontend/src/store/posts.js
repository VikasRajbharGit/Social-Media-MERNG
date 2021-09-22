import { createSlice } from "@reduxjs/toolkit";

const initialPosts = { posts: [], user: "all" };

const postsSlice = createSlice({
  name: "posts",
  initialState: initialPosts,
  reducers: {},
});

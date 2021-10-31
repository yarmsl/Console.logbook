import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PostsState {
  posts: IPost[];
}

const initialState: PostsState = {
  posts: [],
};

export const postsSlice = createSlice({
  name: "posts",
  initialState: initialState,
  reducers: {
    setPosts(state, action: PayloadAction<IPost[]>) {
      state.posts = action.payload;
    },
    addPost(state, action: PayloadAction<IPost>) {
      state.posts.push(action.payload);
    },
    resetPosts(state) {
      Object.assign(state, initialState);
    },
  },
});
export const { setPosts, addPost, resetPosts } = postsSlice.actions;
export const { reducer: postsReducer } = postsSlice;

import { createSlice } from "@reduxjs/toolkit";
import postService from "../services/post";
import likeService from "../services/like";
import { isValidUser } from "./userReducer";

const initialState = {
  postsList: [],
  isLoading: true,
};

const postReducer = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addInitialPosts(state, action) {
      state.postsList = action.payload;
    },
    addPost(state, action) {
      state.postsList.push(action.payload);
    },
    likePost(state, action) {
      const { id } = action.payload;
      const likedPost = state.postsList.find((post) => post.id === id);
      if (likedPost) {
        likedPost.likes += 1;
      }
    },
  },
});

export const { addInitialPosts, addPost, likePost } = postReducer.actions;

export const getInitialPosts = (user) => {
  return async (dispatch) => {
    try {
      const validUser = await isValidUser(user);
      if (!validUser) return {};

      const posts = await postService.getPosts(validUser.userInfo);
      await dispatch(addInitialPosts(posts));
      return posts;
    } catch (err) {
      console.error(err);
    }
  };
};

export const updateLikedPost = (user, postId) => {
  return async (dispatch) => {
    try {
      const validUser = await isValidUser(user);
      if (!validUser) return;

      await likeService.likePost(user.userInfo, postId);
      await dispatch(likePost(postId));
    } catch (err) {
      console.error(err);
    }
  };
};

export default postReducer.reducer;

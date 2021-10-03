import {
  ADD_POST,
  GET_POSTS,
  OPEN_SNACKBAR,
  POSTS_ERROR,
  POSTS_LOAD_END,
  POSTS_LOAD_ON,
  RESET_POSTS_ERROR,
} from "../../lib/constants";
import { authGetData, authPostData } from "../../lib/fetch";

export const publishPost = (
  data: postProps,
  token: string
): ((dispatch: (arg0: PostActions) => void) => Promise<void>) => {
  const addPost = async (
    dispatch: (arg0: PostActions | snackBarActions) => void
  ) => {
    dispatch({ type: RESET_POSTS_ERROR });
    dispatch({ type: POSTS_LOAD_ON });
    try {
      const response = await authPostData("/api/post/add", token, data);
      const res = await response.json();
      if (response.ok) {
        dispatch({
          type: ADD_POST,
          post: { ...res, date: new Date(res.date) },
        });
        dispatch({
          type: OPEN_SNACKBAR,
          snackBar: { type: "success", message: "log published" },
        });
        dispatch({ type: POSTS_LOAD_END });
      } else {
        throw new Error(res.message);
      }
    } catch (e) {
      if (e instanceof Error) {
        console.error("Publish Action Error");
        dispatch({ type: POSTS_ERROR, error: e.message as PostsError });
        dispatch({ type: POSTS_LOAD_END });
      }
    }
  };
  return addPost;
};

export const getPosts = (
  token: string
): ((
  dispatch: (arg0: PostActions | snackBarActions) => void
) => Promise<void>) => {
  const queryPosts = async (
    dispatch: (arg0: PostActions | snackBarActions) => void
  ) => {
    dispatch({ type: RESET_POSTS_ERROR });
    dispatch({ type: POSTS_LOAD_ON });
    try {
      const response = await authGetData("/api/post/", token);
      const res = await response.text();
      if (response.ok) {
        dispatch({
          type: GET_POSTS,
          posts: JSON.parse(res, (k, v) => (k === 'date' ? new Date(v) : v)),
        });
        dispatch({ type: POSTS_LOAD_END });
      } else {
        throw new Error(JSON.parse(res).message);
      }
    } catch (e) {
      if (e instanceof Error) {
        console.error("Publish Action Error");
        dispatch({ type: POSTS_ERROR, error: e.message as PostsError });
        dispatch({ type: POSTS_LOAD_END });
      }
    }
  };
  return queryPosts;
};

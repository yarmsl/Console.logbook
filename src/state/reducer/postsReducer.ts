import {
  ADD_POST,
  DELETE_POST,
  EDIT_POST,
  GET_POSTS,
  POSTS_ERROR,
  POSTS_LOAD_END,
  POSTS_LOAD_ON,
  RESET_POSTS,
  RESET_POSTS_ERROR,
} from "../../lib/constants";

const initState = {
  isLoading: false,
  posts: [] as PostModel[],
};

const postsReducer = (state = initState, action: PostActions): PostsReducer => {
  switch (action.type) {
    case GET_POSTS:
      return { ...state, posts: action.posts ? action.posts : state.posts };
    case ADD_POST:
      return {
        ...state,
        posts: action.post ? [...state.posts, action.post] : state.posts,
      };
    case EDIT_POST:
      return {
        ...state,
        posts: action.postId
          ? [
              ...state.posts,
              state.posts.filter((post) => post.id === action.postId)?.[0],
            ]
          : state.posts,
      };
    case DELETE_POST:
      return {
        ...state,
        posts: action.postId
          ? state.posts.filter((post) => post.id !== action.postId)
          : state.posts,
      };
    case RESET_POSTS:
      return initState;
    case POSTS_ERROR:
      return { ...state, error: action.error };
    case RESET_POSTS_ERROR:
      return { ...state, error: undefined };
    case POSTS_LOAD_ON:
      return { ...state, isLoading: true };
    case POSTS_LOAD_END:
      return { ...state, isLoading: false };
    default:
      return state;
  }
};

export default postsReducer;

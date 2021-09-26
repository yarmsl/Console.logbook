import { GET_MY_POSTS } from "../../lib/constants";

const initState = [] as PostModel[];

const postsReducer = (state = initState, action: PostActions): PostModel[] => {
  switch (action.type) {
    case GET_MY_POSTS:
      return action.posts;
    default:
      return state;
  }
};

export default postsReducer;

import { batch } from "react-redux";
import { authAPI, resetAuth } from ".";
import { postsAPI, resetPosts } from "../Posts";
import { userAPI, resetUser } from "../User";

export const logout = () => {
  return (dispatch: (arg0: unknown) => void): void => {
    batch(() => {
      dispatch(resetAuth());
      dispatch(resetPosts());
      dispatch(resetUser());
      dispatch(authAPI.util.resetApiState());
      dispatch(postsAPI.util.resetApiState());
      dispatch(userAPI.util.resetApiState());
    });
  };
};

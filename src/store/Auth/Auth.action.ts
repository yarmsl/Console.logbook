import { batch } from "react-redux";
import { resetAuth } from "./Auth.reducer";
import { resetUser } from "../User/User.reducer";
import { resetPosts } from "../Posts/Posts.reducer";

export const logout = () => {
  return (dispatch: (arg0: unknown) => void): void => {
    batch(() => {
      dispatch(resetAuth());
      dispatch(resetPosts());
      dispatch(resetUser());
    });
  };
};

import { RESET_USER, SET_USER } from "../../lib/constants";

const initState = {} as userModel;

const userReducer = (state = initState, action: userActions): userModel => {
  switch (action.type) {
    case SET_USER:
      return action.payload || state;
    case RESET_USER:
      return initState;
    default:
      return state;
  }
};

export default userReducer;

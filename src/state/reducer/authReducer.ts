import { SIGN_IN, SIGN_OUT } from "../../lib/constants";

const initState = { isAuth: false };

const authReducer = (state = initState, action: AuthActions): AuthModel => {
  switch (action.type) {
    case SIGN_IN:
      return { isAuth: true, token: action.token };
    case SIGN_OUT:
      return initState;
    default:
      return state;
  }
};

export default authReducer;

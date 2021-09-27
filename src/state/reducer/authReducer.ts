import { AUTH_ERROR, SIGN_IN, SIGN_OUT } from "../../lib/constants";

const initState = { isAuth: false };

const authReducer = (state = initState, action: AuthActions): AuthModel => {
  switch (action.type) {
    case SIGN_IN:
      return { isAuth: true, token: action.token };
    case SIGN_OUT:
      return initState;
	case AUTH_ERROR:
		return {isAuth: false, error: action.error};
    default:
      return state;
  }
};

export default authReducer;

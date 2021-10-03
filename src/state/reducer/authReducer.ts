import { AUTH_ERROR, AUTH_LOAD_END, AUTH_LOAD_ON, RESET_AUTH_ERROR, SIGN_IN, SIGN_OUT } from "../../lib/constants";

const initState = { isAuth: false, isLoading: false };

const authReducer = (state = initState, action: AuthActions): AuthModel => {
  switch (action.type) {
    case SIGN_IN:
      return { isAuth: true, isLoading: false, token: action.token };
    case SIGN_OUT:
      return initState;
    case AUTH_ERROR:
      return { isAuth: false, isLoading: false, error: action.error };
    case AUTH_LOAD_ON:
      return { ...state, isLoading: true };
    case AUTH_LOAD_END:
      return { ...state, isLoading: false };
	case RESET_AUTH_ERROR:
		return initState;
    default:
      return state;
  }
};

export default authReducer;

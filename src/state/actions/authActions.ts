import {
  AUTH_ERROR,
  IS_LOAD_END,
  IS_LOAD_ON,
  OPEN_SNACKBAR,
  RESET_ERROR,
  RESET_USER,
  SET_USER,
  SIGN_IN,
  SIGN_OUT,
} from "../../lib/constants";
import { authGetData, postData } from "../../lib/fetch";

export const signIn = (
  data: formLogin
): ((dispatch: (arg0: AuthActions | userActions) => void) => Promise<void>) => {
  const authToApp = async (
    dispatch: (arg0: AuthActions | userActions) => void | AuthActions
  ) => {
    dispatch({ type: RESET_ERROR });
    dispatch({ type: IS_LOAD_ON });
    try {
      const response = await postData("/api/auth/signin", data);
      const res = await response.json();
      if (response.ok) {
        const { token, id, name, avatar } = res;
        dispatch({ type: SIGN_IN, token: token });
        localStorage.setItem("app", token);
        dispatch({ type: SET_USER, payload: { id, name, avatar } });
        dispatch({ type: IS_LOAD_END });
      } else {
        throw new Error(res.message);
      }
    } catch (e) {
      if (e instanceof Error) {
        console.error("signIn Action Error");
        dispatch({ type: AUTH_ERROR, error: e.message as AuthError });
        dispatch({ type: IS_LOAD_END });
      }
    }
  };
  return authToApp;
};

export const signUp = (
  data: formLogin
): ((
  dispatch: (arg0: AuthActions | userActions | snackBarActions) => void
) => Promise<void>) => {
  const RegToApp = async (
    dispatch: (
      arg0: AuthActions | userActions | snackBarActions
    ) => void | AuthActions
  ) => {
    dispatch({ type: RESET_ERROR });
    dispatch({ type: IS_LOAD_ON });
    try {
      const response = await postData("/api/auth/signup", data);
      const res = await response.json();
      if (response.ok) {
        const { token, id } = res;
        dispatch({ type: SIGN_IN, token: token });
        localStorage.setItem("app", token);
        dispatch({ type: SET_USER, payload: { id, name: "", avatar: "" } });
        dispatch({
          type: OPEN_SNACKBAR,
          snackBar: { type: "success", message: "user created" },
        });
        dispatch({ type: IS_LOAD_END });
      } else {
        throw new Error(res.message);
      }
    } catch (e) {
      if (e instanceof Error) {
        console.error("signUp Action Error");
        dispatch({ type: AUTH_ERROR, error: e.message as AuthError });
        dispatch({ type: IS_LOAD_END });
      }
    }
  };
  return RegToApp;
};

export const signLocalToken = (): ((
  dispatch: (arg0: AuthActions | userActions) => void
) => void) => {
  const checkToken = async (
    dispatch: (arg0: AuthActions | userActions) => void
  ) => {
    const token = localStorage.getItem("app");
    if (token != null) {
      dispatch({ type: IS_LOAD_ON });
      try {
        const response = await authGetData("/api/auth/checkauth", token);
        const res = await response.json();
        if (response.ok) {
          dispatch({ type: SIGN_IN, token: token });
          dispatch({ type: SET_USER, payload: res });
          dispatch({ type: IS_LOAD_END });
        } else {
          throw new Error(res.message);
        }
      } catch (e) {
        if (e instanceof Error) {
          console.error("checkauth Action Error");
          dispatch({ type: IS_LOAD_END });
        }
      }
    }
  };
  return checkToken;
};

export const signOut = (): ((
  dispatch: (arg0: { type: string }) => void
) => void) => {
  const logout = (dispatch: (arg0: { type: string }) => void) => {
    localStorage.removeItem("app");
    dispatch({ type: SIGN_OUT });
    dispatch({ type: RESET_USER });
  };
  return logout;
};

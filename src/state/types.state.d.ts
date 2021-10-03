//AuthReducer
interface AuthModel {
  isAuth: boolean;
  isLoading: boolean;
  token?: string;
  error?: AuthError;
}
interface signData {
  email?: string;
  password?: string;
}

interface AuthActions {
  type: string;
  token?: string;
  error?: AuthError;
}

type AuthError =
  | "incorrect email"
  | "min password length 6"
  | "invalid data"
  | "user exists"
  | "signup error"
  | "enter correct email"
  | "enter pass"
  | "user not found"
  | "password is incorrect"
  | "signin error"
  | "no local token"
  | "no auth"
  | "checkauth error"
  | "Failed to fetch";

//PostsReducer

interface PostsReducer {
  isLoading: boolean;
  error?: PostsError;
  posts: PostModel[];
}

interface PostModel {
  author: string;
  date: Date;
  text: string;
  title: string;
  id: string;
}

interface PostActions {
  type: string;
  post?: PostModel; 
  posts?: PostModel[];
  error?: PostsError;
  postId?: string;
}

type PostsError =
  | "publish error"
  | "get posts error"
  | "get post error"
  | "no auth"
  | "Failed to fetch";

//snackBarReducer
interface snackbarObj {
  type: "alert" | "success" | "warning" | undefined;
  message: string;
}

interface snackBarModel extends snackbarObj {
  open: boolean;
}

interface snackBarActions {
  type: string;
  snackBar?: snackbarObj;
}

//userReducer
interface userModel {
  id: string;
  name: string;
  avatar: string;
}

interface userActions {
  type: string;
  payload?: userModel;
}

//AuthReducer
interface AuthModel {
  isAuth: boolean;
  token?: string;
  error?: AuthError;
}
interface signData {
  email?: string;
  password?: string;
}

interface AuthError {
  validate?: signData;
  server?: string;
  signUp?: string;
  signIn?: signData;
}

interface AuthActions {
  type: string;
  token?: string;
  error?: AuthError;
}

//PostsReducer
interface PostModel {
  author: string;
  date: Date;
  text: string;
  title: string;
  _id: string;
}

interface PostActions {
  type: string;
  posts: PostModel[];
}

//snackBarReducer
interface snackBarModel {
	open: boolean,
	type: 'alert' | 'success' | 'warning' | undefined,
	message: string,
}

interface snackBarActions {
	type: string;
	snackBar?: snackBarModel;
}

interface rootReducer {
	auth: authModel;
	user: string;
	posts: PostModel[];
	snackBar: snackBarModel;
}
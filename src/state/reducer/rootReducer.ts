import { combineReducers } from 'redux';
import authReducer from './authReducer';
import postsReducer from './postsReducer';
import snackBarReducer from './uiReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
	auth: authReducer,
	user: userReducer,
	posts: postsReducer,
	snackBar: snackBarReducer
})

export default rootReducer;
import { combineReducers } from 'redux';
import authReducer from './authReducer';
import postsReducer from './postsReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
	auth: authReducer,
	user: userReducer,
	posts: postsReducer
})

export default rootReducer;
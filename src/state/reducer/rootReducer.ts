import { combineReducers } from 'redux';
import postsReducer from './postsReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
	user: userReducer,
	posts: postsReducer
})

export default rootReducer;
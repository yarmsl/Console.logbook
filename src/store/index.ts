import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./Auth/Auth.reducer";
import { authAPI } from "./Auth/Auth.service";
import postsReducer from "./Posts/Posts.reducer";
import { postsAPI } from "./Posts/Posts.service";
import userReducer from "./User/User.reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  posts: postsReducer,
  user: userReducer,
  [authAPI.reducerPath]: authAPI.reducer,
  [postsAPI.reducerPath]: postsAPI.reducer,
});

const appStore = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authAPI.middleware, postsAPI.middleware),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = typeof appStore;
export type AppDispatch = AppStore["dispatch"];
export default appStore;

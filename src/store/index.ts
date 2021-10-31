import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { authReducer, authAPI } from "./Auth";
import { postsReducer, postsAPI } from "./Posts";
import { userReducer } from "./User";

const authPersistConfig = {
  key: "auth",
  storage: storage,
  whitelist: ["isAuth", "token"],
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  posts: postsReducer,
  user: userReducer,
  [authAPI.reducerPath]: authAPI.reducer,
  [postsAPI.reducerPath]: postsAPI.reducer,
});

const appStore = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      authAPI.middleware,
      postsAPI.middleware
    ),
});

export * from "./hooks";
export const persistor = persistStore(appStore);
export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = typeof appStore;
export type AppDispatch = AppStore["dispatch"];
export default appStore;

export const BASE_URL = process.env.REACT_APP_BASE_URL;
export const SERVER_URL = process.env.REACT_APP_SERVER_URL;

//AuthReducer
export const SIGN_IN = 'SIGN_IN';
export const SIGN_OUT = 'SIGN_OUT';
export const AUTH_ERROR = 'AUTH_ERROR';
export const AUTH_LOAD_ON = 'AUTH_LOAD_ON';
export const AUTH_LOAD_END = 'AUTH_LOAD_END';
export const RESET_AUTH_ERROR = 'RESET_AUTH_ERROR';

//PostsReducer
export const GET_POSTS = 'GET_POSTS';
export const ADD_POST = 'ADD_POST';
export const EDIT_POST = 'EDIT_POST';
export const DELETE_POST = 'DELETE_POST';
export const RESET_POSTS = 'RESET_POSTS';
export const POSTS_ERROR = 'POSTS_ERROR';
export const POSTS_LOAD_ON = 'POSTS_LOAD_ON';
export const POSTS_LOAD_END = 'POSTS_LOAD_END';
export const RESET_POSTS_ERROR = 'RESET_POSTS_ERROR';

//SnackbarReducer
export const OPEN_SNACKBAR = 'OPEN_SNACKBAR';
export const RESET_SNACKBAR = 'RESET_SNACKBAR';

//UserReducer
export const SET_USER = 'SET_USER';
export const RESET_USER = 'RESET_USER';
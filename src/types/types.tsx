import { Theme } from '@material-ui/core';
import React from 'react';
import { postProps } from '../pages/AddPost';

export interface Child  {
	children?: React.ReactNode;
}

export interface LDTheme {
	type: 'light' | 'dark';
}

export interface ThemeCtx {
	theme?: Theme;
	switchTheme: (str: 'light' | 'dark') => void;
}

export interface MetaLT extends Child {
	title: string;
}

export interface formLogin {
	email: string;
	password: string;
}

export interface Errors {
	value: string;
	msg: string;
	param: string;
	location: string;
}

export type errMsg = 'invalid data' | 'user exists' | 'server error' | 'password is incorrect' | 'user not found'

export interface badResponse {
	message: errMsg;
	errors?: Errors[];
}

export interface useHttpTypes {
	loading: boolean;
	request: <T>(url: string, method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | undefined, body?: formLogin | postProps | null, headers?: HeadersInit) => Promise<T>;
	sse: badResponse | 'bad response' | null;
	clearError: () => void;
}

export interface useAuthTypes {
	login: (jwtToken: string, id: string) => void;
	logout: () => void;
	token: string | null;
	userId: string | null;
}

export interface User {
	userId: string;
	name: string;
	avatar: string;
}

export interface authData extends User {
	token: string;
}

export interface AuthCTXTypes extends useAuthTypes {
	isAuth: boolean;
}
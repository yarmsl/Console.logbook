import React, { ReactElement, useContext, createContext, useState, useEffect } from 'react';
import { AuthCTXTypes, Child } from '../../types/types';
import { useAuth } from '../hooks/auth.hook';

const AuthCTX = createContext({} as AuthCTXTypes);

export const useAuthCtx = (): AuthCTXTypes => useContext(AuthCTX);

const AuthProvider = ({ children }: Child): ReactElement => {
	const {token, login, logout, userId} = useAuth();
	const [isAuth, setIsAuth] = useState(false);

	useEffect(() => {
		setIsAuth(!!token);
	}, [token]);

	return (
		<AuthCTX.Provider value={{token, login, logout, userId, isAuth}}>
			{children}
		</AuthCTX.Provider>
	);
};

export default AuthProvider;
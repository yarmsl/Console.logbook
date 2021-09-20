import { useState, useCallback, useEffect } from 'react';
import { authData, useAuthTypes } from '../../types/types';

const storeName = 'userData';

export const useAuth = (): useAuthTypes => {
	const [token, setToken] = useState<string | null>(null);
	const [userId, setUserId] = useState<string | null>(null);

	const login = useCallback((jwtToken: string, id: string) => {
		setToken(jwtToken);
		setUserId(id);
		localStorage.setItem(
			storeName,
			JSON.stringify({ userId: id, token: jwtToken })
		);
	}, []);

	const logout = useCallback(() => {
		setToken(null);
		setUserId(null);
		localStorage.removeItem(storeName);
	}, []);

	useEffect(() => {
		const data = localStorage.getItem(storeName);
		if (data !== null) {
			const parseData: authData = JSON.parse(data);
			login(parseData.token, parseData.userId);
		}
	}, [login]);

	return { login, logout, token, userId };
};

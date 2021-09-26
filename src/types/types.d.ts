interface Child  {
	children?: React.ReactNode;
}

interface LDTheme {
	type: 'light' | 'dark';
}

interface MetaLT extends Child {
	title: string;
}

interface formLogin {
	email: string;
	password: string;
}

interface Errors {
	value: string;
	msg: string;
	param: string;
	location: string;
}

interface postProps {
	title: string;
	text: string;
}

type errMsg = 'invalid data' | 'user exists' | 'server error' | 'password is incorrect' | 'user not found'

interface badResponse {
	message: errMsg;
	errors?: Errors[];
}

interface useHttpTypes {
	loading: boolean;
	request: <T>(url: string, method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | undefined, body?: formLogin | postProps | null, headers?: HeadersInit) => Promise<T>;
	sse: badResponse | 'bad response' | null;
	clearError: () => void;
}

interface useAuthTypes {
	login: (jwtToken: string, id: string) => void;
	logout: () => void;
	token: string | null;
	userId: string | null;
}

interface User {
	userId: string;
	name: string;
	avatar: string;
}

interface authData extends User {
	token: string;
}

interface AuthCTXTypes extends useAuthTypes {
	isAuth: boolean;
}
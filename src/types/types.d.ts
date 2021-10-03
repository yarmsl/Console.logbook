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

interface postProps {
	title: string;
	text: string;
}
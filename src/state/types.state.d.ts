interface AuthModel {
	isAuth: boolean;
	token?: string;
}

interface AuthActions {
	type: string;
	token?: string;
}

interface PostModel {
	author: string;
	date: Date;
	text: string;
	title: string;
	_id: string;
}

interface PostActions {
	type: string;
	posts: PostModel[];
}
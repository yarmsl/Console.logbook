import React, { ReactElement } from 'react';
import HelmetLayout from '../layouts/HelmetLayout';
import { SERVER_URL } from '../lib/constants';
import { useAuthCtx } from '../lib/context/AuthCTX';

const Posts = (): ReactElement => {
	const { token } = useAuthCtx();
	const getPosts = async () => {
		const res = await fetch(`${SERVER_URL}/api/post/posts`, {
			method: 'GET',
			headers: {
				'Authorization': `Bearer ${token}`,
				'Content-Type': 'application/json'
			}
		})
		return res.json();
	}

	console.log(getPosts())
	return (
		<HelmetLayout title='Posts'>
			Posts
		</HelmetLayout>
	);
};

export default Posts;
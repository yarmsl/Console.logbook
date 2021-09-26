import { ReactElement } from 'react';
import { useHistory } from 'react-router';
import HelmetLayout from '../layouts/HelmetLayout';
import { SERVER_URL } from '../lib/constants';
import { useAuthCtx } from '../lib/context/AuthCTX';
import { FabAdd } from '../UI/FAB';

const Posts = (): ReactElement => {
	const router = useHistory();
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
			<FabAdd onClick={() => router.push('/addPost')} />
		</HelmetLayout>
	);
};

export default Posts;
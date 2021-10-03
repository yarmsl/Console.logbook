import { ReactElement } from 'react';
import { useHistory } from 'react-router';
import HelmetLayout from '../layouts/HelmetLayout';
import { FabAdd } from '../UI/FAB';

const Posts = (): ReactElement => {
	const router = useHistory();

	return (
		<HelmetLayout title='Posts'>
			Posts
			<FabAdd onClick={() => router.push('/addPost')} />
		</HelmetLayout>
	);
};

export default Posts;
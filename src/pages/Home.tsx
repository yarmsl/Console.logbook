import React, { ReactElement } from 'react';
import HelmetLayout from '../layouts/HelmetLayout';
import { makeStyles} from '@material-ui/core';
import { FabAdd } from '../UI/FAB';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles(() => ({
	root: {

	}
}));

const Home = (): ReactElement => {
	const classes = useStyles();
	const router = useHistory();
	return (
		<HelmetLayout title='main'>
			<FabAdd onClick={() => router.push('/addPost')} />
		</HelmetLayout>
	);
};

export default Home;
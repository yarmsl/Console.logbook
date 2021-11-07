import { Container } from '@mui/material';
import { useHistory } from 'react-router';

const NotFoundNotAuth = (): JSX.Element => {
    const router = useHistory();
    router.push('/')
	return (
		<Container>
			404
		</Container>
	);
};

export default NotFoundNotAuth;
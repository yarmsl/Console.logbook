import { ReactElement } from 'react';
import Header from '../components/Header';
import { Container, makeStyles } from '@material-ui/core';
import Footer from '../components/Footer';
import Snack from '../UI/Snack';
import { useAppSelector } from '../lib/hooks/redux.hooks';

const useStyles = makeStyles(() => ({
	root: {
		width: '100%',
		height: '100%',
		position: 'relative',
		display: 'flex',
		flexDirection: 'column',
		padding: '20px 0',
		alignItems: 'center',
		justifyContent: 'center'
	}
}));

const MainLayout = ({ children }: Child): ReactElement => {
	const classes = useStyles();
	const snackBar = useAppSelector(state => state.snackBar)
	return (
		<>
			<Header />
			<Container className={classes.root}>
				<>
					{children}
				</>
			</Container>
			<Snack {...snackBar} />
			<Footer/>
		</>
	);
};

export default MainLayout;
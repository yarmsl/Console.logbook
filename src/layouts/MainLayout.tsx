import React from 'react';
import Header from '../components/Header';
import { Container, makeStyles } from '@material-ui/core';
import { Child } from '../types/types';
import Footer from '../components/Footer';

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

const MainLayout = ({ children }: Child): React.ReactElement => {
	const classes = useStyles();
	return (
		<>
			<Header />
			<Container className={classes.root}>
				<>
					{children}
				</>
			</Container>
			<Footer/>
		</>
	);
};

export default MainLayout;
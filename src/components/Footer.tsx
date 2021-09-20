import React, { ReactElement } from 'react';
import { Box, Container, IconButton, makeStyles, Typography } from '@material-ui/core';
import TelegramIcon from '@material-ui/icons/Telegram';

const useStyles = makeStyles((theme) => ({
	footer: {
		height: 58,
		backgroundColor: theme.palette.secondary.light,
		color: '#fff',
		userSelect: 'none'
	},
	wrapper: {
		width: '100%',
		height: '100%',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between'
	},
	left: {
		width: '132px'
	},
	logo: {
		transform: 'rotate(1deg)'
	},
	right: {
		display: 'flex',
		height:'100%',
		alignItems: 'center'
	},
	icon: {
		color: '#fff'
	}
}));

const Footer = (): ReactElement => {

	const classes = useStyles();

	return (
		<Box className={classes.footer} component='footer'>
			<Container className={classes.wrapper}>
				<Box className={classes.left}>
					<Typography className={classes.logo} variant='body2'>Console.logbook(&#39;Data&#39;)</Typography>
				</Box>
				<Typography variant='body2'>© 2021</Typography>
				<Box className={classes.right}>
					<IconButton className={classes.icon} href='https://t.me/Yaroslavmsl'><TelegramIcon /></IconButton>
					<Typography>Yaroslav M.</Typography>
				</Box>

			</Container>
		</Box>
	);
};

export default Footer;

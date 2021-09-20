import React, { ReactElement, useState, useEffect } from 'react';
import { Box, makeStyles, Snackbar, Typography } from '@material-ui/core';
import ErrorRoundedIcon from '@material-ui/icons/ErrorRounded';
import ThumbUpAltRoundedIcon from '@material-ui/icons/ThumbUpAltRounded';
import WarningRoundedIcon from '@material-ui/icons/WarningRounded';

export interface SnackProps {
	open: boolean;
	type: 'alert' | 'success' | 'warning' | undefined;
	message: string;
}

const useStyles = makeStyles(theme => ({
	snack: {
		display: 'flex',
		width: '100%',
		height: '100%',
		padding: '8px 16px',
		borderRadius: theme.shape.borderRadius,
		marginBottom: '56px',
	},
	alert: {
		backgroundColor: theme.palette.error.main,
	},
	success: {
		backgroundColor: theme.palette.success.main
	},
	warning: {
		backgroundColor: theme.palette.warning.main
	},
	message: {
		color: theme.palette.secondary.contrastText,
		userSelect: 'none',
		marginRight: '4px'
	},
}));

const Snack = ({ open, type, message }: SnackProps): ReactElement => {
	const classes = useStyles();
	const [openSnack, setOpenSnack] = useState(false);

	useEffect(() => {
		setOpenSnack(open);
	}, [open]);

	return (
		<Snackbar
			open={openSnack}
			onClose={() => setOpenSnack(false)}
			autoHideDuration={4500}
		>
			<>
				{type === 'alert' &&
					<Box className={[classes.snack, classes.alert].join(' ')}>
						<ErrorRoundedIcon className={classes.message} />
						<Typography className={classes.message}>{message}</Typography>
					</Box>}
				{type === 'success' &&
					<Box className={[classes.snack, classes.success].join(' ')}>
						<ThumbUpAltRoundedIcon className={classes.message} />
						<Typography className={classes.message}>{message}</Typography>
					</Box>}
				{type === 'warning' &&
					<Box className={[classes.snack, classes.warning].join(' ')}>
						<WarningRoundedIcon className={classes.message} />
						<Typography className={classes.message}>{message}</Typography>
					</Box>}
				{type === undefined &&
					<Box>
					</Box>}
			</>
		</Snackbar>
	);
};

export default Snack;
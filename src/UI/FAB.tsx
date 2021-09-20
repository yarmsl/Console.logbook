import React from 'react';
import { Fab, makeStyles } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

export interface FabProps {
	onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const useStyles = makeStyles(() => ({
	fab: {
		position: 'absolute',
		bottom: 12,
		right: 12,
	}
}));

export const FabAdd = ({onClick}: FabProps): JSX.Element => {
	const classes = useStyles();
	return (
		<Fab onClick={onClick} color='secondary' className={classes.fab}>
			<AddIcon />
		</Fab>
	);
};

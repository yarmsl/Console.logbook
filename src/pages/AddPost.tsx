import React, { ReactElement } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Box, Button, Container, makeStyles, TextField } from '@material-ui/core';
import HelmetLayout from '../layouts/HelmetLayout';
import SendRoundedIcon from '@material-ui/icons/SendRounded';
import { useHttp } from '../lib/hooks/http.hook';
import { useAuthCtx } from '../lib/context/AuthCTX';

export interface postProps {
	title: string;
	text: string;
}

const useStyles = makeStyles(() => ({
	form: {
		width: '100%',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		'&>*': {
			marginBottom: '16px'
		}
	},
	textfield: {
		['& fieldset']: {
			borderTopLeftRadius: 0,
			borderTopRightRadius: 0,
		}
	},
	submit: {
		alignSelf: 'flex-end'
	}
}));

const AddPost = (): ReactElement => {
	const { handleSubmit, control } = useForm<postProps>();
	const classes = useStyles();
	const { token } = useAuthCtx();
	const { request } = useHttp();

	const onSubmit = async (data: postProps) => {

		try {
			const response = await request('/api/post/add', 'POST', data, {
				'Authorization': `Bearer ${token}`,
				'Content-Type': 'application/json'
			})
			console.log(response);

		} catch (e) {
			console.error(e);
		}
		console.log(data);

	}

	return (
		<HelmetLayout title='AddLog'>
			<Container maxWidth='sm'>
				<Box
					onSubmit={handleSubmit(onSubmit)}
					className={classes.form}
					component='form'
				>
					<Controller
						name="title"
						control={control}
						defaultValue=''
						render={({ field: { onChange, value }, fieldState: { error } }) => (
							<TextField
								variant='filled'
								color='secondary'
								autoFocus
								tabIndex={1}
								label='Title'
								fullWidth
								type="text"
								value={value}
								onChange={onChange}
								error={!!error}
								helperText={error ? error.message : null} />
						)}
						rules={{
							required: 'Enter Title',
							minLength: {
								value: 10,
								message: 'min password length 10'
							}
						}}
					/>
					<Controller
						name="text"
						control={control}
						defaultValue=''
						render={({ field: { onChange, value }, fieldState: { error } }) => (
							<TextField
								variant='outlined'
								color='secondary'
								multiline
								minRows={10}
								maxRows={20}
								tabIndex={2}
								className={classes.textfield}
								label='Log'
								fullWidth
								type="text"
								value={value}
								onChange={onChange}
								error={!!error}
								helperText={error ? error.message : null} />
						)}
						rules={{
							required: 'Enter log',
							minLength: {
								value: 50,
								message: 'min log length 50'
							}
						}}
					/>
					<Button
						className={classes.submit}
						type='submit'
						variant='outlined'
						color='secondary'
						endIcon={<SendRoundedIcon />}
					>
						Publish
					</Button>
				</Box>
			</Container>
		</HelmetLayout>
	);
};

export default AddPost;

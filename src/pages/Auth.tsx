import React, { ReactElement, useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Box, Container, TextField, makeStyles, ButtonGroup, Button, Typography } from '@material-ui/core';
import Snack, { SnackProps } from '../UI/Snack';
import HelmetLayout from '../layouts/HelmetLayout';
import { useHttp } from '../lib/hooks/http.hook';
import { formLogin, badResponse, authData } from '../types/types';
import { useAuthCtx } from '../lib/context/AuthCTX';

const useStyles = makeStyles(() => ({
	root: {
		display: 'flex',
		flexDirection: 'column',
	},
	title: {
		display: 'flex',
		justifyContent: 'flex-end',
		flexWrap: 'wrap',
		marginBottom: 15,
		transform: 'rotate(1deg)',
		userSelect: 'none',
	},
	form: {
		'&>*': {
			marginBottom: 15,
		}
	},
	input: {
		height: '70px',
	}
}));

const snackInit = {
	open: false,
	type: undefined,
	message: '',
};

const Auth = (): ReactElement => {
	const { handleSubmit, control, setError, clearErrors } = useForm<formLogin>();
	const { loading, sse, request } = useHttp();

	const [openSnack, setOpenSnack] = useState<SnackProps>(snackInit);
	const { login } = useAuthCtx();

	useEffect(() => {
		setOpenSnack(snackInit);
		if (sse === null) {
			return;
		}
		switch ((sse as badResponse).message) {
		case 'invalid data':
			return (sse as badResponse).errors?.forEach(err => {
				switch (err.param) {
				case 'email':
					return setError('email', { type: 'validate', message: err.msg });
				case 'password':
					return setError('password', { type: 'validate', message: err.msg });
				}
			});
		case 'server error':
			return setOpenSnack({
				type: 'alert',
				open: true,
				message: 'Server is not responding'
			});
		case 'user exists':
			return setOpenSnack({
				type: 'warning',
				open: true,
				message: 'User exists'
			});
		case 'password is incorrect':
			return setError('password', { type: 'validate', message: 'Password is incorrect' });
		case 'user not found':
			return setError('email', { type: 'validate', message: 'There is no such user' });
		default:
			return clearErrors();
		}
	}, [sse]);

	const classes = useStyles();

	const signUp = async (data: formLogin) => {
		setOpenSnack(snackInit);
		clearErrors();
		try {
			const response = await request('/api/auth/signup', 'POST', data, {
				'Content-Type': 'application/json'
			});
			console.log('signUpRes ', response);
			setOpenSnack({
				type: 'success',
				open: true,
				message: 'Account successfully created'
			});
			const resLogin = await request('/api/auth/signin', 'POST', data, {
				'Content-Type': 'application/json'
			});
			console.log('signUp-In ', resLogin);
			if (resLogin === null || resLogin === undefined) {
				return;
			}
			login((resLogin as authData).token, (resLogin as authData).userId);

		} catch (e) {
			console.log('signUpError', e);
		}
	};

	const signIn = async (data: formLogin) => {
		setOpenSnack(snackInit);
		clearErrors();
		try {
			const response = await request('/api/auth/signin', 'POST', data, {
				'Content-Type': 'application/json'
			});
			console.log('signInRes ', response);
			if (response === null || response === undefined) {
				return;
			}
			login((response as authData).token, (response as authData).userId);
		} catch (e) {
			console.log('signInError', e);
		}
	};

	return (
		<HelmetLayout title='Sign'>
			<Container className={classes.root} maxWidth='xs'>
				<Box className={classes.title}>
					<Typography>Welcome to&nbsp;</Typography>
					<Typography color='secondary'>Console.logbook&nbsp;</Typography>
					<Typography>- a simple notebook</Typography>
				</Box>
				<Box className={classes.form} component='form'>
					<Controller
						name="email"
						control={control}
						defaultValue=''
						render={({ field: { onChange, value }, fieldState: { error } }) => (
							<TextField
								tabIndex={1}
								className={classes.input}
								label='Email'
								fullWidth
								type="text"
								autoComplete="email"
								value={value}
								onChange={onChange}
								error={!!error}
								helperText={error ? error.message : null} />
						)}
						rules={{
							required: 'Enter your email',
							pattern: {
								value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
								message: 'Incorrect email'
							}
						}}
					/>
					<Controller
						name="password"
						control={control}
						defaultValue=''
						render={({ field: { onChange, value }, fieldState: { error } }) => (
							<TextField
								tabIndex={2}
								className={classes.input}
								label='Password'
								fullWidth
								type="password"
								autoComplete="current-password"
								value={value}
								onChange={onChange}
								error={!!error}
								helperText={error ? error.message : null} />
						)}
						rules={{
							required: 'Enter password',
							minLength: {
								value: 6,
								message: 'min password length 6'
							}
						}}
					/>
					<ButtonGroup fullWidth variant='contained' color='secondary'>
						<Button onClick={handleSubmit(data => signUp(data))} disabled={loading}>Sign up</Button>
						<Button onClick={handleSubmit(data => signIn(data))} disabled={loading}>Sign in</Button>
					</ButtonGroup>
				</Box>
			</Container>
			<Snack {...openSnack} />
		</HelmetLayout>
	);
};

export default Auth;
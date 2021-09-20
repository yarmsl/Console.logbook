import React, { ReactElement } from 'react';
import { Switch, Route } from 'react-router-dom';
// import Home from './pages/Home';
import NotFound from './pages/404';
import Auth from './pages/Auth';
import Posts from './pages/Posts';
import Post from './pages/Post';
import AddPost from './pages/AddPost';
import Profile from './pages/Profile';

export const useRoutes = (isAuth: boolean): ReactElement => {
	if (isAuth) {
		return (
			<Switch>
				<Route exact path='/' component={Posts} />
				<Route exact path='/addPost' component={AddPost} />
				{/* <Route exact path='/posts' component={Posts} /> */}
				<Route exact path='/profile/:id' component={Profile} />
				<Route path='/post/:id' component={Post} />
				<Route component={NotFound} />
			</Switch>
		);
	}
	return (
		<Switch>
			<Route path='/' component={Auth} />
			<Route component={NotFound} />
		</Switch>
	);
};
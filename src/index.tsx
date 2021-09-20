import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import { Provider as StoreProvider } from 'react-redux';
import App from './App';
import AuthProvider from './lib/context/AuthCTX';
import store from './state/store';

ReactDOM.render(
	<React.StrictMode>
		<StoreProvider store={store}>
			<AuthProvider>
				<App />
			</AuthProvider>
		</StoreProvider>
	</React.StrictMode>,
	document.getElementById('root')
);

reportWebVitals();
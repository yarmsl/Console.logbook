import { createTheme } from '@material-ui/core/styles';

const darkTheme = createTheme({
	breakpoints: {
		values: {
			xs: 0,
			sm: 600,
			md: 960,
			lg: 1280,
			xl: 1920,
		},
	},
	typography: {
		fontFamily: [
			'Open Sans',
			'-apple-system',
			'BlinkMacSystemFont',
			'"Segoe UI"',
			'Roboto',
			'"Helvetica Neue"',
			'Arial',
			'sans-serif',
			'"Apple Color Emoji"',
			'"Segoe UI Emoji"',
			'"Segoe UI Symbol"',
		].join(','),
	},
	shadows: [
		'none',
		'none',
		'none',
		'none',
		'none',
		'none',
		'none',
		'none',
		'none', //используется выпадашки из селектов TextField
		'none',
		'none',
		'0px 0px 16px rgba(0, 0, 0, 0.25)',
		'none',
		'none',
		'none',
		'none',
		'none',
		'none',
		'none',
		'none',
		'none',
		'none',
		'none',
		'none',
		'none'
	],
	shape: {
		borderRadius: 8,
	},
	overrides: {
		MuiContainer: {
			root: {
				display: 'flex',
			}
		},
		MuiCssBaseline: {
			'@global': {
				'::-webkit-scrollbar': {
					width: '8px',
					height: '8px',
				},
				'::-webkit-scrollbar-thumb': {
					backgroundColor: '#e9e9e9',
					borderRadius: '8px',
				},
				html: {
					width: '100%',
					height: '100%'
				},
				body: {
					width: '100%',
					height: '100%'
				},
				'#__root': {
					width: '100%',
					height: '100%',
					display: 'flex',
					flexDirection: 'column'
				}
			}
		},
	}
});

export default darkTheme;
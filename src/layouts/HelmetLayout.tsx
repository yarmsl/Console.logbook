import { ReactElement } from 'react';
import { Helmet } from 'react-helmet';

const HelmetLayout = ({children, title}: MetaLT): ReactElement => {
	return (
		<>
			<Helmet>
				<title>Console.logbook({title})</title>
			</Helmet>
			{children}
		</>
	);
};

export default HelmetLayout;

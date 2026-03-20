import { useRouteError } from 'react-router-dom';
import { error404Styles } from '../../utils/constStyles';

const Error404 = () => {
	const error = useRouteError();

	return (
		<div className={error404Styles.container}>
			<h3 className={error404Styles.title}>{error.status} Ops!</h3>
			<p className={error404Styles.description}>{error.data}</p>
		</div>
	);
};

export default Error404;

import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
	activeTabStyles,
	tabsContainerStyles,
	tabStyles,
} from '../../utils/constStyles';

const Profile = () => {
	const { pathname } = useLocation();
	const navigate = useNavigate();

	const handleTabClick = (path: string) => {
		navigate(`/profile/${path}`);
	};

	return (
		<div>
			<Link to='/' className={'text-white'}>
				Inicio
			</Link>
			<div className={tabsContainerStyles}>
				<span
					className={`${
						pathname.includes('my-info') ? activeTabStyles : ''
					} ${tabStyles}`}
					onClick={() => handleTabClick('my-info')}
					style={{ marginRight: 8 }}>
					Mi informacion
				</span>
				<span
					className={`${
						pathname.includes('liked-events') ? activeTabStyles : ''
					} ${tabStyles}`}
					onClick={() => handleTabClick('liked-events')}>
					Eventos Favoritos
				</span>
			</div>
			<Outlet />
		</div>
	);
};

export default Profile;

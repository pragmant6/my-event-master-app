import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Suspense } from 'react';

import Detail from '../views/Detail';
import Error404 from '../views/Error404';
import ErrorBoundary from '../components/ErrorBoundary';

import Profile from '../views/Profile';
import LikedEvents from '../views/Profile/components/LikedEvents';
import MyInfo from '../views/Profile/components/MyInfo';
import { Home } from '../views/Home';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Home />,
		errorElement: <Error404 />,
	},
	{
		path: '/detail/:eventId',
		element: (
			<Suspense fallback={<div>Cargando...</div>}>
				<ErrorBoundary>
					<Detail />
				</ErrorBoundary>
			</Suspense>
		),
	},
	{
		path: '/profile',
		element: <Profile />,
		children: [
			{
				path: 'my-info',
				element: <MyInfo />,
			},
			{
				path: 'liked-events',
				element: <LikedEvents />,
			},
		],
	},
]);

const MyRoutes = () => <RouterProvider router={router} />;

export default MyRoutes;

import { lazy, Suspense } from 'react';
import { Route, Switch, Redirect, useLocation } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import useUser from './helpers/useUser';
import Loader from './components/Loader';

import './styles/app.scss';

const Login = lazy(() => import('./pages/Login'));
const Callback = lazy(() => import('./pages/Callback'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const TopArtists = lazy(() => import('./pages/TopArtists'));
const TopTracks = lazy(() => import('./pages/TopTracks'));
const Footer = lazy(() => import('./components/Footer'));
const Fallback = lazy(() => import('./components/Fallback'));

function App() {
	const { user } = useUser();
	const location = useLocation();

	return (
		<div className='App'>
			<div className='container'>
				<ErrorBoundary FallbackComponent={Fallback}>
					<Suspense fallback={<Loader />}>
						<Switch location={location} key={location.key}>
							<Route path='/login' exact component={Login} />
							<Route path='/callback' exact component={Callback} />
							<Route path='/topartists' component={TopArtists} />
							<Route path='/toptracks' component={TopTracks} />
							<Route path='/dashboard' exact component={Dashboard} />
							<Route path='/'>
								{user ? <Redirect to='/dashboard' /> : <Redirect to='/login' />}
							</Route>
						</Switch>

						{/* <Help /> */}
						<Footer />
					</Suspense>
				</ErrorBoundary>
			</div>
		</div>
	);
}

export default App;

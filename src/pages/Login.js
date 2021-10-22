import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { beginLogin } from '../helpers/spotify';
import useUser from '../helpers/useUser';

function Login() {
	const { user } = useUser();
	let history = useHistory();

	useEffect(() => {
		if (user) {
			history.replace('/dashboard');
		}
	}, [user, history]);

	return (
		<div className='Login flex center'>
			<div className='Login__Title'>
				<h1>
					<span>TOP</span>Spot
				</h1>
			</div>

			<div className='Login__Link'>
				<button
					onClick={async () => {
						await beginLogin();
					}}
					className='btn-primary'
				>
					Login with Spotify
				</button>
			</div>
		</div>
	);
}

export default Login;

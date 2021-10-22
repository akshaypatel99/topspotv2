import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { completeLogin } from '../helpers/spotify';
import Loader from '../components/Loader';

function Callback() {
	const [error, setError] = useState();
	let history = useHistory();

	useEffect(() => {
		completeLogin()
			.then(() => {
				history.push('/dashboard');
			})
			.catch((error) => {
				setError(error.message);
				setTimeout(() => history.push('/login'), 5000);
			});
	}, [history]);

	return (
		<div className='Callback flex-column center text-center'>
			{error ? (
				<div>{error}</div>
			) : (
				<>
					<h2>Logging you in...</h2>
					<Loader />
				</>
			)}
		</div>
	);
}

export default Callback;

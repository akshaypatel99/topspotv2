import { useHistory } from 'react-router-dom';

function Fallback({ error }) {
	const history = useHistory();

	return (
		<div className='Fallback'>
			<h3>Oops! Something went wrong</h3>
			<p>{error?.body.error_description}</p>
			<h5>Please re-login and try again.</h5>
			<button className='btn-secondary' onClick={() => history.push('/login')}>
				Back to login
			</button>
		</div>
	);
}

export default Fallback;

import { renderWithClient } from './utils';
import Login from '../pages/Login';

test('renders login with spotify link', () => {
	const result = renderWithClient(<Login />);
	expect(
		result.getByRole('button', { name: /Login with Spotify/i })
	).toBeInTheDocument();
});

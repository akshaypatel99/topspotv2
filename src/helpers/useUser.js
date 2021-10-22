import { useQuery } from 'react-query';
import { fetchWithToken } from './spotify';
import { USER_ENDPOINT } from '../constants/endpoints';

export default function useUser() {
	const userURL = USER_ENDPOINT;
	const { data, status, error } = useQuery(
		['user', userURL],
		() => fetchWithToken(userURL),
		{
			enabled: !!userURL,
		}
	);

	return {
		user: data,
		status,
		error,
		loggedOut: error?.status === 401,
	};
}

import { useFetch } from './useFetch';
import { USER_ENDPOINT } from '../constants/endpoints';

export default function useUser() {
	const userURL = USER_ENDPOINT;
	const { data, status, error } = useFetch('user', userURL, userURL);

	return {
		user: data,
		status,
		error,
		loggedOut: error?.status === 401,
	};
}

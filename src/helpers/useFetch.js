import { useQuery } from 'react-query';
import { fetchWithToken } from './spotify';

export const useFetch = (key, url, option) => {
	const { data, status, error, isFetching } = useQuery(
		[`${key}`, { url }],
		() => fetchWithToken(url),
		{ enabled: !!option }
	);

	return { data, status, error, isFetching };
};

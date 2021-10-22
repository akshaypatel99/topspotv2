import { useQuery } from 'react-query';
import { fetchWithToken } from '../helpers/spotify';
import { TRACK_FEATURES_ENDPOINT } from '../constants/endpoints';
import ProgressBar from './ProgressBar';
import { IntersectionObserver } from './IntersectionObserver';

const TrackFeatures = ({ id }) => {
	let spotifyUrl = `${TRACK_FEATURES_ENDPOINT}/${id}`;

	const { data: features, status } = useQuery(
		['track_features', spotifyUrl],
		() => fetchWithToken(spotifyUrl),
		{
			enabled: !!id,
		}
	);

	return (
		<div className='TrackFeatures'>
			{status === 'loading' ? (
				<h5>Loading...</h5>
			) : status === 'error' ? (
				<h5>Sorry, Audio Features is unavailable for this track.</h5>
			) : (
				<IntersectionObserver>
					<ProgressBar
						title='Danceability'
						width={features.danceability * 100}
					/>
					<ProgressBar title='Energy' width={features.energy * 100} />
					<ProgressBar title='Loudness' width={(features.loudness / 2) * -10} />
					<ProgressBar title='Positivity' width={features.valence * 100} />
				</IntersectionObserver>
			)}
		</div>
	);
};

export default TrackFeatures;

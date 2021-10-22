import { useQuery } from 'react-query';
import { fetchWithToken } from '../helpers/spotify';
import { RELATED_ARTISTS_ENDPOINT } from '../constants/endpoints';

function RelatedArtists({ id }) {
	let spotifyUrl = `${RELATED_ARTISTS_ENDPOINT}/${id}/related-artists`;

	const { data: relArtists, status } = useQuery(
		['related_artists', spotifyUrl],
		() => fetchWithToken(spotifyUrl),
		{
			enabled: !!id,
		}
	);

	return (
		<div className='RelatedArtists'>
			<h4 className='RelatedArtists__Title my-half'>Related Artists:</h4>
			{status === 'loading' ? (
				<h5>Loading...</h5>
			) : status === 'error' ? (
				<h5>No related artists found.</h5>
			) : (
				<>
					<div className='RelatedArtists__Body flex'>
						{relArtists.artists.slice(0, 2).map((artist, i) => {
							return (
								<span className='RelatedArtists__Item' key={i}>
									{artist.name}
								</span>
							);
						})}
					</div>
				</>
			)}
		</div>
	);
}

export default RelatedArtists;

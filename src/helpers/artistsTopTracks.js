import axios from 'axios';

export const fetchArtistsTopTracks = async (artistId) => {
	try {
		const { access_token } = JSON.parse(localStorage.getItem('topspot_tokens'));
		const response = await axios.get(
			`https://api.spotify.com/v1/artists/${artistId}/top-tracks?country=from_token`,
			{
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${access_token}`,
				},
			}
		);
		console.log(response.data);
		if (!response.data.tracks) {
			return [];
		}
		const artTopTracks = response.data.tracks
			.slice(0, 3)
			.map((track) => track.uri);
		console.log(artTopTracks);
		return artTopTracks;
	} catch (error) {
		console.log(error);
	}
};

export const fetchTopArtistsTopTracks = async (artists) => {
	const artistIds = artists.map((artist) => artist.id);
	let artistsTracks = await Promise.all(
		artistIds.map((id) => fetchArtistsTopTracks(id))
	);
	return artistsTracks.flat();
};

export function sortTopArtists(data) {
	return data.items.map((artist) => ({
		id: artist.id,
		name: artist.name,
		popularity: artist.popularity,
		image: artist.images.length > 0 ? artist.images[1].url : null,
		spotifyUrl: artist.external_urls.spotify,
		uri: artist.uri,
		genres: {
			primary: artist.genres[0] ?? 'No genres found',
			secondary: artist.genres[1] ?? '',
		},
		data2: artist.genres[0] ?? 'No genres found',
	}));
}

export function sortTopTracks(data) {
	return data.items.map((track) => ({
		id: track.id,
		name: track.name,
		artist: track.artists[0].name,
		image: track.album.images[1].url,
		spotifyUrl: track.external_urls.spotify,
		uri: track.uri,
		data2: track.artists[0].name,
	}));
}

export function filterTrackUri(data) {
	return data.items.map((track) => track.uri);
}

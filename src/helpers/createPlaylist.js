import axios from 'axios';

export const createPlaylist = async (userId, timeRange, playlistURIs) => {
	let name;
	let date =
		new Date().getDate().toString() +
		'/' +
		new Date().getMonth().toString() +
		'/' +
		new Date().getFullYear().toString();
	if (timeRange === 'long_term') {
		name = 'TOP 50 - All Time ' + date;
	} else if (timeRange === 'medium_term') {
		name = 'TOP 50 - Last 6 Months' + date;
	} else if (timeRange === 'short_term') {
		name = 'TOP 50 - Last Month' + date;
	}

	if (!playlistURIs.length) {
		return;
	}

	const { access_token } = JSON.parse(localStorage.getItem('topspot_tokens'));

	const headers = { Authorization: `Bearer ${access_token}` };
	const response = await axios.post(
		`https://api.spotify.com/v1/users/${userId}/playlists`,
		{
			headers: headers,
			method: 'POST',
			body: JSON.stringify({ name: name }),
		}
	);
	console.log(response.data);
	const playlistId = response.data.id;
	return axios.post(
		`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`,
		{
			headers: headers,
			method: 'POST',
			body: JSON.stringify({ uris: playlistURIs }),
		}
	);
};

export const savePlaylist = async (timeRange, playlistURIs, userId) => {
	let name;
	let date =
		new Date().getDate().toString() +
		'/' +
		new Date().getMonth().toString() +
		'/' +
		new Date().getFullYear().toString();
	if (timeRange === 'long_term') {
		name = 'TOP 50 - All Time ' + date;
	} else if (timeRange === 'medium_term') {
		name = 'TOP 50 - Last 6 Months ' + date;
	} else if (timeRange === 'short_term') {
		name = 'TOP 50 - Last Month ' + date;
	} else {
		name = 'TOP 50 - created with TOPSpot';
	}

	if (!playlistURIs.length) {
		return;
	}

	const { access_token } = JSON.parse(localStorage.getItem('topspot_tokens'));

	const headers = {
		Authorization: `Bearer ${access_token}`,
		'Content-Type': 'application/json',
	};

	const response = await fetch(
		`https://api.spotify.com/v1/users/${userId}/playlists`,
		{
			headers: headers,
			method: 'POST',
			body: JSON.stringify({ name: name }),
		}
	);
	const { id: playlist_id } = await response.json();

	return fetch(`https://api.spotify.com/v1/playlists/${playlist_id}/tracks`, {
		headers: headers,
		method: 'POST',
		body: JSON.stringify({ uris: playlistURIs }),
	});
};

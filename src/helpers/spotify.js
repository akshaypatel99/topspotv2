// Generate random values
function randomBytes(size) {
	return crypto.getRandomValues(new Uint8Array(size));
}

// Convert random values to base64URL encoded string
function base64url(bytes) {
	return Buffer.from(bytes)
		.toString('base64')
		.replace(/=/g, '')
		.replace(/\+/g, '-')
		.replace(/\//g, '_');
}

// Code challenge
async function generateCodeChallenge(code_verifier) {
	const codeVerifierBytes = new TextEncoder().encode(code_verifier);
	const hashBuffer = await crypto.subtle.digest('SHA-256', codeVerifierBytes);
	return base64url(new Uint8Array(hashBuffer));
}

// Fetch data
async function fetchJSON(input, init) {
	const response = await fetch(input, init);
	const body = await response.json();
	if (!response.ok) {
		console.log(response, body);
		throw new ErrorResponse(response, body);
	}
	return body;
}

// Custom Error
class ErrorResponse extends Error {
	constructor(response, body) {
		super(response.statusText);
		this.status = response.status;
		this.body = body;
	}
}

export async function beginLogin() {
	const code_verifier = base64url(randomBytes(96));
	const state = base64url(randomBytes(96));

	const params = new URLSearchParams({
		client_id: 'b0f462aff74f4733b5613cac9273d9af',
		response_type: 'code',
		redirect_uri: 'http://localhost:3000/callback',
		code_challenge_method: 'S256',
		code_challenge: await generateCodeChallenge(code_verifier),
		state: state,
		scope: [
			'user-top-read',
			'user-read-private',
			'user-follow-read',
			'playlist-modify-public',
			'streaming',
		],
	});

	sessionStorage.setItem('code_verifier', code_verifier);
	sessionStorage.setItem('state', state);

	window.location.href = `https://accounts.spotify.com/authorize?${params}`;
}

export async function completeLogin() {
	const code_verifier = sessionStorage.getItem('code_verifier');
	const state = sessionStorage.getItem('state');

	const params = new URLSearchParams(window.location.search);

	if (params.has('error')) {
		throw new Error(params.get('error'));
	} else if (!params.has('state')) {
		throw new Error('State missing from response');
	} else if (params.get('state') !== state) {
		throw new Error('State mismatch');
	} else if (!params.has('code')) {
		throw new Error('Code missing from response');
	}

	await createAccessToken({
		grant_type: 'authorization_code',
		code: params.get('code'),
		redirect_uri: `http://localhost:3000/callback`,
		code_verifier: code_verifier,
	});
}

// Logout
export function logout() {
	localStorage.removeItem('topspot_tokens');
}

// Request Data
export async function fetchWithToken(input) {
	const accessToken = await getAccessToken();

	if (!accessToken) {
		throw new ErrorResponse(new Response(undefined, { status: 401 }), {});
	}

	return fetchJSON(input, {
		headers: { Authorization: `Bearer ${accessToken}` },
	});
}

// Create Access Token
async function createAccessToken(params) {
	const response = await fetchJSON('https://accounts.spotify.com/api/token', {
		method: 'POST',
		body: new URLSearchParams({
			client_id: 'b0f462aff74f4733b5613cac9273d9af',
			...params,
		}),
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
		},
	});

	const accessToken = response.access_token;
	const expires_at = Date.now() + 1000 * response.expires_in;

	localStorage.setItem(
		'topspot_tokens',
		JSON.stringify({ ...response, expires_at })
	);

	return accessToken;
}

// Get Access Token
async function getAccessToken() {
	let topspot_tokens = JSON.parse(localStorage.getItem('topspot_tokens'));

	if (!topspot_tokens) return;

	if (topspot_tokens.expires_at < Date.now()) {
		topspot_tokens = await createAccessToken({
			grant_type: 'refresh_token',
			refresh_token: topspot_tokens.refresh_token,
		});
	}

	return topspot_tokens.access_token;
}

// Create and save Top 50 playlist
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

	const access_token = await getAccessToken();

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

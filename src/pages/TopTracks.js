import { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { useQuery } from 'react-query';
import useUser from '../helpers/useUser';
import { motion } from 'framer-motion';
import { TOP_TRACKS_ENDPOINT } from '../constants/endpoints';
import { fetchWithToken, savePlaylist } from '../helpers/spotify';
import { sortTopTracks, filterTrackUri } from '../helpers/sortData';
import { containerVariants } from '../helpers/animate';
import { IntersectionObserver } from '../components/IntersectionObserver';
import NavBar from '../components/NavBar';
import Loader from '../components/Loader';
import TimeRange from '../components/TimeRange';
import TrackCard from '../components/TrackCard';
import Table from '../components/Table';
import ScrollTopArrow from '../components/ScrollTopArrow';
import {
	RiAddCircleFill,
	RiListOrdered,
	RiPlayCircleLine,
	RiMvLine,
} from 'react-icons/ri';

function TopTracks() {
	const [timeRange, setTimeRange] = useState('medium_term');
	const [showMedia, setShowMedia] = useState(false);
	let history = useHistory();
	const { user } = useUser();

	let spotifyUrl = TOP_TRACKS_ENDPOINT + timeRange;

	const {
		data: tracks,
		status,
		error,
		isFetching,
	} = useQuery(['top_tracks', spotifyUrl], () => fetchWithToken(spotifyUrl), {
		enabled: !!timeRange,
	});

	useEffect(() => {
		if (error) {
			setTimeout(() => history.push('/login'), 8000);
		}
	}, [error, history]);

	function createPlaylistHandler() {
		const playlistURIs = filterTrackUri(tracks);
		savePlaylist(timeRange, playlistURIs, user.id);
	}

	const scrollTableRef = useRef(null);

	const scrollSmoothHandler = () => {
		scrollTableRef.current.scrollIntoView({ behavior: 'smooth' });
	};

	return (
		<>
			<NavBar />
			<motion.div
				className='TopTracks text-center pt-4'
				variants={containerVariants}
				initial='hidden'
				animate='visible'
			>
				<div className='TopTracks__Header mt-2 py-2'>
					<h1>
						<span>TOP</span>Tracks
					</h1>
				</div>
				<div className='TopTracks__Menu'>
					<TimeRange timeRange={timeRange} setTimeRange={setTimeRange} />
					<div className='TopTracks__Menu__Options flex center my-1'>
						<button
							className='btn-secondary'
							onClick={() => setShowMedia(!showMedia)}
						>
							{showMedia ? (
								<>
									<RiMvLine size='20px' /> Show Album Art{' '}
								</>
							) : (
								<>
									<RiPlayCircleLine size='20px' /> Show Tracks{' '}
								</>
							)}
						</button>

						<button className='btn-secondary' onClick={scrollSmoothHandler}>
							<RiListOrdered size='20px' /> All Results
						</button>

						<button className='btn-secondary' onClick={createPlaylistHandler}>
							<RiAddCircleFill size='20px' /> Create Playlist
						</button>
					</div>
				</div>
				{status === 'loading' ? (
					<Loader />
				) : status === 'error' ? (
					<span>
						Error: {error?.body.error_description}. Please login again.
						Redirecting you shortly...
					</span>
				) : (
					<motion.div
						className='TopTracks__Content'
						variants={containerVariants}
					>
						{sortTopTracks(tracks)
							.slice(0, 10)
							.map((track, i) => (
								<IntersectionObserver key={track.id}>
									<TrackCard
										number={i}
										id={track.id}
										name={track.name}
										artist={track.artist}
										image={track.image}
										uri={track.uri}
										showMedia={showMedia}
									/>
								</IntersectionObserver>
							))}
						<div ref={scrollTableRef} className='py-3'></div>
						<div className='TopTracks__Content__Table'>
							<h1 className='mb-2'>
								<span>All</span>Tracks
							</h1>
							<IntersectionObserver>
								<Table sortingFn={sortTopTracks} data={tracks} />
							</IntersectionObserver>
						</div>
					</motion.div>
				)}
				<div>{isFetching ? 'Fetching data...' : ' '}</div>
			</motion.div>
			<ScrollTopArrow />
		</>
	);
}

export default TopTracks;

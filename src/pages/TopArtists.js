import { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { motion } from 'framer-motion';
import { RiListOrdered } from 'react-icons/ri';
import { TOP_ARTISTS_ENDPOINT } from '../constants/endpoints';
import { useFetch } from '../helpers/useFetch';
import { sortTopArtists } from '../helpers/sortData';
import { containerVariants } from '../helpers/animate';
import { IntersectionObserver } from '../components/IntersectionObserver';
import NavBar from '../components/NavBar';
import Loader from '../components/Loader';
import TimeRange from '../components/TimeRange';
import Card from '../components/Card';
import Table from '../components/Table';
import ScrollTopArrow from '../components/ScrollTopArrow';

function TopArtists() {
	const [timeRange, setTimeRange] = useState('medium_term');
	let history = useHistory();

	let spotifyUrl = TOP_ARTISTS_ENDPOINT + timeRange;

	const {
		data: artists,
		status,
		error,
		isFetching,
	} = useFetch('top_artists', spotifyUrl, timeRange);

	useEffect(() => {
		if (error) {
			setTimeout(() => history.push('/login'), 8000);
		}
	}, [error, history]);

	const scrollTableRef = useRef(null);

	const scrollSmoothHandler = () => {
		scrollTableRef.current.scrollIntoView({ behavior: 'smooth' });
	};

	return (
		<>
			<NavBar />
			<motion.div
				className='TopArtists text-center pt-4'
				variants={containerVariants}
				initial='hidden'
				animate='visible'
			>
				<div className='TopArtists__Header mt-2 py-2'>
					<h1>
						<span>TOP</span>Artists
					</h1>
				</div>
				<div className='TopArtists__Menu'>
					<TimeRange timeRange={timeRange} setTimeRange={setTimeRange} />
					<div className='TopArtists__Menu__Options flex center my-1'>
						<button className='btn-secondary' onClick={scrollSmoothHandler}>
							<RiListOrdered size='20px' /> All Results
						</button>
					</div>
				</div>
				{status === 'loading' ? (
					<Loader />
				) : status === 'error' && error ? (
					<span>
						Error: {error?.body.error_description}. Please login again.
						Redirecting you shortly...
					</span>
				) : (
					<motion.div
						className='TopArtists__Content'
						variants={containerVariants}
					>
						{sortTopArtists(artists)
							.slice(0, 10)
							.map((artist, i) => (
								<IntersectionObserver key={artist.id}>
									<Card
										number={i}
										id={artist.id}
										name={artist.name}
										image={artist.image}
										spotifyUrl={artist.spotifyUrl}
										popularity={artist.popularity}
										genre1={artist.genres.primary}
										genre2={artist.genres.secondary}
									/>
								</IntersectionObserver>
							))}
						<div ref={scrollTableRef} className='py-3'></div>
						<div
							className='TopArtists__Content__Table'
							data-testid='artists-table'
						>
							<h1 className='mb-2'>
								<span>All</span>Artists
							</h1>
							<IntersectionObserver>
								<Table sortingFn={sortTopArtists} data={artists} />
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

export default TopArtists;

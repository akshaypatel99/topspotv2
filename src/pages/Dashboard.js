import { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { motion } from 'framer-motion';
import { containerVariants, linkVariants } from '../helpers/animate';
import { RiSpotifyFill } from 'react-icons/ri';
import useUser from '../helpers/useUser';
import NavBar from '../components/NavBar';
import Loader from '../components/Loader';

function Dashboard() {
	let history = useHistory();
	const { user, status, error } = useUser();

	useEffect(() => {
		if (error) {
			setTimeout(() => history.push('/login'), 8000);
		}
	}, [error, history]);

	return (
		<>
			<NavBar />
			<motion.div
				className='Dashboard'
				variants={containerVariants}
				initial='hidden'
				animate='visible'
			>
				<div className='Dashboard__Wrapper flex center mt-4'>
					<div className='Dashboard__Header flex center'>
						{status === 'loading' ? (
							<Loader />
						) : status === 'error' ? (
							<span>Error: {error?.body.error_description}</span>
						) : (
							<>
								<div className='Dashboard__Header__Image flex center'>
									{user.images ? (
										<img src={user?.images[0].url} alt='Profile' />
									) : (
										<RiSpotifyFill size='4em' />
									)}
								</div>

								<div className='Dashboard__Header__Intro flex'>
									<a
										href={user?.external_urls.spotify}
										target='_blank'
										rel='noreferrer'
									>
										<span>{user?.display_name}</span>
									</a>
									<h5 className='mt-1'>
										Take a look at your most listened to artists and tracks.
									</h5>
								</div>
							</>
						)}
					</div>
					<div className='Dashboard__Menu flex'>
						<Link to='/topartists' className='Dashboard__Menu__Link'>
							<motion.h1
								variants={linkVariants}
								initial='hidden'
								animate='visible'
								whileHover='hover'
							>
								<span>TOP</span>Artists
							</motion.h1>
						</Link>
						<Link to='/toptracks' className='Dashboard__Menu__Link'>
							<motion.h1
								variants={linkVariants}
								initial='hidden'
								animate='visible'
								whileHover='hover'
							>
								<span>TOP</span>Tracks
							</motion.h1>
						</Link>
					</div>
				</div>
			</motion.div>
		</>
	);
}

export default Dashboard;

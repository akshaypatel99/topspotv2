import { useContext } from 'react';
import { motion } from 'framer-motion';
import { cardVariants } from '../helpers/animate';
import { IntersectionContext } from './IntersectionObserver';
import TrackFeatures from './TrackFeatures';

function TrackCard({ number, id, name, artist, image, uri, showMedia }) {
	const { inView } = useContext(IntersectionContext);

	return (
		<motion.section
			variants={cardVariants}
			initial='hidden'
			animate={inView ? 'visible' : 'hidden'}
		>
			<div className='TrackCard my-1 flex'>
				<div className='TrackCard__Number my-2'>
					<h2>
						{String.fromCharCode(8212)} {number + 1} {String.fromCharCode(8212)}
					</h2>
				</div>
				<div className='TrackCard__Media'>
					{showMedia ? (
						<iframe
							title={id}
							src={`https://open.spotify.com/embed?uri=${uri}`}
							loading='lazy'
							width='300'
							height='380'
							frameBorder='0'
							allowtransparency='true'
							allow='encrypted-media'
							referrerPolicy='no-referrer'
						></iframe>
					) : (
						<img src={image} alt={name} />
					)}
				</div>
				<div className='TrackCard__Body flex center'>
					<div className='TrackCard__Body__Title flex center mt-1'>
						<h1>{name}</h1>
						<div className='bottom-line-short'></div>
						<h2>{artist}</h2>
					</div>
					<div
						className='TrackCard__Body__Features my-1'
						data-testid='tracks-features'
					>
						<TrackFeatures id={id} />
					</div>
				</div>
			</div>
			<div className='bottom-line'></div>
		</motion.section>
	);
}

export default TrackCard;

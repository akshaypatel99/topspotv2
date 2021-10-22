import { useContext } from 'react';
import RelatedArtists from './RelatedArtists';
import ProgressBar from './ProgressBar';
import { motion } from 'framer-motion';
import { cardVariants } from '../helpers/animate';
import {
	IntersectionObserver,
	IntersectionContext,
} from './IntersectionObserver';

const Card = ({
	number,
	id,
	name,
	image,
	spotifyUrl,
	popularity,
	genre1,
	genre2,
}) => {
	const { inView } = useContext(IntersectionContext);

	return (
		<motion.section
			variants={cardVariants}
			initial='hidden'
			animate={inView ? 'visible' : 'hidden'}
		>
			<div className='Card my-1 flex'>
				<div className='Card__Image flex center'>
					<img src={image} alt='artist' className='flex center' />
				</div>
				<div className='Card__Body flex center mt-2 mb-1'>
					<div className='Card__Body__Number'>
						<h2>
							{String.fromCharCode(8212)} {number + 1}{' '}
							{String.fromCharCode(8212)}
						</h2>
					</div>
					<div className='Card__Body__Title mt-1 mb-2'>
						<a href={spotifyUrl} target='_blank' rel='noreferrer'>
							<h1>{name}</h1>
						</a>
					</div>
					<div className='Card__Body__Popularity my-half'>
						<IntersectionObserver>
							<ProgressBar title='Popularity' width={popularity} />
						</IntersectionObserver>
					</div>
					<div className='Card__Body__Genres my-half'>
						<h4>Genres: </h4>
						{genre1 && (
							<div className='badge1 my-1'>
								<span>{genre1}</span>
							</div>
						)}
						{genre2 && (
							<div className='badge2'>
								<span>{genre2}</span>
							</div>
						)}
					</div>
					<div className='Card__Body__Related'>
						<RelatedArtists id={id} />
					</div>
				</div>
			</div>
			<div className='bottom-line'></div>
		</motion.section>
	);
};

export default Card;

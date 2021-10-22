import { useContext } from 'react';
import { motion } from 'framer-motion';
import { IntersectionContext } from './IntersectionObserver';

const ProgressBar = ({ title, width }) => {
	const { inView } = useContext(IntersectionContext);

	return (
		<div className='ProgressBar'>
			<h4>{title}:</h4>
			<div className='progress'>
				<motion.div
					initial={{ width: 0 }}
					animate={inView ? { width: `${width}%` } : { width: 0 }}
					transition={{ duration: 0.5, delay: 0.2 }}
				></motion.div>
			</div>
		</div>
	);
};

export default ProgressBar;

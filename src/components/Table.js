import { useContext } from 'react';
import ListItem from './ListItem';
import { motion } from 'framer-motion';
import { tableVariants, showVariants } from '../helpers/animate';
import { IntersectionContext } from './IntersectionObserver';

function Table({ sortingFn, data }) {
	const { inView } = useContext(IntersectionContext);

	return (
		<motion.div
			variants={tableVariants}
			initial='hidden'
			animate={inView ? 'visible' : 'hidden'}
		>
			{sortingFn(data).map((item, i) => (
				<motion.div key={item.uri} variants={showVariants}>
					<ListItem
						number={i}
						image={item.image}
						data1={item.name}
						data2={item.data2}
					/>
				</motion.div>
			))}
		</motion.div>
	);
}

export default Table;

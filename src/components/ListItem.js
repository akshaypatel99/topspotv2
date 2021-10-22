import { motion } from 'framer-motion';
import { hoverVariants } from '../helpers/animate';

function ListItem({ number, image, data1, data2 }) {
	return (
		<motion.div
			className='ListItem'
			variants={hoverVariants}
			whileHover='hover'
		>
			<div className='ListItem__Number'>
				<h6>#{number + 1}</h6>
			</div>
			<div className='ListItem__Image'>
				<img src={image} alt='' />
			</div>
			<div className='ListItem__Data1'>
				<h6>{data1}</h6>
			</div>
			<div className='ListItem__Data2'>
				<h6>{data2}</h6>
			</div>
			<div className='bottom-line'></div>
		</motion.div>
	);
}

export default ListItem;

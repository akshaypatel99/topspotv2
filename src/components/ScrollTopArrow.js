import React, { useState } from 'react';
import { BiArrowToTop } from 'react-icons/bi';

const ScrollTopArrow = () => {
	const [showScroll, setShowScroll] = useState(false);

	const checkScrollTop = () => {
		if (!showScroll && window.pageYOffset > 400) {
			setShowScroll(true);
		} else if (showScroll && window.pageYOffset <= 400) {
			setShowScroll(false);
		}
	};

	const scrollTop = () => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	};

	window.addEventListener('scroll', checkScrollTop);

	return (
		<button className='ScrollTop' onClick={scrollTop}>
			<BiArrowToTop size='32px' />
		</button>
	);
};

export default ScrollTopArrow;

import React from 'react';
import { RiGithubFill } from 'react-icons/ri';

const Footer = () => {
	return (
		<div className='Footer flex center py-1'>
			<a
				href='https://github.com/akshaypatel99'
				target='_blank'
				rel='noreferrer'
			>
				<RiGithubFill color='white' size='28px' />
			</a>
		</div>
	);
};

export default Footer;

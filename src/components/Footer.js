import { RiGithubFill } from 'react-icons/ri';

function Footer() {
	return (
		<div className='Footer flex center py-1'>
			<a
				href='https://github.com/akshaypatel99'
				aria-label='Github'
				aria-roledescription='Link to Github repository'
				target='_blank'
				rel='noreferrer'
			>
				<RiGithubFill color='white' size='28px' />
			</a>
		</div>
	);
}

export default Footer;

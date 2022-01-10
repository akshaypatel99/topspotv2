import { NavLink, useHistory } from 'react-router-dom';
import { RiHome5Fill, RiLogoutBoxLine, RiGithubFill } from 'react-icons/ri';
import { logout } from '../helpers/spotify';

function NavBar() {
	let history = useHistory();

	function logoutHandler() {
		logout();
		setTimeout(() => {
			history.replace('/login');
		}, 2000);
	}

	return (
		<nav id='navbar' className='NavBar flex py-half'>
			<div className='NavBar__Menu'>
				<ul className='flex'>
					<li>
						<NavLink
							to='/dashboard'
							aria-label='Dashboard'
							aria-roledescription='Link to Dashboard page'
							exact
							activeStyle={{
								borderColor: '#1db954',
							}}
						>
							<RiHome5Fill size='20px' />
						</NavLink>
					</li>
					<li onClick={logoutHandler}>
						<NavLink
							to=''
							exact
							aria-label='Log out'
							aria-roledescription='Logout button'
							activeStyle={{
								borderColor: '#1db954',
							}}
						>
							<RiLogoutBoxLine size='20px' />
						</NavLink>
					</li>
					<li>
						<NavLink
							to='https://github.com/akshaypatel99'
							aria-label='Github'
							aria-roledescription='Link to Github repository'
							activeStyle={{
								borderColor: '#1db954',
							}}
							target='_blank'
							rel='noreferrer'
						>
							<RiGithubFill color='white' size='22px' />
						</NavLink>
					</li>
					<li>
						<NavLink
							to='/topartists'
							activeStyle={{
								borderColor: '#1db954',
							}}
						>
							<span>TOP</span>Artists
						</NavLink>
					</li>
					<li>
						<NavLink
							to='/toptracks'
							activeStyle={{
								borderColor: '#1db954',
							}}
						>
							<span>TOP</span>Tracks
						</NavLink>
					</li>
				</ul>
			</div>
		</nav>
	);
}

export default NavBar;

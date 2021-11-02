import { NavLink, useHistory } from 'react-router-dom';
import { RiHome5Fill, RiLogoutBoxLine } from 'react-icons/ri';
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
							activeStyle={{
								borderColor: '#1db954',
							}}
						>
							<RiLogoutBoxLine size='20px' />
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

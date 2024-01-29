import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import learnItLogo from '../../assets/logo.svg'
import logoutIcon from '../../assets/logout.svg'
import Button from 'react-bootstrap/Button'
import {Link} from 'react-router-dom'
import {useContext} from 'react'
import {AuthContext} from '../../contexts/AuthContext'
import ChangePassModal from './ChangePassModal'
import Toast from 'react-bootstrap/Toast'


const NavbarMenu = ()=>{
	const {
		authState: {user: {username}},
		logoutUser,
		showToast: {show,message,type},
		setShowToast,
		setShowChangePassModal
	} = useContext(AuthContext)


	return(
		<>
		<Navbar expand='lg' bg='primary' variant='dark' className='shadow'>
			<Navbar.Brand className='font-weight-bolder text-white'>
				<img
					src={learnItLogo}
					alt='learnItLogo'
					width='32'
					height='32'
					className='mr-2'
				/>
				<span>&nbsp;</span>
				LearnIt
			</Navbar.Brand>

			<Navbar.Toggle aria-controls='basic-navbar-nav' />

			<Navbar.Collapse id='basic-navbar-nav'>
				<Nav className='mr-auto'>
					<Nav.Link className='font-weight-bolder text-white' to='/dashboard' as={Link}>
						Dashboard
					</Nav.Link>
					<Nav.Link className='font-weight-bolder text-white' to='/schedule' as={Link}>
						Schedule
					</Nav.Link>
					<Nav.Link className='font-weight-bolder text-white' to='/file' as={Link}>
						File Manager
					</Nav.Link>
					<Nav.Link className='font-weight-bolder text-white' to='/about' as={Link}>
						About
					</Nav.Link>
				</Nav>
			</Navbar.Collapse>
				<Nav>
					<Nav.Link className='font-weight-bolder text-white' onClick={setShowChangePassModal.bind(this,true)}>
						Welcome {username}
					</Nav.Link>
					<Button variant='secondary' className='font-weight-bolder text-white' onClick={logoutUser}>
						<img src={logoutIcon} alt='logout' width='32' height='32' className='mr-2'/>
						Logout
					</Button>
				</Nav>
			
		</Navbar>
		<ChangePassModal />
		<Toast 
			show={show}
			style={{position:'fixed' ,zIndex:'10',top:'20%',right:'10px'}} 
			className={`bg-${type} text-white`}
			onClose={setShowToast.bind(this, {show:false,message:'',type:null})}
			delay={3000}
			autohide
		>
			<Toast.Body>
				<strong>{message}</strong>
			</Toast.Body>
		</Toast>
		</>
	)
}

export default NavbarMenu
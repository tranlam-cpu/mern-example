import LoginForm from '../components/auth/LoginForm'
import RegisterForm from '../components/auth/RegisterForm'
import ForgetPasswordForm from '../components/auth/ForgetPasswordForm'
import {AuthContext} from '../contexts/AuthContext'
import {useContext} from 'react'
import {useNavigate} from 'react-router-dom'
import Spinner from 'react-bootstrap/Spinner'

const Auth = ({ authRoute }) => {
	const {authState: {authLoading, isAuthenticated}}= useContext(AuthContext)
	const navigate=useNavigate()

	let body

	if(authLoading){
		body = (
			<div className="d-flex justify-content-center mt-2">
				<Spinner animation='border' variant='info' />
			</div>
		)
	}
	else if(isAuthenticated) return navigate('/dashboard')
	else{
		body=(
			<>
		
			{authRoute === 'login' && <LoginForm />}
			{authRoute === 'register' && <RegisterForm />}
			{authRoute === 'forgotpassword' && <ForgetPasswordForm />}
			</>
		)
	}
	return(
		<div className="landing">
			<div className="dark-overlay">
				<div className="landing-inner">
					<h1>LearnIt</h1>
					<h4>Keep trach of what you are learning</h4>
					{body}
				</div>
			</div>
		</div>
	)
}

export default Auth
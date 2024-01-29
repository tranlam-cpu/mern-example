import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import {Link,useNavigate} from 'react-router-dom'
import {useContext, useState} from 'react'
import {AuthContext} from '../../contexts/AuthContext'
import AlertMessage from '../layout/AlertMessage'

const RegisterForm = ()=>{

	// Context
	const {registerUser} = useContext(AuthContext)

	//route
	const navigate=useNavigate()
	

	// Local state
	const [registerForm, setRegisterForm] = useState({
		username: "",
		email: "",
		password: "",
		confirmPassword: ""
	})

	const [alert,setAlert] = useState(null)

	const {username, email, password, confirmPassword} = registerForm

	const onChangeRegisterForm = event => setRegisterForm({...registerForm, [event.target.name]: event.target.value})

	const register= async event =>{
		event.preventDefault()

		if(password !== confirmPassword){
			setAlert({type: 'danger', message: 'Passwords do not match'})
			setTimeout(()=> setAlert(null),5000)
			return
		}else if(/^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/.test(email)===false){
			setAlert({type: 'danger', message: 'Email invalidate'})
			setTimeout(()=> setAlert(null),5000)
			return
		}

		try{
			const registerData = await registerUser(registerForm)
			if(!registerData.success){
				setAlert({type: 'danger', message: registerData.message})
				setTimeout(()=>setAlert(null),5000)
			}else{
				navigate('/login')
			}
		}catch(error){
			console.log(error);
		}


		
	}

	return (
		<>
		<Form className="my-4" onSubmit={register}>
		<AlertMessage info={alert} />
			<Form.Group>
				<Form.Control 
				type='text' 
				placeholder="User name" 
				name='username' 
				value={username}
				onChange={onChangeRegisterForm}
				required 
				/>
			</Form.Group>
			<Form.Group>
				<Form.Control 
				type='text' 
				placeholder="Email" 
				name='email' 
				value={email}
				onChange={onChangeRegisterForm}
				required 
				/>
			</Form.Group>
			<Form.Group>
				<Form.Control
				 type='password' 
				 placeholder="Password" 
				 name='password'
				 value={password}
				 onChange={onChangeRegisterForm}
				 required 
				 />
			</Form.Group>
			<Form.Group>
				<Form.Control 
				type='password' 
				placeholder="Confirm password" 
				name='confirmPassword'
				value={confirmPassword}
				onChange={onChangeRegisterForm} 
				required 
				/>
			</Form.Group>
			<Button variant='success' type='submit'>Register</Button>
		
		</Form>
		<p>
			Already have an account?
			<Link to='/login' style={{marginLeft:'1em'}}>
				<Button variant='info' size='sm' className='m1-2'>Login </Button>
			</Link>
			<span style={{margin:'1em'}}>/</span> 
			<Link to='/forgotpassword'>
				<Button variant='warning' size='sm' className='m1-2'>Forgot Password </Button>
			</Link>
		</p>
		</>
	)
}

export default RegisterForm
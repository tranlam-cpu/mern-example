import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import {Link,useNavigate} from 'react-router-dom'
import {useContext, useState} from 'react'
import {AuthContext} from '../../contexts/AuthContext'
import AlertMessage from '../layout/AlertMessage'

const ForgetPasswordForm =()=>{
	// Context
	const {ForgetPassword} = useContext(AuthContext)
	//route
	const navigate=useNavigate()

	// Local state
	const [forgetForm, setForgetForm] = useState({
		email:''
	})

	const [alert,setAlert] = useState(null)

	const {email} = forgetForm

	const onChangeForgetForm = event => setForgetForm({...forgetForm, [event.target.name]: event.target.value})


	const forget= async event =>{
		event.preventDefault()

		try{
			const forgetData = await ForgetPassword(forgetForm)
			if(forgetData.success){
				navigate('/login')
			}else{
				setAlert({type: 'danger', message: forgetData.message})
				setTimeout(()=>setAlert(null),5000)
			}
		}catch(error){
			console.log(error);
		}		
	}

	return (
		<>
		<Form className="my-4" onSubmit={forget}>
		<AlertMessage info={alert} />
			<Form.Group>
				<Form.Control type='text' placeholder="Email" name='email' value={email} onChange={onChangeForgetForm} required />
			</Form.Group>
			<Button variant='success' type='submit'>Submit</Button>
		</Form>
		<p>
			Don't have an account?
			<Link to='/register' style={{marginLeft:'1em'}}>
				<Button variant='info' size='sm' className='m1-2'>Register </Button>
			</Link>
			
		</p>
		</>
	)
}

export default ForgetPasswordForm
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import {useContext, useState} from 'react'
import {AuthContext} from '../../contexts/AuthContext'

const ChangePassModal=()=>{
	//Contexts
	const {showChangePassModel, setShowChangePassModal,changePassUser,setShowToast}=useContext(AuthContext)

	//State
	const [newPass,setNewPass]=useState({
		password: '',
		passwordNew: '',
		confirmPasswordNew:''
	})

	const {password, passwordNew, confirmPasswordNew }=newPass

	const onChangeNewPassForm = event => setNewPass({...newPass,[event.target.name]: event.target.value})

	const closeDialog=()=>{
		resetAddPostData()
	}

	const onSubmit = async event=>{
		event.preventDefault()

		if(passwordNew !== confirmPasswordNew){
			setShowToast({show:true,message:'Passwords do not match',type:'danger'})
			resetAddPostData()
			return
		}

		const {success, message}=await changePassUser(newPass)
		resetAddPostData()
		setShowToast({show:true,message,type:success?'success':'danger'})
	}

	const resetAddPostData = ()=>{
		setNewPass({
			password:'',
			passwordNew:'',
			confirmPasswordNew:''
		})
		setShowChangePassModal(false)
	}


	return(
		<Modal show={showChangePassModel} onHide={closeDialog}>
			<Modal.Header closeButton>
				<Modal.Title>what do you want change password?</Modal.Title>
			</Modal.Header>
			<Form onSubmit={onSubmit}>
				<Modal.Body>
					<Form.Group>
						<Form.Control 
							type='password' 
							placeholder='password old' 
							name='password' 
							required aria-describedby='title-help'
							value={password}
							onChange={onChangeNewPassForm}
						/>
						<Form.Text id='title-help' muted>Required</Form.Text>
					</Form.Group>
					<Form.Group>
						<Form.Control 
							type='password' 
							placeholder='password new' 
							name='passwordNew' 
							value={passwordNew}
							onChange={onChangeNewPassForm}
						/>
					</Form.Group>
					<Form.Group>
						<Form.Control 
							type='password' 
							placeholder='confirm password new' 
							name='confirmPasswordNew' 
							value={confirmPasswordNew}
							onChange={onChangeNewPassForm}
						/>
					</Form.Group>
				</Modal.Body>
				<Modal.Footer>
					<Button variant='secondary' onClick={closeDialog}>Cancel</Button>
					<Button variant='primary' type='submit'>Change!</Button> 
				</Modal.Footer>
			</Form>
		</Modal>
	)
}

export default ChangePassModal
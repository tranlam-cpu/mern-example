import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import {useContext} from 'react'
import {PostContext} from '../../contexts/PostContext'

const DeletePostModal=()=>{
	//Contexts
	const {postState:{post},showDeletePostModal, setShowDeletePostModal, deletePost}=useContext(PostContext)

	const closeDialog=()=>{
		setShowDeletePostModal(false)
	}

	const DelPostModal=()=>{
		closeDialog()
		deletePost(post._id)
	}

	return(
		<Modal style={{marginTop:'10em'}} show={showDeletePostModal} onHide={closeDialog}>
			<Modal.Header closeButton>
				<Modal.Title>You want delete {post.title}?</Modal.Title>
			</Modal.Header>
			
			<Modal.Footer>
				<Button variant='secondary' onClick={closeDialog}>Cancel</Button>
				<Button variant='primary' type='submit' onClick={DelPostModal.bind(this)}>Delete!</Button> 
			</Modal.Footer>
			
		</Modal>
	)
}

export default DeletePostModal
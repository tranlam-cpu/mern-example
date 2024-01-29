import Button from 'react-bootstrap/Button'
import playIcon from '../../assets/play-btn.svg'
import editIcon from '../../assets/pencil.svg'
import notifiIcon1 from '../../assets/notification1.png'
import notifiIcon2 from '../../assets/notification2.png'
import deleteIcon from '../../assets/trash.svg'
import {useContext,useState,useEffect} from 'react'
import {PostContext} from '../../contexts/PostContext'

const ActionButtons = ({url,_id})=>{

	const {findPost, setShowUpdatePostModal,setShowDeletePostModal}=useContext(PostContext)

	const choosePost=postId =>{
		findPost(postId)
		setShowUpdatePostModal(true)
	}

	const chooseDeletePost=postId=>{
		findPost(postId)
		setShowDeletePostModal(true)
	}

	const [statusClick,setStatusClick]=useState(false)
	const [postId,setpostId]=useState({id:''})

	const actionNotifi=()=>{
		if(postId.id){
			
		}else{

		}
	}

	useEffect(() => {actionNotifi()},[postId])

	const notification=(id)=>{
		if(statusClick){
			setStatusClick(false)
			setpostId({id:''})
		}else{
			setStatusClick(true)
			setpostId({id:id})
		}
		
	}

	let body;
	if(statusClick){
		body=(
			<Button className='post-button' onClick={notification.bind(this,_id)}>
				<img src={notifiIcon2} alt='notification' width='24' height='24' />
			</Button>
		)
	}else{
		body=(
			<Button className='post-button' onClick={notification.bind(this,_id)}>
				<img src={notifiIcon1} alt='notification' width='24' height='24' />
			</Button>
		)
	}
	

	const openInNewTab = url => {
	    //  setting target to _blank with window.open
	    window.open(url, '_blank', 'noopener,noreferrer');
	  };

	return (
		<>
		<Button className='post-button' onClick={() => openInNewTab(url)} >
			<img src={playIcon} alt='play' width='32' height='32' />
		</Button>
		<Button className='post-button' onClick={choosePost.bind(this, _id)}>
			<img src={editIcon} alt='edit' width='24' height='24' />
		</Button>
		<Button className='post-button' onClick={chooseDeletePost.bind(this,_id)}>
			<img src={deleteIcon} alt='delete' width='24' height='24' />
		</Button>
		{/*{body}*/}
		</>
	)
}

export default ActionButtons
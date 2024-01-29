import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import React from 'react'
import { Inject, ScheduleComponent,Day,Week,WorkWeek,CellClickEventArgs,DragAndDrop,Resize,ActionEventArgs  } from '@syncfusion/ej2-react-schedule'
import { TreeViewComponent, DragAndDropEventArgs} from '@syncfusion/ej2-react-navigations';
import {useContext,useEffect,useState} from 'react'
import {PostContext} from '../contexts/PostContext'
import {ScheduleContext} from '../contexts/ScheduleContext'
import { L10n } from '@syncfusion/ej2-base';
import Toast from 'react-bootstrap/Toast'
import $ from 'jquery';

const Schedule=()=>{
	//context
	const {postState:{posts},getPosts,setShowToast,showToast: {show,message,type}}=useContext(PostContext)
	const {scheduleState:{schedules},getSchedules,addSchedule,deleteSchedule,updateSchedule}=useContext(ScheduleContext)



	L10n.load({
	    'en-US': {
	        'schedule': {
	            'saveButton': 'Add',
	            'cancelButton': 'Close',
	            'deleteButton': 'Remove',
	            'newEvent': 'Add Event',
	        },
	    }
	});
	useEffect(() => {getPosts()},[])
	useEffect(() => {getSchedules()},[])
	
	const styles = {
	    margin: '1em',
	    width: '100%',
	  };

	let scheduleObj;

	






	// let data = posts
	// const datasource=[
	// 	{
	// 		Subject:'Alaska: The Last Frontie',
	// 		StartTime:'2022-12-19T04:00:00',
	// 		EndTime:'2022-12-19T05:00:00'
	// 	}
	// ]

	

	

   function onEventRendered(args) {

   		if(args.data.Description==='To Learn'){
   			$(args.element).css('background','#DC143C')
   		}else if(args.data.Description==='Learning'){
   			$(args.element).css('background','#E5BA73')
   		}else if(args.data.Description==='Learned'){
   			$(args.element).css('background','#C0DEFF')
   			$(args.element).css('color','#4B56D2')
   		}else{
   			$(args.element).css('background','#FFE5F1')
   			$(args.element).css('color','#FF597B')
   		}
   		

    }
    let field = { dataSource: posts, text: "title",id: "status" };
 	

 	const onTreeDragStop=(event:DragAndDropEventArgs)=>{
 		let cellData:CellClickEventArgs = scheduleObj.getCellDetails(event.target)
 		let eventData ={
 			Subject:event.draggedNodeData.text,
 			StartTime: cellData.startTime,
 			EndTime: cellData.endTime,
 			Description:event.draggedNodeData.id
 		}
 		
 

   		
 		scheduleObj.openEditor(eventData,"Add",true);
 		
 	}

 	const [check,setCheck]=useState(false)

    const onActionBegin= async(args:ActionEventArgs)=>{
    	
    	if(args.requestType==='eventCreate'){
    		
    		if(args.data[0].Subject==="Add title"){
    			args.cancel=true
    		}
    		if(!args.data[0].Id){
    			const d = new Date();
				let time = d.getTime();
    			args.data[0].Id=Math.floor(Math.random() * 100)+time;
    		}
    		const {success, message}=await addSchedule({
    			id:args.data[0].Id,
    			StartTime:args.data[0].StartTime,
    			Subject: args.data[0].Subject,
    			Description:args.data[0].Description,
    			EndTime:args.data[0].EndTime
    		})
			setShowToast({show:true,message,type:success?'success':'danger'})
    		// window.location.reload(false);
    		setCheck(true)
    		
    	}else if(args.requestType==='eventRemove'){
    		await deleteSchedule(args.data[0].Id)
    		setCheck(false)
    	}else if(args.requestType==='eventChange'){
    		if(check){
    			window.location.reload(false);
    		}
    		if(args.data.Subject==="Add title"){
    			args.cancel=true
    		}
    		
    		const {success,message}=await updateSchedule({
    			id:args.data.Id,
    			StartTime:args.data.StartTime,
    			EndTime:args.data.EndTime
    		})

    		setShowToast({show:true,message,type:success?'success':'danger'})
    		setCheck(false)
    	}
    	
    } 
 	


    const eventTemplate=(props:{[key: string]: Object}):JSX.Element=>{
    
    	return (
    		<>
    		<p style={{padding:'0px',margin:'0px', textAlign:'center'}}>{props.Subject}</p>
    		<p className='text-center'>{new Intl.DateTimeFormat('en-US', { hour: '2-digit', minute: '2-digit'}).format(new Date(props.StartTime))} - {new Intl.DateTimeFormat('en-US', { hour: '2-digit', minute: '2-digit'}).format(new Date(props.EndTime))}</p>
    		</>
    	)
    }

    

	return(
		<>
		<Row className='mt-5' style={styles}>
			<Col sm={9}>
				<ScheduleComponent 
					ref={schedule=>scheduleObj = schedule} 
					eventSettings={{dataSource:schedules,template:eventTemplate.bind(this)}}
					eventRendered={onEventRendered.bind(this)}
					actionBegin={onActionBegin.bind(this)}
				> 
					<Inject 
					
					services={
						[Day,
						Week,
						WorkWeek,
						DragAndDrop,
						Resize]
					} />
				</ScheduleComponent>
			</Col>
			<Col sm={3}>
				<div className='tree-title-container'>Title List</div>
				<TreeViewComponent 
					fields={field}
				
					allowDragAndDrop={true}
					nodeDragStop={onTreeDragStop.bind(this)}
				/>
			</Col>
		</Row>
		<Toast 
			show={show}
			style={{position:'fixed',top:'20%',right:'10px'}} 
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

export default Schedule
const express= require('express')
const router = express.Router()
const verifyToken= require('../middleware/auth')

const Schedule = require('../models/Schedule')
const Post = require('../models/Post')

//@route /api/schedules
//@desc create schedules

router.post('/',verifyToken,async(req,res)=>{
	const{id, StartTime, EndTime,Subject,Description}=req.body

	if(Subject=="Add title"){
		return res.status(500).json({success:false,message:'title is required'})
	}

	if(!id || !StartTime || !EndTime || !Subject){
		return res.status(500).json({success:false,message:'request no data'})
	}

	try{
		// existing id
		const scheduleId =await Schedule.findOne({id})

		if(scheduleId){
			return res.status(400).json({success: false, message: 'exists schedule'})
		}

		//all good
		const newSchedule=new Schedule({
			id,
			StartTime,
			EndTime,
			Description:Description?Description:'',
			Subject,
			user:req.userId
		})

		await newSchedule.save();

		//get all
		// const ob = await Schedule.find({user: req.userId}).populate('post',['title','description','url','status']).exec((err,ob)=>{
		// 	if (err) return handleError(err);

		// 	const schedules=[];
		// 	ob.forEach(value=>{
		// 		schedules.push({Id:value.id,StartTime:value.StartTime,EndTime:value.EndTime,Subject:value.post.title})
		// 	})
		// 	return res.json({success:true, message: 'successful scheduling',schedules})
		// })
		const ob=await Schedule.find({user: req.userId}).exec((err,ob)=>{
			if (err) return handleError(err);
			
			const schedules=[];
			ob.forEach(value=>{
				schedules.push({Id:value.id,StartTime:value.StartTime,EndTime:value.EndTime,Subject:value.Subject,Description:value.Description})		
				
			})
			return res.json({success:true, message: 'successful scheduling',schedules})
		})

		
	}catch(error){
		return res.status(500).json({success:false,message:error})
	}
})


//@desc delete schedule

router.delete('/:id',verifyToken,async(req,res)=>{
	const scheduleDeleteCondition ={id:req.params.id, user:req.userId,};
	const scheduleDelete=await Schedule.findOneAndDelete(scheduleDeleteCondition)

	if(!scheduleDelete){
			return res.status(401).json({success: false,message:'schedule not found or user not authorised'})
		}

	return res.json({success:true, message:'delete great', schedule: scheduleDelete})
})

//@desc put schedule

router.put('/:id',verifyToken,async(req,res)=>{
	const{StartTime, EndTime}=req.body

	try{
		let updatedSchedule={
			StartTime,
			EndTime
		}

		const scheduleUpdateCondition = {id: req.params.id,user: req.userId}

		updatedSchedule= await Schedule.findOneAndUpdate(scheduleUpdateCondition,updatedSchedule,{new: true})

		if(!updatedSchedule){
			return res.status(401).json({success: false,message:'schedule not found or user not authorised'})
		}

		return res.json({success:true, message:'update succeed', schedule: updatedSchedule})
	}catch(error){
		console.log(error)
		return res.status(500).json({success:false, message: error})
	}
})

//@desc get schedule

router.get('/',verifyToken,async(req,res)=>{
	try{
		// const ob = await Schedule.find({user: req.userId}).populate('post',['title','description','url','status']).exec((err,ob)=>{
		// 	if (err) return handleError(err);

		// 	const schedules=[];
		// 	ob.forEach(value=>{
		// 		schedules.push({Id:value.id,StartTime:value.StartTime,EndTime:value.EndTime,Subject:value.post.title?value.post.title:value.Subject})
		// 	})
		// 	return res.json({success: true, schedules})
		// })
		
		const ob=await Schedule.find({user: req.userId}).exec((err,ob)=>{
			if (err) return handleError(err);
			
			const schedules=[];
			ob.forEach(value=>{
				schedules.push({Id:value.id,StartTime:value.StartTime,EndTime:value.EndTime,Subject:value.Subject,Description:value.Description})		
				
			})
			return res.json({success: true, schedules})
		})
		
	}catch(error){
		console.log(error)
		return res.status(500).json({success:false, message: error})
	}
})

module.exports = router
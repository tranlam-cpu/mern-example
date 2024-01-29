const express= require('express')
const router = express.Router()
const verifyToken= require('../middleware/auth')

const Post = require('../models/Post')

//@route POST api/posts
//@desc Create post
router.post('/',verifyToken,async(req,res)=>{
	const{title, description, url, status}=req.body

	
	//simple validation
	if(!title){
		return res.status(400).json({success:false, message: 'title is required'})
	}

	if(title.trim()==""){
		return res.status(400).json({success:false, message: 'title is required'})
	}

	try{
		const newPost=new Post({
			title, 
			description, 
			url: (url.startsWith('https://')) ? url : `https://${url}`,
			status: status || 'To Learn',
			user: req.userId
		})

		await newPost.save();

		res.json({success:true, message: 'happy learning',post: newPost})

	}catch(error){
		console.log(error)
		return res.status(500).json({success:false, message: error})
	}
})


//@route get api/posts
//@desc GET post
router.get('/',verifyToken,async(req,res)=>{
	try{
		const posts = await Post.find({user: req.userId}).populate('user',['username'])
		res.json({success: true, posts})
	}catch(error){
		console.log(error)
		return res.status(500).json({success:false, message: error})
	}
})

//@route PUT api/posts
//@desc UPDATE post

router.put('/:id',verifyToken,async(req,res)=>{
	const{title, description, url, status}=req.body


	//simple validation
	if(!title){
		return res.status(400).json({success:false, message: 'title is required'})
	}

	if(title.trim()==""){
		return res.status(400).json({success:false, message: 'title is required'})
	}
	
	try{
		let updatedPost={
			title,
			description: description || '',
			url: ((url.startsWith('https://')) ? url : `https://${url}`) || '',
			status: status || ''
		}

		const postUpdateCondition = {_id: req.params.id,user: req.userId}

		updatedPost= await Post.findOneAndUpdate(postUpdateCondition,updatedPost,{new: true})

		if(!updatedPost){
			return res.status(401).json({success: false,message:'post not found or user not authorised'})
		}

		res.json({success:true, message:'update succeed', post: updatedPost})
	}catch(error){
		console.log(error)
		return res.status(500).json({success:false, message: "error"})
	}
})

//@route Delete api/posts
//@desc DELETE post
router.delete('/:id',verifyToken,async(req,res)=>{
	try{
		const postDeleteCondition ={_id:req.params.id, user:req.userId};
		const deletePost= await Post.findOneAndDelete(postDeleteCondition)

		if(!deletePost){
			return res.status(401).json({success: false,message:'post not found or user not authorised'})
		}

		res.json({success:true, message:'delete great', post: deletePost})
	}catch(error){
		console.log(error)
		return res.status(500).json({success:false, message: "error"})
	}
})

module.exports = router
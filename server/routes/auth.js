const express = require('express');
const router = express.Router()
const argon2 = require('argon2')
const jwt=require('jsonwebtoken')
const verifyToken= require('../middleware/auth')
const nodemailer =  require('nodemailer');
const User = require('../models/User')

/*router.get('/',(req,res)=> res.send('User Route'))*/
// Get api/auth
// check if user is login

router.get('/',verifyToken, async(req,res)=>{
	try{
		const user = await User.findById(req.userId).select('-password')
		if (!user) return res.status(400).json({success: false, message: 'User not found'})

		res.json({success: true, user})
	}catch(error){
		console.log(error);
		res.status(500).json({success:false, message: error})
	}
})


// route api/auth/sendmail

router.post('/sendmail',async(req,res)=>{
	const {email}=req.body

	// simple validation 
	if(!email ){
		return res
		.status(400)
		.json({success: false, message: 'Missing email'})
	}

	try{
		// existing user
		const user =await User.findOne({email})
		if(!user){
			return res.status(400).json({success: false, message: 'mail not found'})
		}

		// all good
		let updatedPass=await argon2.hash('123')
		updatedPass= await User.findOneAndUpdate({_id: user._id},{password:updatedPass},{new: true})

		if(!updatedPass){
			return res.status(401).json({success: false,message:'change pass fail'})
		}

		var transporter =  nodemailer.createTransport({ // config mail server
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'lamlife113520@gmail.com', //Tài khoản gmail vừa tạo
            pass: 'hbhdqeleihrqulnu' //Mật khẩu tài khoản gmail vừa tạo
        },
        tls: {
            // do not fail on invalid certs
            rejectUnauthorized: false
        }
	    });
	    var content = '';
	    content += `
	        <div style="padding: 10px; background-color: #003375">
	            <div style="padding: 10px; background-color: white;">
	                <h4 style="color: #0085ff">Mật khẩu mới của bạn là:</h4>
	                <span style="color: black">123</span>
	            </div>
	        </div>
	    `;
	    var mainOptions = { // thiết lập đối tượng, nội dung gửi mail
	        from: 'Admin Lam',
	        to: email,
	        subject: 'Forget Password',
	        text: '',//Thường thi mình không dùng cái này thay vào đó mình sử dụng html để dễ edit hơn
	        html: content //Nội dung html mình đã tạo trên kia :))
	    }
	    transporter.sendMail(mainOptions, function(err, info){
	        if (err) {
	            console.log(err);
	            req.flash('mess', 'Lỗi gửi mail: '+err); //Gửi thông báo đến người dùng
	            res.redirect('/');
	        } else {
	            console.log('Message sent: ' +  info.response);
	            req.flash('mess', 'Một email đã được gửi đến tài khoản của bạn'); //Gửi thông báo đến người dùng
	            res.redirect('/');
	        }
	    });

	    return res.json({success:true, message: 'Forget Password Successfully'})

	}catch(error){
		return res.status(500).json({success:false, message: error})
	}

})


// route api/auth/register

router.post('/register',async(req,res)=>{
	const {username, password, email}= req.body

	// simple validation 
	if(!username || !password){
		return res
		.status(400)
		.json({success: false, message: 'Missing username and password'})
	}

	// existing username
	try{
		const user =await User.findOne({username})
		if(user){
			return res.status(400).json({success: false, message: 'exist username'})
		}

		// all good
		const hashedPassword = await argon2.hash(password)
		const newUser = new User({username, password: hashedPassword, email})
		await newUser.save()

		//return token
		/*const accessToken = jwt.sign({userId: newUser._id}, process.env.ACCESS_TOKEN_SECRET)*/
		res.json({success:true, message: 'user created successfully'})
	}catch(error){
		console.log(error);
		res.status(500).json({success:false, message: 'error'})
	}
	
})


//route api/auth/changepass
router.post('/changepass',verifyToken,async(req,res)=>{
	const { password , passwordNew }= req.body
	
	if( !password || !passwordNew){
		return res
		.status(400)
		.json({success: false, message: 'Missing password'})
	}

	try{

		//check for exits user
		const user= await User.findOne({_id: req.userId})
		

		const hashedPassword = await argon2.verify(user.password,password)
		

		if(!hashedPassword){
			return res.status(400).json({success: false, message: 'incorrect password'})
		}



		//all good
		let updatedPass=await argon2.hash(passwordNew)
		updatedPass= await User.findOneAndUpdate({_id: req.userId},{password:updatedPass},{new: true})

		if(!updatedPass){
			return res.status(401).json({success: false,message:'change pass fail'})
		}

		res.json({success:true, message:'update succeed', user: updatedPass})

	}catch(error){
		return res.status(500).json({success:false, message: 'error'})
	}
})


// route api/auth/login
router.post('/login',async(req,res)=>{
	const {username,password}=req.body

	if(!username || !password){
		return res
		.status(400)
		.json({success: false, message: 'Missing username and password'})
	}

	try{
		//check for exits user
		const user= await User.findOne({username})
		if (!user){
			return res.status(400).json({success: false, message: 'Incorrect user name and password'})
		}

		//username found
		const passowrdValid= await argon2.verify(user.password,password)
		if(!passowrdValid){
			return res.status(400).json({success: false, message: 'Incorrect user name and password'})
		}

		// all good
		// return token
		const accessToken = jwt.sign({userId: user._id}, process.env.ACCESS_TOKEN_SECRET)
		res.json({success:true, message: 'logged in successfully', accessToken})

	}catch (error){
		console.log(error);
		res.status(500).json({success:false, message: 'error'})
	}
})
module.exports = router
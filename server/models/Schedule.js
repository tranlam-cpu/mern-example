const mongoose = require('mongoose');
const Schema= mongoose.Schema

const ScheduleSchema= new Schema({
	id: {
		type: Number,
		required: true
	},
	StartTime: {
		type: String,
		required: true
	},
	EndTime: {
		type:String,
		required: true
	},
	Subject: {
		type:String
	},
	Description: {
		type:String
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: 'users'
	}
})

module.exports = mongoose.model('schedules',ScheduleSchema)
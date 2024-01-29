import {createContext, useReducer, useState} from 'react'
import {scheduleReducer} from '../reducers/scheduleReducer'
import axios from 'axios'
import {apiUrl} from './constans'
export const ScheduleContext=createContext()

const ScheduleContextProvider=({children})=>{
	// State
	const [scheduleState,dispatch]= useReducer(scheduleReducer,{
		schedules:[],
	})

	//Get all schedule
	const getSchedules= async()=>{
		try{
			const response = await axios.get(`${apiUrl}/schedules`)
			if(response.data.success){
				dispatch({type: 'SCHEDULES_LOADED_SUCCESS',payload: response.data.schedules})
			}
		}catch(error){
			dispatch({type: 'SCHEDULES_LOADED_FAIL'})
		}
	}

	//Add schedule
	const addSchedule = async newSchedule=>{
		try{
			const response = await axios.post(`${apiUrl}/schedules`,newSchedule)
			if(response.data.success){
				dispatch({type: 'ADD_SCHEDULE',payload: response.data.schedules})
				return response.data
			}
		}catch(error){
			return error.response.data ? error.response.data :{success: false,message: 'Server error'}
		}
	}

	//Delete schedule
	const deleteSchedule= async scheduleId=>{
		try{
			const response = await axios.delete(`${apiUrl}/schedules/${scheduleId}`)
			if(response.data.success){
				dispatch({type:'DELETE_SCHEDULE',payload:scheduleId})
			}
		}catch(error){
			console.log(error)
		}
	}


	//Update schedule
	const updateSchedule = async updatedSchedule=>{
		try{
			const response=await axios.put(`${apiUrl}/schedules/${updatedSchedule.id}`,updatedSchedule)
			if(response.data.success){
				dispatch({type:'UPDATE_SCHEDULE',payload:response.data.schedule })
				return response.data
			}
		}catch(error){
			return error.response.data ? error.response.data :{success: false,message: 'Server error'}
		}
	}

	// Post context data
	const scheduleContextData={scheduleState,getSchedules,addSchedule,deleteSchedule,updateSchedule}

	return (
		<ScheduleContext.Provider value={scheduleContextData}>
			{children}
		</ScheduleContext.Provider>
	)

}

export default ScheduleContextProvider

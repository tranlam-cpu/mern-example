
export const scheduleReducer=(state,action)=>{
	const {type,payload}=action
	switch(type){
		case 'SCHEDULES_LOADED_SUCCESS':
			return{
				...state,
				schedules:payload
			}
		case 'SCHEDULES_LOADED_FAIL':
			return{
				...state,
				schedules:[]
			}
		case 'ADD_SCHEDULE':
			return{
				...state,
				schedules:[...state.schedules,payload]
			}
		case 'DELETE_SCHEDULE':
		return{
			...state,
			schedules:state.schedules.filter(schedule=>schedule.Id !== payload )
		}
		case 'UPDATE_SCHEDULE':
			const newSchedules = state.schedules.map(schedule => 
				schedule.Id === payload.Id ? payload : schedule
			)
		return{
			...state,
			schedules: newSchedules
		}
		default:
			return state
	}
}
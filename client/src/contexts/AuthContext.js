import {createContext, useReducer, useEffect,useState} from 'react'
import {authReducer} from '../reducers/authReducer'
import {apiUrl, LOCAL_STORAGE_TOKEN_NAME} from './constans'
import axios from 'axios'
import setAuthToken from '../utils/setAuthToken'

export const AuthContext= createContext()

const AuthContextProvider =({children})=>{
	const [authState, dispatch] = useReducer(authReducer,{
		authLoading: true,
		isAuthenticated: false,
		user: null
	})

	// Authenticate user
	const loadUser = async ()=>{
		if(localStorage[LOCAL_STORAGE_TOKEN_NAME]){
			setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME])
		}

		try{
			const response = await axios.get(`${apiUrl}/auth`)
			if(response.data.success){
				dispatch({type: 'SET_AUTH',payload: {isAuthenticated: true,user: response.data.user}})
			}
		}catch(error){
			localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME)
			setAuthToken(null)
			dispatch({type: 'SET_AUTH',payload: {isAuthenticated: false,user: null}})
		}
	}

	useEffect(() => { loadUser() },[])

	const [showChangePassModel,setShowChangePassModal] =useState(false)

	const [showToast,setShowToast]=useState({
		show:false,
		message:'',
		type:null
	})


	// Login
	const loginUser = async userForm =>{
		try{
			const response = await axios.post(`${apiUrl}/auth/login`,userForm)
			if (response.data.success){
				localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, response.data.accessToken)	
			}

			await loadUser()

			return response.data
		}catch (error){
			if (error.response.data) return error.response.data
			else return {success: false, message: error.message}
		}
	}

	// register

	const registerUser = async userForm =>{
		try{
			const response = await axios.post(`${apiUrl}/auth/register`,userForm)
			if (response.data.success){
				localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, response.data.accessToken)	
			}

			await loadUser()

			return response.data
		}catch (error){
			if (error.response.data) return error.response.data
			else return {success: false, message: error.message}
		}
	}

	//change pass

	const changePassUser= async userForm=>{
		try{
			const response = await axios.post(`${apiUrl}/auth/changepass`,userForm)
			if (response.data.success){
				console.log('change pass ok')
			}

			await loadUser()
			return response.data
		}catch (error){
			if (error.response.data) return error.response.data
			else return {success: false, message: error.message}
		}
	}

	//logout

	const logoutUser=async()=>{
		localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME)
		dispatch({type: 'SET_AUTH',payload: {isAuthenticated: false,user: null}})
	}

	//Forget password

	const ForgetPassword=async email=>{
		try{
			const response = await axios.post(`${apiUrl}/auth/sendmail`,email)
			if (response.data.success){
				console.log('forget pass ok')
			}

			await loadUser()
			return response.data
		}catch (error){
			if (error.response.data) return error.response.data
			else return {success: false, message: error.message}
		}
	}

	// Context data
	const authContextData = {loginUser,showToast,setShowToast, registerUser,changePassUser, authState,logoutUser,showChangePassModel,setShowChangePassModal,ForgetPassword}

	//return provider
	return (
		<AuthContext.Provider value={authContextData}>
			{children}
		</AuthContext.Provider>
	)
}

export default AuthContextProvider
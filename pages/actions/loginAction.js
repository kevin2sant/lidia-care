import {
    AUTH_LOGIN,
    AUTH_SUCCESS,
    AUTH_ERROR,
    AUTH_CLOSE
} from '../types'

// axios
import clientAxios from '../config/axios'

// validar login
export function validateAuth(userData){
    return async (dispatch) => {
        dispatch(authLogin())

        try{
            // insert in BDD 
            await clientAxios.post('/care/user/userLogin', userData)
            dispatch(authLoginSuccess(userData))
        }catch (error){
            dispatch(authLoginError(true))
        }
    }
}

export function authClose(){
    return async (dispatch) => {
        dispatch(authCloseLogin())
    }
}

const authLogin = () => ({
    type : AUTH_LOGIN
})

const authLoginSuccess = userData => ({
    type : AUTH_SUCCESS,
    payload : userData
})

const authLoginError = status => ({
    type : AUTH_ERROR,
    payload : status
})

const authCloseLogin = () => ({
    type : AUTH_CLOSE
})

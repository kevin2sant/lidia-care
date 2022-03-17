// cada reducer tiene su propio state
import {
    AUTH_LOGIN,
    AUTH_SUCCESS,
    AUTH_ERROR,
    AUTH_CLOSE
} from '../types'

const initialState = {
    login : [],
    error : null,
    auth : false,
    loading : false
}


export default function(state = initialState, action){
    switch(action.type){
        case AUTH_LOGIN :
            return {
                ...state,
                loading : true
            }
        
        case AUTH_SUCCESS :
            return {
                ...state,
                login : [
                    ...state.login, 
                    action.payload
                ],
                auth : true,
                loading : false
            }

        case AUTH_ERROR : 
            console.log(action)
            return {
                ...state,
                loading : false,
                error : action.payload
            }
        
        case AUTH_CLOSE:
            return ({
                login : [],
                error : null,
                auth : false,
                loading : false
            })
        default : 
            return state
    }
}
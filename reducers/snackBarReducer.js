// cada reducer tiene su propio state
import {
    OPEN_ALERT,
    CLOSE_ALERT
} from '../types'

const initialState = {
    alert : false,
    type : '',
    message : ''
}


export default function(state = initialState, action){
    switch(action.type){
        case OPEN_ALERT :
            return {
                ...state,
                alert   : true,
                type    : action.payload.type,
                message : action.payload.message
            }
        
        case CLOSE_ALERT :
            return {
                alert   : false,
                type    : 'success',
                message : ''
            }
        default : 
            return state
    }
}
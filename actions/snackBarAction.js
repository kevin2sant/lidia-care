import {
    OPEN_ALERT,
    CLOSE_ALERT
} from '../types'

import React from 'react' 
// axios

export function openAlert(alertData){
    return async (dispatch) => {
        dispatch(open(alertData))
    }
}

export function closeAlert(){
    return async (dispatch) => {
        dispatch(close())
    }
}

const  open = alertData => ({
    type : OPEN_ALERT,
    payload : {
        type : alertData.type,
        message : alertData.message
    }
})

const close = () => ({
    type : CLOSE_ALERT,
    payload : false
})

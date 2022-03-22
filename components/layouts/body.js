import React,{ useEffect } from 'react'
import Sidebar from './sidebar'
import Footer from './footer'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import Login from '../../pages/login'

const Body = props => {
    const router = useRouter();

    const auth = useSelector( state => state.login.auth)
   

    if(auth){
        return (
            <>
                <Sidebar/>
                {props.children}
                <Footer/>
            </>
        )
    }else{
        return(
            <Login/>
        )
    }
    
    
}

export default Body;
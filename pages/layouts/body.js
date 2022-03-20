import React from 'react'
import Sidebar from './sidebar'
import Footer from './footer'
import { useSelector } from 'react-redux'
import Home from '../'
import { useRouter } from 'next/router'

const Body = () => {


    const router = useRouter();
  
    const auth = useSelector( state => state.login.auth)

    if(auth){
        return (
            <>
                <Sidebar/>
                <Footer/>
            </>
        )
    }else{
        router.replace('/')
        return null
    }
}

export default Body;
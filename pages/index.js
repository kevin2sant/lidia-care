import { useState } from 'react'
import { useRouter } from 'next/router'
import Login from './login'
import { useSelector } from 'react-redux'
import Body from '../components/layouts/body'
import RegisterUser from './user/register'

export default function Home() {
  const router = useRouter();
  
  const auth = useSelector( state => state.login.auth)
  
  return(
      <>
          {auth ? 
            <Body> <RegisterUser/> </Body> 
          : 
            <Login/>
          }
      </>
    )
}
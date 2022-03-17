import { useState } from 'react'
import { useRouter } from 'next/router'
import Login from './login'
import { useSelector } from 'react-redux'
import Header from './layouts/header'
export default function Home() {
  const router = useRouter();
  
  const auth = useSelector( state => state.login.auth)

  return(
      <>
        
          {auth ? <Header /> : <Login/>}
        
      </>
    )
}
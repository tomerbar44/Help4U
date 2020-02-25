import React from 'react'
import { isAuthenticated } from '../Authentication/googleAuth'
import SignInSide from '../Components/login'

const Home = (props) => {
  const { message, newUser } = props
  return (
    <div>
      {isAuthenticated() && <SignInSide message = {'please reconnect again'} newUser={newUser}/>}
      {!isAuthenticated() && <SignInSide message = {message} newUser={newUser}/>}
    </div>
  )
}

export default Home

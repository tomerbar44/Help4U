import React from 'react'
import { Route, Router } from 'react-router-dom'
import ResponsiveDrawer from '../Components/responsiveDrawer'
import Home from '../Authentication/home'
import { isAuthenticated } from '../Authentication/googleAuth'
import history from '../Authentication/history'

const ReactRouter = () => {
  return (
    <Router history={history} component={Home}>
      <Route exact path="/" component={() => <Home message={'Please login'}/>} />
      <Route path ="/home" component={() => isAuthenticated() ? <ResponsiveDrawer/> : <Home message={'Not authenticated, Please login again'} newUser={false}/> } />
      <Route path ="/error" component={() => <Home message={'Error occur, please try again'} newUser={false}/> } />
      <Route path ="/signup" component={() => <Home message={'Please signup first'} newUser={true}/> } />
    </Router>
  )
}

export default ReactRouter

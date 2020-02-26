import React from 'react'
import { GoogleLogin, GoogleLogout } from 'react-google-login'
import Typography from '@material-ui/core/Typography'
import history from './history'

const successGoogle = (response) => {
  console.log('response\n\n', response)
  https://final-projet-here4u.herokuapp.com/
  // check if user is admin or customer
  async function checkIfUserExist () {
    try {
      const user = await fetch('https://final-projet-here4u.herokuapp.com/Help4U/user/check', {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/json; charset=utf-8'
        }),
        mode: 'cors',
        body: JSON.stringify({ google_id: response.googleId })

      }).then(user => user.json())

      console.log('user\n', user)

      if (user.status === 200 && user.data !== null) {
        // update admin access token - only for admin API requests
        if (user.data.admin == true) {
          const update = await fetch('https://final-projet-here4u.herokuapp.com/Help4U/user/update', {
            method: 'PUT',
            mode: 'cors',
            headers: new Headers({
              'Content-Type': 'application/json; charset=utf-8'
            }),
            body: JSON.stringify({
              google_id: response.googleId,
              access_token: response.uc.access_token
            })
          })
            .then(update => update.json())

          console.log('update\n', update)
        }
        setSession(response, user.data)
        history.replace('/home')
        return
      }

      // user not exist, signup with google account
      if (user.status === 200 && user.data === null) {
        history.replace('/signup')
        return
      }

      // return res
    } catch (e) {
      console.log('inside catch', e.message)
      history.replace('/error')

      return e.message
    }
  };

  checkIfUserExist()
}

const setSession = (response, userData) => {
  // session is available for 1h
  const expiresAt = JSON.stringify((response.tokenObj.expires_in * 1000) + new Date().getTime())
  console.log('response.tokenObj.expires_in\n', response.tokenObj.expires_in)

  console.log('response.tokenObj.access_token\n', response.uc.access_token)
  sessionStorage.setItem('expires_at', expiresAt)
  sessionStorage.setItem('isAdmin', userData.admin)
  sessionStorage.setItem('user_name', response.Rt.Ad)
  sessionStorage.setItem('user_id', response.googleId)
  sessionStorage.setItem('profile_img', response.Rt.kL)
  sessionStorage.setItem('company_name', userData.company)
  sessionStorage.setItem('access_token', response.uc.access_token)
}

const logout = () => {
  sessionStorage.removeItem('expires_at')
  sessionStorage.removeItem('isAdmin')
  sessionStorage.removeItem('user_name')
  sessionStorage.removeItem('user_id')
  sessionStorage.removeItem('profile_img')
  sessionStorage.removeItem('company_name')
  sessionStorage.removeItem('access_token')

  // navigate to the home route
  history.replace('/')
}

const isAuthenticated = () => {
  // Check whether the current time is past
  // access token's expiry time
  const expiresAt = JSON.parse(sessionStorage.getItem('expires_at'))
  return new Date().getTime() < expiresAt
}

const signupUser = (response) => {
  async function signup () {
    try {
      const user = await fetch('https://final-projet-
here4u.herokuapp.com/Help4U/user/create', {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/json; charset=utf-8'
        }),
        mode: 'cors',
        body: JSON.stringify({ google_id: response.googleId })

      }).then(user => user.json())
      console.log('newUser\n', user)
      setSession(response, { admin: false, company: '' })
      history.replace('/home')
    } catch (e) {
      console.log('inside catch', e.message)
      history.replace('/error')
    }
  }
  signup()
}

const failGoogle = (response) => {
  logout()
}

const GoogleAuth = (props) => {
  const { message } = props
  return (
    <>
      <Typography component="h5" variant="h6" style={{ marginBottom: '50px' }}>
        {message}
      </Typography>
      <GoogleLogin
        clientId="838325310419-ink7dovlmgeoff0urhtdk16boctkqra8.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={successGoogle}
        onFailure={failGoogle}
        cookiePolicy={'single_host_origin'}
        onRequest={onReq}
      />
    </>
  )
}

const onReq = () => {
  console.log('onReq')
}

const GoogleOut = (props) => {
  const { message } = props
  return (
    <>
      <Typography component="h5" variant="h6" style={{ marginBottom: '50px' }}>
        {message}
      </Typography>
      <GoogleLogout
        clientId="838325310419-ink7dovlmgeoff0urhtdk16boctkqra8.apps.googleusercontent.com"
        buttonText="Logout"
        onLogoutSuccess={logout}
        onFailure={failGoogle}
      >
      </GoogleLogout>
    </>
  )
}

const Here4uSignup = (props) => {
  const { message } = props
  console.log('inside here4uSignin')

  return (
    <>
      <Typography component="h5" variant="h6" style={{ marginBottom: '50px' }}>
        {message}
      </Typography>
      <GoogleLogin
        clientId="838325310419-ink7dovlmgeoff0urhtdk16boctkqra8.apps.googleusercontent.com"
        buttonText="Signin via Google"
        onSuccess={signupUser}
        onFailure={failGoogle}
        cookiePolicy={'single_host_origin'}
      />
    </>
  )
}

export {
  GoogleAuth,
  successGoogle,
  isAuthenticated,
  logout,
  GoogleOut,
  Here4uSignup
}

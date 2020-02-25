import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import ReactRouter from '../src/Routers/routers'
import GoogleLogin from 'react-google-login'
import GoogleAuth from './Authentication/googleAuth'

ReactDOM.render(<ReactRouter/>, document.getElementById('root'))

serviceWorker.unregister()

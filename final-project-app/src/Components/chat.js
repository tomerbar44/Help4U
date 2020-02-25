import React from 'react'
import Store from './store'
import Dashboard from './dashboard'

const Chat = (props) => {
  return (
    <div >
      <Store allTasks = {props.allTasks} setAllUsersTasks = {props.setAllUsersTasks}>
        <Dashboard/>
      </Store>
    </div>
  )
}

export default Chat

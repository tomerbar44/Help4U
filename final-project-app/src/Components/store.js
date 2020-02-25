import React, { useEffect } from 'react'
import Loader from './loader'
import io from 'socket.io-client'
export const CTX = React.createContext()

// will have socket number when server init connection

// useRef
let socket
// h
export default function Store (props) {
  const { allTasks, setAllUsersTasks } = props
  let oneTask = null
  // let disconnected = false
  const [chat, setChat] = React.useState(null)
  // const [toTask, setToTask] = React.useState(false)
  const [currTask, setCurrTask] = React.useState(null)

  function sendChatAction (value) {
    socket.emit('chat message', value.message, value.from, currTask.taskID, chat)
  }

  useEffect(() => {
    function getCurrTask () {
      // taking the index of the chat the user click on
      const currTaskId = window.location.pathname.split('/')[3]
      oneTask = allTasks.find(task => {
        if (currTaskId == task.taskID) { return task }
      })

      if (oneTask !== undefined) {
        // we send to server the current task of the chat, to update the chat when user disconnected
        // socket.emit('update task', oneTask)
        setCurrTask(oneTask)
        setChat(oneTask.chat)
      } else {
      }
    }

    socket = io('https://mern-finalproj-api.herokuapp.com/', {
      transports: ['websocket']
    })

    //
    getCurrTask()
    socket.on('chat message', function (message, from) {
      setChat((prevChats) => {
        const f = [
          ...prevChats, {
            from: from,
            message: message
          }]
        setAllUsersTasks(allTasks => allTasks.map(oneTask => {
          if (oneTask.taskID === parseInt(window.location.pathname.split('/')[3])) {
            console.log('equals')
            console.log('message = ', message)
            console.log('from = ', from)
            return ({ ...oneTask, chat: f })
          }
          console.log('NOT equals')
          return oneTask
        }))
        return f
      })
    })

    socket.on('DB not updated chat', function (message, from, errorMessage) {
      alert(`message: ${message}\n from- ${from} didn't update at DB. error: ${errorMessage}`)
    })

    return () => {
      socket.off('chat message')
    }
  }, [])

  if (currTask === null) {
    return <Loader />
  } else {
    return (
      <CTX.Provider value={{ chat, sendChatAction, currTask, allTasks, setAllUsersTasks }}>
        {props.children}
      </CTX.Provider>
    )
  }
}

import React, { useEffect } from 'react';
import Loader from './loader';
import io from 'socket.io-client';
export const CTX = React.createContext();

// will have socket number when server init connection
let socket;
export default function Store (props) {
  const { allTasks, setAllUsersTasks } = props;
  let oneTask = null;
  const [chat, setChat] = React.useState(null);
  const [currTask, setCurrTask] = React.useState(null);

  // when user click the send button from ChatWindow we emit to server the new message 
  function sendChatAction (value) {
    socket.emit('chat message', value.message, value.from, currTask.taskID, chat);
  }

  useEffect(() => {
    function getCurrTask () {
      // taking the index of the chat the user click on
      const currTaskId = window.location.pathname.split('/')[3];
      oneTask = allTasks.find(task => {
        if (currTaskId == task.taskID) { return task; }
      });

      if (oneTask !== undefined) {
        // we send to server the current task of the chat, to update the chat when user disconnected
        setCurrTask(oneTask);
        setChat(oneTask.chat);
      } else {
      }
    }

    socket = io('https://mern-finalproj-api.herokuapp.com/', {
      transports: ['websocket']
    });


    getCurrTask();
    // every message arrived, we update the Chat state and AllTasks state.
    // we do it to make sure when we go out from the chat window we will have the new chat messages.
    socket.on('chat message', function (message, from) {
      setChat((prevChats) => {
        const updatedChat = [
          ...prevChats, {
            from: from,
            message: message
          }];
        setAllUsersTasks(allTasks => allTasks.map(oneTask => {
          if (oneTask.taskID === parseInt(window.location.pathname.split('/')[3])) {
            return ({ ...oneTask, chat: updatedChat });
          }
          return oneTask;
        }));
        return updatedChat;
      });
    });

    // if server fail to update DB we alert the user
    socket.on('DB not updated chat', function (message, from, errorMessage) {
      alert(`message: ${message}\n from- ${from} didn't update at DB. error: ${errorMessage}`);
    });

    // stop listen to ('chat message') emits
    return () => {
      socket.off('chat message');
    };
  }, []);

  if (currTask === null) {
    return <Loader />;
  } else {
    return (
      <CTX.Provider value={{ chat, sendChatAction, currTask, allTasks, setAllUsersTasks }}>
        {props.children}
      </CTX.Provider>
    );
  }
}

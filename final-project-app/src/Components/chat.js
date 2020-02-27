import React from 'react';
import Store from './chatLogic';
import Dashboard from './chatWindow';

const Chat = (props) => {
  return (
    <div >
      <Store allTasks = {props.allTasks} setAllUsersTasks = {props.setAllUsersTasks}>
        <Dashboard/>
      </Store>
    </div>
  );
};

export default Chat;

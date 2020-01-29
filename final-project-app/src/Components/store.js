import React, { useEffect } from "react";
import io from "socket.io-client"
import { queryRes } from "./task";
import { Redirect } from 'react-router-dom'


export const CTX = React.createContext();
let socket;





function sendChatAction(value) {
    socket.emit('chat message', value.message, value.from);

}



// need to bring the name if the sender... 
let user = "Tomer Bar"
let currTask;


export default function Store(props) {

    const { tasks } = props;

    // const resultt = React.useContext(queryRes);

    const [chats, setChats] = React.useState([]);
    const [toTask, setToTask] = React.useState(false);
    // const [task, setTask] = React.useState();
    // const [redirect, setRedirect] = React.useState(false)




    useEffect(() => {

        async function getCurrTask() {

            // taking the index of the chat the user click on
            let currTaskId = window.location.pathname.split("/")[2];


            currTask = await tasks.find(task => {
                if (currTaskId == task.taskID)
                    return task;
            });

            // in cases we didn't pass tasks be4 rendering this component, we will redirect to mainWindow and then currTask will get value
            if (currTask !== undefined) {
                // we send to server the current task of the chat, to update the chat when user disconnected
                socket.emit("update task", currTask);

                console.log('currChat&&&&\n', currTask);
                setChats(currTask.chat);
            } else {
                setToTask(true)
                return;
            }

            /**
             * 
             * now we have the userID, now we need to bring the name with another request to DB
             * 
             */
        }

        getCurrTask();

    }, [])


    useEffect(() => {

        return () => {
            console.log('inside unMount!');
            
            socket.emit('disconnect');
        }
    })

    //every time chats state changed, we send to the server the updated state, when user disconnect the updated state of chat will be at the server
    useEffect(() => {
        // console.log('chat been changed\n');
        socket.emit('update chat', chats);

    }, [chats])


    if (!socket) {
        socket = io('https://mern-finalproj-api.herokuapp.com/',{
            transports: [ 'websocket' ]
        });
        socket.on('chat message', function (message, from) {
            setChats(prevChats => ([
                ...prevChats, {
                    from: from,
                    message: message
                }])
            )
        });
    }


    return (

        <CTX.Provider value={{ user, chats, sendChatAction }}>
            {/* {toTask ? <Redirect to="/"/> : null} */}
            {props.children}

            {/* {console.log('props.children',props.children)} */}
        </CTX.Provider>
    )
}
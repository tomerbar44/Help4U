import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { CTX } from "./store"
import { blue } from '@material-ui/core/colors';
// import urlGoogle  from '../server/google-util';
import Link from '@material-ui/core/Link';
// const urlGoogle = require('../server/google-util');


const useStyles = makeStyles(theme => ({
    root: {
        '& > *': {
            padding: theme.spacing(3, 2)
        },
    },

    flex: {
        display: 'flex',
        alignItems: 'center'
    },
    topicWindow: {
        width: '30%',
        height: '300px',
        borderRight: '1px solid grey'
    },
    chatWindow: {
        width: '70%',
        minHeight: '275px',
        padding: "20px"
    },
    chatBox: {
        width: '85%'
    },
    button: {
        width: '15%'
    },
    chip: {
        marginBottom: '14px',
        minWidth: '120px',

        
    }
}));



// every time we type, we change the state via ChangeTextValue, and because of that we reRender the component and will see all things be4 the return ? ? 
export default function Dashboard() {
 

    const classes = useStyles();
    


    // CTX store
    const { user, chats, sendChatAction } = React.useContext(CTX);
    // const topics = Object.keys(allChats);
    // console.log(allChats);

    // console.log(allChats);
    //local state
    //the current state    //call it, will change to current state 
    const [textValue, changeTextValue] = React.useState('');
    // const [activeTopic, chageActiveTopic] = React.useState(topics[0]);


    return (
        
            <Paper variant="outlined" className={classes.root} >

                <Typography variant="h4" component="h4">Chat app
                    {/* <Typography variant="h5" component="h5"> {activeTopic} </Typography> */}
                </Typography>



                {/*  */}
                <div className={classes.flex}>
                    {/* <div className={classes.topicWindow}>
                        <List>
                            {
                                topics.map(topic => (
                                    <ListItem onClick={() => { chageActiveTopic(topic) }} key={topic} button>
                                        <ListItemText primary={topic} />
                                    </ListItem>

                                ))
                            }
                        </List>
                    </div> */}
                    {/* <div className={classes.chatWindow}>
                        {
                            allChats[activeTopic].map((chat, i) => (
                                
                                <div className={classes.flex} key={i}>
                                    <Chip label={chat.from} style={chat.from === user ? { backgroundColor: 'blue' } : { backgroundColor: 'grey' }} />
                                    <Typography variant='body1' gutterBottom style={{ paddingLeft: "8px" }}> {chat.msg} </Typography>
                                </div>

                            ))
                        }
                    </div> */}


                    <div className={classes.chatWindow}>
                        {
                            chats.map((chat, i) => (
                                
                                
                                <div className={classes.flex} key={i}>
                                    {/* {console.log('one chat at deshboard\n',chat)} */}
                                    <Chip label={chat.from} style={chat.from === user ? { backgroundColor: '#5c6bc0' } : { backgroundColor: '#7e57c2' }} className={classes.chip} />
                                    <Typography variant='body1' gutterBottom style={{ paddingLeft: "8px" }}> {chat.message} </Typography>
                                </div>

                            ))
                        }
                    </div>

                </div>


                <div className={classes.flex}>
                    <TextField
                        label="send a chat"
                        className={classes.chatBox}
                        helperText="💻 🎆🎆¯\(°_o)/¯"
                        value={textValue}
                        onChange={e => {
                            changeTextValue(e.target.value);
                            // console.log('e.target.value ' + e.target.value); console.log('textValue ' + textValue)
                        }}
                    />
                    <Button variant="contained"
                        color="primary"
                        className={classes.button}
                        onClick={() => {
                            sendChatAction({ from: user, message: textValue},chats)
                            changeTextValue('');
                        }}

                    >
                        SEND
                    </Button>
                </div>
            </Paper>

        

    )
}
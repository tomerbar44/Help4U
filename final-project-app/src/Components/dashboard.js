// import React, { useEffect } from 'react'
// import { makeStyles } from '@material-ui/core/styles'
// import Paper from '@material-ui/core/Paper'
// import Typography from '@material-ui/core/Typography'
// import List from '@material-ui/core/List'
// import ListItem from '@material-ui/core/ListItem'
// import ListItemText from '@material-ui/core/ListItemText'
// import Chip from '@material-ui/core/Chip'
// import Grid from '@material-ui/core/Grid'
// import Button from '@material-ui/core/Button'
// import TextField from '@material-ui/core/TextField'
// import { CTX } from './store'
// import { blue } from '@material-ui/core/colors'
// import Link from '@material-ui/core/Link'
// import Divider from '@material-ui/core/Divider'
// import StatusSelect from './select'

// const useStyles = makeStyles(theme => ({
//   root: {
//     '& > *': {
//       padding: theme.spacing(3, 2)
//     },
//     minHeight: '800px'
//   },

//   flex: {
//     display: 'flex',
//     alignItems: 'center',
//     marginBottom: '15px'
//   },
//   topicWindow: {
//     width: '30%',
//     height: '300px',
//     borderRight: '1px solid grey'
//   },
//   chatWindow: {
//     width: '70%',
//     height: '300px',
//     padding: '20px'
//   },
//   chatBox: {
//     width: '100%'
//   },
//   button: {
//     width: '110%',
//     marginTop: '14px',
//     backgroundColor: '#4caf50'
//   },
//   padding: {
//     paddingLeft: '8px'
//   },
//   textBubble: {
//     minWidth: '100%',
//     minHeight: '7ex',
//     borderRadius: '15px'
//   },
//   divider: {
//     padding: '1px 16px'
//   }
// }))

// // every time we type, we change the state via ChangeTextValue
// export default function Dashboard () {
//   const classes = useStyles()
//   // CTX store
//   const { chat, sendChatAction, currTask, allTasks, setAllUsersTasks } = React.useContext(CTX)
//   const [textValue, changeTextValue] = React.useState('')
//   // const [taskStatus, setTaskStatus] = React.useState('Active')
//   let taskDate = '' + currTask.datesend
//   const userName = sessionStorage.getItem('user_name')
//   taskDate = taskDate.substring(0, 10)

//   // useEffect(() => {
//   // }, [taskStatus])

//   return (
//     <div >
//       {/* {task.status === 'Completed' ? setTaskStatus('Completed') : setTaskStatus('Active') } */}
//       <Paper variant="outlined" className={classes.root} >
//         <Grid container spacing={0} style={{ backgroundColor: '#F5F8FA' }}>
//           <Grid container direction="row" justify="center" alignItems="center" >
//             <Grid container spacing={2} >
//               <Grid item lg={4}>
//                 <Typography variant="h5" gutterBottom style={{ margin: '15px' }}> {currTask.title} </Typography>
//                 <Typography variant="body2" gutterBottom style={{ margin: '15px' }}> {`${currTask.selectedSubject}`} </Typography>
//               </Grid>
//               <Grid item lg={4}>
//                 <Typography variant='h6' align='center' gutterBottom style={{ margin: '15px', paddingTop: '15px' }}>
//                   {/* show the relevant name taking with */}
//                   {`Talking with:${JSON.parse(sessionStorage.getItem('isAdmin')) ? currTask.userName : currTask.companyID}`}
//                 </Typography>
//               </Grid>
//               {/* <Grid item lg={4}>
//               </Grid> */}
//             </Grid>

//             <Grid container justify="space-between" spacing={2} >
//               <Grid item lg={4}>
//                 <Typography variant='body1' gutterBottom style={{ margin: '15px' }}> Open at: {taskDate} </Typography>
//               </Grid>
//               <Grid item lg={4} >
//                 <Typography align='center'>
//                   {/* shows status selection only for admins and only for Active tasks */}
//                   { currTask.status === 'Active' && JSON.parse(sessionStorage.getItem('isAdmin')) && <StatusSelect taskID={currTask.taskID} parentTasks={allTasks} parnetSet={setAllUsersTasks}/>}
//                   {!JSON.parse(sessionStorage.getItem('isAdmin')) && ('Status: ' + currTask.status)}
//                 </Typography>
//               </Grid>
//             </Grid>
//           </Grid>
//         </Grid>

//         <Divider className={classes.divider} />

//         <div className={classes.flex}>
//           <div className={classes.chatWindow}>
//             {
//               chat.map((chat, i) => (
//                 <div className={classes.flex} key={i}>
//                   <Chip label={chat.from} style={{ marginRight: '10px' }} />
//                   <Paper className={classes.textBubble} variant="elevation" style={chat.from === userName ? { backgroundColor: '#5c6bc0' } : { backgroundColor: '#7e57c2' }}>
//                     <Typography variant='body1' gutterBottom style={{ margin: '15px', maxWidth: '100%' }}> {chat.message} </Typography>
//                   </Paper>
//                 </div>
//               ))
//             }
//           </div>
//         </div>

//         {/* show text input and send button only for Active status, Completed doesn't need. */}
//         {
//           currTask.status === 'Active' && <Grid container justify="space-between" spacing={0} >
//             <Grid item xs={9}>

//               <TextField
//                 label="reply.."
//                 className={classes.chatBox}
//                 value={textValue}
//                 onChange={e => {
//                   changeTextValue(e.target.value)
//                 }}
//               />
//             </Grid>
//             <Grid item >
//               <Button variant="contained" className={classes.button}
//                 onClick={() => {
//                   sendChatAction({ from: userName, message: textValue }, currTask.taskID, currTask.chat)
//                   changeTextValue('')
//                 }}
//               >
//                 SEND
//               </Button>
//             </Grid>
//           </Grid>
//         }
//       </Paper>

//     </div>

//   )
// }

import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Chip from '@material-ui/core/Chip'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import { CTX } from './store'
import { blue } from '@material-ui/core/colors'
import Link from '@material-ui/core/Link'
import Divider from '@material-ui/core/Divider'
import StatusSelect from './select'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      padding: theme.spacing(3, 2)
    },
    minHeight: '500px'
  },

  flex: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '15px',
  },
  topicWindow: {
    width: '30%',
    height: '300px',
    borderRight: '1px solid grey'
  },
  chatWindow: {
    width: '70%',
    maxHeight: '300px',
    padding: '20px'

  },

  chatBox: {
    width: '100%'
  },
  button: {
    width: '110%',
    marginTop: '14px',
    backgroundColor: '#4caf50'
  },
  padding: {
    paddingLeft: '8px'
  },
  textBubble: {
    minWidth: '100%',
    minHeight: '7ex',
    borderRadius: '15px'
  },
  divider: {
    padding: '1px 16px'
  }
}))

// every time we type, we change the state via ChangeTextValue
export default function Dashboard () {
  const classes = useStyles()
  // CTX store
  const { chat, sendChatAction, currTask, allTasks, setAllUsersTasks } = React.useContext(CTX)
  const [textValue, changeTextValue] = React.useState('')
  // const [taskStatus, setTaskStatus] = React.useState('Active')
  let taskDate = '' + currTask.datesend
  const userName = sessionStorage.getItem('user_name')
  taskDate = taskDate.substring(0, 10)

  // useEffect(() => {
  // }, [taskStatus])

  return (
    <div >
      {/* {task.status === 'Completed' ? setTaskStatus('Completed') : setTaskStatus('Active') } */}
      <Paper variant="outlined" className={classes.root} >
        <Grid container spacing={0} style={{ backgroundColor: '#F5F8FA' }}>
          <Grid container direction="row" justify="center" alignItems="center" >
            <Grid container spacing={2} >
              <Grid item lg={4}>
                <Typography variant="h5" gutterBottom style={{ margin: '15px' }}> {currTask.title} </Typography>
                <Typography variant="body2" gutterBottom style={{ margin: '15px' }}> {`${currTask.selectedSubject}`} </Typography>
              </Grid>
              <Grid item lg={4}>
                <Typography variant='h6' align='center' gutterBottom style={{ margin: '15px', paddingTop: '15px' }}>
                  {/* show the relevant name taking with */}
                  {`Talking with:${JSON.parse(sessionStorage.getItem('isAdmin')) ? currTask.userName : currTask.companyID}`}
                </Typography>
              </Grid>
              {/* <Grid item lg={4}>
              </Grid> */}
            </Grid>

            <Grid container justify="space-between" spacing={2} >
              <Grid item lg={4}>
                <Typography variant='body1' gutterBottom style={{ margin: '15px' }}> Open at: {taskDate} </Typography>
              </Grid>
              <Grid item lg={4} >
                <Typography align='center'>
                  {/* shows status selection only for admins and only for Active tasks */}
                  { currTask.status === 'Active' && JSON.parse(sessionStorage.getItem('isAdmin')) && <StatusSelect taskID={currTask.taskID} parentTasks={allTasks} parnetSet={setAllUsersTasks}/>}
                  {!JSON.parse(sessionStorage.getItem('isAdmin')) && ('Status: ' + currTask.status)}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Divider className={classes.divider} />

        <div className={classes.flex} style={{overflow: 'auto'}}>
          <div className={classes.chatWindow}>
            {
              chat.map((chat, i) => (

                <div className = {classes.flex} key = {i}>
                  <Chip label = {chat.from} style = {{ marginRight: '10px' }} />
                  <Paper className = {classes.textBubble} variant = "elevation" style = {chat.from === userName ? { backgroundColor: '#5c6bc0' } : { backgroundColor: '#7e57c2' }}>
                    <Typography variant = 'body1' gutterBottom style = {{ margin: '15px', maxWidth: '100%' }}> {chat.message} </Typography>
                  </Paper>
                </div>
              ))
            }
          </div>
        </div>

        {/* show text input and send button only for Active status, Completed doesn't need. */}
        {
          currTask.status === 'Active' && <Grid container justify="space-between" spacing={0} >
            <Grid item xs={9}>

              <TextField
                label="reply.."
                className={classes.chatBox}
                value={textValue}
                onChange={e => {
                  changeTextValue(e.target.value)
                }}
              />
            </Grid>
            <Grid item >
              <Button variant="contained" className={classes.button}
                onClick={() => {
                  sendChatAction({ from: userName, message: textValue }, currTask.taskID, currTask.chat)
                  changeTextValue('')
                }}
              >
                SEND
              </Button>
            </Grid>
          </Grid>
        }
      </Paper>

    </div>

  )
}

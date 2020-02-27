import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { CTX } from './chatLogic';
import Divider from '@material-ui/core/Divider';
import StatusSelect from './select';

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
    marginBottom: '15px'
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
  textBubble: {
    minWidth: '100%',
    minHeight: '7ex',
    borderRadius: '15px'
  },
  divider: {
    padding: '1px 16px'
  },
  margin15: {
    margin: '15px'
  }
}));

// every time we type, we change the state via ChangeTextValue
export default function Dashboard () {
  const classes = useStyles();
  // CTX store
  const { chat, sendChatAction, currTask, allTasks, setAllUsersTasks } = React.useContext(CTX);
  const [textValue, changeTextValue] = React.useState('');
  let taskDate = '' + currTask.datesend;
  const userName = sessionStorage.getItem('user_name');
  taskDate = taskDate.substring(0, 10);

  return (
    <div >
      <Paper variant="outlined" className={classes.root} >
        <Grid container spacing={0} style={{ backgroundColor: '#F5F8FA' }}>
          <Grid container direction="row" justify="center" alignItems="center" >
            <Grid container spacing={2} >
              <Grid item lg={4}>
                <Typography variant="h5" gutterBottom className={classes.margin15}> {currTask.title} </Typography>
                <Typography variant="body2" gutterBottom className={classes.margin15}> {`${currTask.selectedSubject}`} </Typography>
              </Grid>
              <Grid item lg={4}>
                <Typography variant='h6' align='center' gutterBottom className={classes.margin15} style={{ opacity: '0.6' }}>
                  {/* show the relevant name taking with */}
                  {`Talking with:${JSON.parse(sessionStorage.getItem('isAdmin')) ? currTask.userName : currTask.companyID}`}
                </Typography>
              </Grid>
              <Grid item lg={4}>
                <Typography align='center' variant='h6'>
                  {/* shows status selection only for admins and only for Active tasks */}
                  { currTask.status === 'Active' && JSON.parse(sessionStorage.getItem('isAdmin')) && <StatusSelect taskID={currTask.taskID} setAllUsersTasks={setAllUsersTasks}/>}
                  {!JSON.parse(sessionStorage.getItem('isAdmin')) && ('Status')}
                </Typography>
                <Typography align='center' style={{ opacity: '0.8' }}>
                  {!JSON.parse(sessionStorage.getItem('isAdmin')) && ('🟡  ' + currTask.status)}
                </Typography>
              </Grid>
            </Grid>

            <Grid container justify="space-between" spacing={2} >
              <Grid item lg={4}>
                <Typography variant='body1' gutterBottom className={classes.margin15} style={{ opacity: '0.6' }}> Open at: {taskDate} </Typography>
              </Grid>
              <Grid item lg={4} >
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Divider className={classes.divider} />

        <div className={classes.flex} style={{ overflow: 'auto' }}>
          <div className={classes.chatWindow}>
            {
              chat.map((chat, i) => (
                <div className = {classes.flex} key = {i}>
                  <Chip label = {chat.from} style = {{ marginRight: '10px' }} />
                  <Paper className = {classes.textBubble} variant = "elevation" style = {chat.from === userName ? { backgroundColor: '#109CF1' } : { backgroundColor: '#F2F3F5' }}>
                    <Typography variant = 'body1' gutterBottom className={classes.margin15} style = {{ maxWidth: '100%' }}> {chat.message} </Typography>
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
                  changeTextValue(e.target.value);
                }}
              />
            </Grid>
            <Grid item >
              <Button variant="contained" className={classes.button}
                onClick={() => {
                  sendChatAction({ from: userName, message: textValue }, currTask.taskID, currTask.chat);
                  changeTextValue('');
                }}
              >
                SEND
              </Button>
            </Grid>
          </Grid>
        }
      </Paper>
    </div>
  );
}

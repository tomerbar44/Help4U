import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { Redirect } from 'react-router-dom';
import NativeSelect from '@material-ui/core/NativeSelect';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(0),
    minWidth: 140
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}));

function Alert (props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function StatusSelect (props) {
  const { taskID, setAllUsersTasks } = props;
  const classes = useStyles();
  const [status, setStatus] = React.useState('Active');
  const [openSuccessBanner, setOpenSuccessBanner] = React.useState(false);
  const [openFailBanner, setOpenFailBanner] = React.useState(false);
  const [redirect, setRedirect] = React.useState(false);

  const handleClickSuccess = () => {
    setOpenSuccessBanner(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSuccessBanner(false);
    setRedirect(true);
  };
  const handleNotSucssesClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenFailBanner(false);
  };

  const handleClickNotSuccess = () => {
    setOpenFailBanner(true);
  };

  const handleChange = event => {
    setStatus(event.target.value);
    async function changeStatus () {
      try {
        const res = await fetch(`https://mern-finalproj-api.herokuapp.com/Help4U/task/update/${taskID}`, {
          method: 'PUT',
          mode: 'cors',
          headers: new Headers({
            'Content-Type': 'application/json; charset=utf-8'
          }),
          body: JSON.stringify({
            google_id: sessionStorage.getItem('user_id'),
            access_token: sessionStorage.getItem('access_token')
          })
        })
          .then(res => res.json());
        if (res.status == 200 && res.data !== null) {
          setAllUsersTasks(parentTasks => parentTasks.map(task => task.taskID !== taskID ? task : res.data));
          handleClickSuccess();
        } else {
          handleClickNotSuccess();
        }
      } catch (e) {
        // if fetch fail, reload and try again
        alert('something went work, page refreshing...');
        setInterval(() => {
          window.location.reload();
        }, 4000);
      }
    }
    changeStatus();
  };

  return (
    <FormControl className={classes.formControl}>
      <NativeSelect
        className={classes.selectEmpty}
        value={status}
        name="status"
        onChange={handleChange}
      >
        <option value={'Active'} disabled >🟡 Active</option>
        <option value={'Complete'}>⁦🟢 Complete</option>
      </NativeSelect>
      <Snackbar open={openSuccessBanner} autoHideDuration={2500} onClose={handleClose}>
        <Alert severity="success">
        Status changed to completed successfully !</Alert>
      </Snackbar>
      <Snackbar open={openFailBanner} onClose={handleNotSucssesClose} autoHideDuration={4000}>
        <Alert severity="error">There is a problem , Try again !</Alert>
      </Snackbar>
      {/* when change the status of a task, go back to home page */}
      {redirect ? <Redirect to="/home" /> : ''}
    </FormControl>

  );
}

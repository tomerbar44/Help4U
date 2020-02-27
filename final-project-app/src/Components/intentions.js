import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import SubjectTab from './subjectsList';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Box from '@material-ui/core/Box';
import { Redirect } from 'react-router-dom';

function Alert (props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      padding: theme.spacing(2, 2)
    }
  },
  button: {
    width: '20%',
    marginTop: '14px',
    backgroundColor: '#4caf50'
  },
  title: {
    margin: '10px',
    width: '200px'
  },
  subject: {
    marginBottom: '15px'
  }

}));

export default function Intentions () {
  const [titleValue, changeTitleValue] = React.useState('');
  const [subjectValue, changecsubjectValue] = React.useState('');
  const [openSucssesBanner, setOpenSucssesBanner] = React.useState(false);
  const [openFailBanner, setOpenFailBanner] = React.useState(false);
  const [eventButton, setEvent] = React.useState(false);
  const classes = useStyles();

  async function addIntention (title, subject) {
    try {
      const res = await fetch('https://mern-finalproj-api.herokuapp.com/Help4U/intentions', {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/json'
        }),
        mode: 'cors',
        body: JSON.stringify({
          text: title,
          subject: subject,
          google_id: sessionStorage.getItem('user_id'),
          access_token: sessionStorage.getItem('access_token')
        })
      }).then(res => res.json());
      if (res.status == 200 && res.data != null && res.data != false) {
        handleClickSucsses();
      } else {
        handleClickNotSucsses();
      }
    } catch (e) {
      // if fetch fail, reload and try again
      alert('something went work, page refreshing...');
      setInterval(() => {
        window.location.reload();
      }, 4000);
    }
  }
  const handleClickSucsses = () => {
    setOpenSucssesBanner(true);
  };
  const handleClickNotSucsses = () => {
    setOpenFailBanner(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSucssesBanner(false);
    setEvent(true);
  };
  const handleNotSucssesClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenFailBanner(false);
  };

  return (
    <div >
      <Paper variant="outlined" className={classes.root} >
        {<img style={{ marginTop:'10px' ,float: 'right'}} src="https://img.icons8.com/doodle/60/000000/smart-.png" />}
        <TextField
          disabled
          id="outlined-disabled"
          label="Attention"
          defaultValue="Here you can improve the classification of intentions by choosing a title and subject to classify"
          variant="outlined"
          multiline
          rows="2"
          style={{marginTop:'10px',width:"85%"}}
        />
        <Typography className={classes.title}>
          <TextField
            required
            id="Title"
            name="Title"
            label="Title"
            fullWidth
            onChange={e => {
              changeTitleValue(e.target.value);
            }}
          />
        </Typography>
        <Box mx="auto" style={{ margin: '12px' }}>
          <Typography align='center' className={classes.subject} >Subject</Typography>
          <SubjectTab parentCallback={changecsubjectValue} />
        </Box>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
        >
          <Grid justify="space-between" >

            <Button variant="contained"
              className={classes.button}
              onClick={() => {
                addIntention(titleValue, subjectValue);
              }
              }
            >
            TRAIN
            </Button>
          </Grid>
          <Grid just>

            <div className={classes.root}>
              <Snackbar open={openSucssesBanner} autoHideDuration={4000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                You managed to successfully improve the classification !</Alert>
              </Snackbar>
              <Snackbar open={openFailBanner} onClose={handleNotSucssesClose} autoHideDuration={4000}>
                <Alert severity="error">There is a problem , Try again and fill all the fields !</Alert>
              </Snackbar>
            </div>
          </Grid>
        </Grid>
      </Paper>
      {
        eventButton ? <Redirect to={'/home'} /> : ''
      }
    </div>
  );
}

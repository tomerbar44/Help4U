import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import SubjectTab from './subjectsList'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'
import Box from '@material-ui/core/box'
import { Redirect } from 'react-router-dom'

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />
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
  padding: {
    paddingLeft: '8px'
  },
  title: {
    margin: '10px',
    width: '200px'
  },
  subject: {
    marginBottom: '10px'
  }

}))

export default function Intentions() {
  const [titleValue, changeTitleValue] = React.useState('')
  const [subjectValue, changecsubjectValue] = React.useState('')
  const [openSucsses, setOpenSucsses] = React.useState(false)
  const [openNotSucsses, setOpenNotSucsses] = React.useState(false)
  const [eventButton, setEvent] = React.useState(false)
  const classes = useStyles()

  async function addIntention(title, subject) {
    try {
      const response = await fetch('https://mern-finalproj-api.herokuapp.com/Help4U/intentions', {
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
      }).then(response => response.json())
      if (response.status == 200 && response.data != null && response.data != false) {
        handleClickSucsses()
      } else {
        handleClickNotSucsses()
      }
    } catch (e) {
      // if fetch fail, reload and try again
      alert('something went work, page refreshing...')
      setInterval(() => {
        window.location.reload()
      }, 4000)
    }
  }
  const handleClickSucsses = () => {
    setOpenSucsses(true)
  }
  const handleClickNotSucsses = () => {
    setOpenNotSucsses(true)
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpenSucsses(false)
    setEvent(true)
  }
  const handleNotSucssesClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpenNotSucsses(false)
  }

  return (
    <div >

      <Paper variant="outlined" className={classes.root} >
        {<img style={{ float: 'right' }} src="https://img.icons8.com/doodle/48/000000/smart-.png" />}
        <Typography style={{ fontSize: 20 }} >Here you can improve the classification of intentions by inserting a title and choosing a subject to classify </Typography>
        <Typography className={classes.title}>
          <TextField
            required
            id="Title"
            name="Title"
            label="TITLE"
            fullWidth
            onChange={e => {
              changeTitleValue(e.target.value)
            }}
          />
        </Typography>
        <Box mx="auto" >
          <Typography align='center' className={classes.subject} >SUBJECT</Typography>
          <SubjectTab parentCallback={changecsubjectValue} />
        </Box>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
        >
          <Button variant="contained"
            className={classes.button}
            onClick={() => {
              addIntention(titleValue, subjectValue)
            }
            }
          >
            TRAIN
          </Button>
          <div className={classes.root}>
            <Snackbar open={openSucsses} autoHideDuration={4000} onClose={handleClose}>
              <Alert onClose={handleClose} severity="success">
                You success to improve the classification !</Alert>
            </Snackbar>
            <Snackbar open={openNotSucsses} onClose={handleNotSucssesClose} autoHideDuration={4000}>
              <Alert severity="error">There is a problem , Try again and fill all the fields !</Alert>
            </Snackbar>
          </div>
        </Grid>
      </Paper>
      {
        eventButton ? <Redirect to={'/home'} /> : ''
      }
    </div>
  )
}

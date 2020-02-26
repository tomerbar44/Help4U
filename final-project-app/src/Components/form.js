import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import CompanyTab from './companyList'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'
import Box from '@material-ui/core/Box'
import { Redirect } from 'react-router-dom'

function Alert (props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />
}

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      padding: theme.spacing(3, 2)
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
  company: {
    marginBottom: '10px'
  }

}))

export default function Form (props) {
  const [titleValue, changeTitleValue] = React.useState('')
  const [descriptionValue, changeDescriptionValue] = React.useState('')
  const [companyName, changeCompanyName] = React.useState('')
  const [taskIdValue, changecTaskIdValue] = React.useState('')
  const [openSucssesBanner, setOpenSucssesBanner] = React.useState(false)
  const [openNotSucssesBanner, setOpenNotSucssesBanner] = React.useState(false)
  const [redirect, setRedirect] = React.useState(false)
  const classes = useStyles()
  const {setAllUsersTasks } = props


  async function addTask (title, company, description) {
    try {
      const response = await fetch('https://mern-finalproj-api.herokuapp.com/Help4U/task/add', {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/json'
        }),
        mode: 'cors',
        body: JSON.stringify({
          userID: sessionStorage.getItem('user_id'),
          userName: sessionStorage.getItem('user_name'),
          companyID: company,
          title: title,
          chat: [{ from: sessionStorage.getItem('user_name'), message: description }]
        })
      }).then(response => response.json())
      if (response.status == 200 && response.data != null) {
        changecTaskIdValue(response.data.taskID)
        setAllUsersTasks(allTasks => ([...allTasks, response.data]))
        handleClickSucsses()
      } else {
        handleClickNotSucsses()
      }
    } catch (e) {
      alert('something went work, page refreshing...')

      setInterval(() => {
        window.location.reload()
      }, 4000)
    }
  }

  const handleClickSucsses = () => {
    setOpenSucssesBanner(true)
  }

  const handleClickNotSucsses = () => {
    setOpenNotSucssesBanner(true)
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setRedirect(true)
  }
  const handleNotSucssesClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpenNotSucssesBanner(false)
  }

  return (
    <Box mx="auto" >
      <Paper variant="outlined" className={classes.root} >
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
          <Typography align='center' className={classes.company} >COMPANY</Typography>
          <CompanyTab changeCompanyName={changeCompanyName} />
        </Box>
        <div style={{ margin: '15px' }}>
          {
            <TextField
              required
              id="filled-multiline-static"
              label="DESCRIPTION"
              multiline
              rows="10"
              variant="outlined"
              fullWidth
              onChange={e => {
                changeDescriptionValue(e.target.value)
              }}
            />
          }
        </div>

        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
        >
          <Button variant="contained"
            className={classes.button}
            onClick={() => {
              addTask(titleValue, companyName, descriptionValue)
            }
            }
          >
            SUBMIT
          </Button>
          <div className={classes.root}>
            <Snackbar open={openSucssesBanner} autoHideDuration={4000} onClose={handleClose}>
              <Alert severity="success">
                Your task has been successfully added !</Alert>
            </Snackbar>
            <Snackbar open={openNotSucssesBanner} onClose={handleNotSucssesClose} autoHideDuration={4000}>
              <Alert severity="error">There is a problem , Try again and fill all the fields !</Alert>
            </Snackbar>
          </div>
        </Grid>
      </Paper>
      {
        redirect ? <Redirect to={`/home/chat/${taskIdValue}`} /> : ''
      }
    </Box>
  )
}

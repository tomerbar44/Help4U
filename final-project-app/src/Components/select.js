import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'
import { Redirect } from 'react-router-dom'
import FormHelperText from '@material-ui/core/FormHelperText';
import NativeSelect from '@material-ui/core/NativeSelect';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(0),
    minWidth: 140
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}))

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />
}

export default function StatusSelect(props) {
  const { taskID, parentTasks ,parnetSet } = props
  const classes = useStyles()
  const [status, setStatus] = React.useState('Active')
  const [openSucsses, setOpenSucsses] = React.useState(false)
  const [openNotSucsses, setOpenNotSucsses] = React.useState(false)
  const [redirect, setRedirect] = React.useState(false)

  const handleClickSucsses = () => {
    setOpenSucsses(true)
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpenSucsses(false)
    setRedirect(true)
  }
  const handleNotSucssesClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpenNotSucsses(false)
  }
  const handleClickNotSucsses = () => {
    setOpenNotSucsses(true)
  }


  const handleChange = event => {
    setStatus(event.target.value)
    let res
    async function changeStatus() {
      try {
        res = await fetch(`https://mern-finalproj-api.herokuapp.com/Help4U/task/update/${taskID}`, {
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
          .then(res => res.json())
        if (res.status == 200 && res.data !== null) {
          parnetSet(parentTasks => parentTasks.map(task => task.taskID !== taskID ? task : res.data));
          handleClickSucsses()
        }
        else {
          handleClickNotSucsses()
        }
      }
         catch (e) {
        // if fetch fail, reload and try again
        alert('something went work, page refreshing...')
        setInterval(() => {
          window.location.reload()
        }, 4000)
      }
    }
    changeStatus()
  }

  return (
    <FormControl className={classes.formControl}>

      {/* <Select
        labelId="demo-simple-select-placeholder-label-label"
        id="demo-simple-select-placeholder-label"
        value={status}
        onChange={handleChange}
        displayEmpty
        className={classes.selectEmpty}
      >

        <MenuItem value={'Active'}>Active</MenuItem>
        <MenuItem value={'Complete'}>Complete</MenuItem>
      </Select> */}
          <NativeSelect
      className={classes.selectEmpty}
      value={status}
      name="age"
      onChange={handleChange}
      // inputProps={{ 'aria-label': 'age' }}
    >
      <option value={'Active'} disabled >🟡 Active</option>
      <option value={'Complete'}>🟢 Complete</option>
    </NativeSelect>
      <Snackbar open={openSucsses} autoHideDuration={2500} onClose={handleClose}>
        <Alert severity="success">
          Task Status updated successfully !</Alert>
      </Snackbar>
      <Snackbar open={openNotSucsses} onClose={handleNotSucssesClose} autoHideDuration={4000}>
        <Alert severity="error">There is a problem , Try again !</Alert>
      </Snackbar>
      {/* when change the status of a task, go back to home page */}
      {redirect ? <Redirect to="/home" /> : ''}
    </FormControl>


  //   <FormControl className={classes.formControl}>
  //   <NativeSelect
  //     className={classes.selectEmpty}
  //     value={status}
  //     name="age"
  //     onChange={handleChange('age')}
  //     inputProps={{ 'aria-label': 'age' }}
  //   >
  //     <option value="" disabled>
  //       Placeholder
  //     </option>
  //     <option value={10}>Ten</option>
  //     <option value={20}>Twenty</option>
  //     <option value={30}>Thirty</option>
  //   </NativeSelect>
  //   <FormHelperText>Placeholder</FormHelperText>
  // </FormControl>
  )
}
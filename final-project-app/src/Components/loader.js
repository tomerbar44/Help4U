import React, { useState, useEffect } from 'react'
import Backdrop from '@material-ui/core/Backdrop'
import CircularProgress from '@material-ui/core/CircularProgress'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles(theme => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff'
  }
}))

export default function SimpleBackdrop () {
  const [seconds, setSeconds] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(seconds => seconds + 1)
    }, 400)
    return () => clearInterval(interval)
  }, [])

  const classes = useStyles()
  let arr = new Array(30)
  arr = ['😀', '😝', '😜', '🤪', '😂', '🤷‍♂', '😇', '🤩', '🥳', '🙏🏽']
  return (
    <div>
      <Backdrop className={classes.backdrop} open={true}>
        <CircularProgress color="inherit" />
        <Typography style={{ margin: 10 }}>Loading.. {arr[seconds % 10]}
        </Typography>
      </Backdrop>
    </div>
  )
}

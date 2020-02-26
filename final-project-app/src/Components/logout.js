import React from 'react'
import { NavLink } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import { Box, Typography, ButtonBase } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  fade: {
    position: 'relative',
    [theme.breakpoints.down('xs')]: {
      width: '100% !important'
    },
    '&:hover, &$focusVisible': {
      zIndex: 1,
      '& $backdrop': {
        opacity: 0.15
      }
    }
  },
  focusVisible: {},
  backdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: 'white',
    transition: theme.transitions.create('opacity')
  },
  navLinks: {
    textDecorationLine: 'none',
    color: 'unset'
  }
}))

function Logout (props) {
  const classes = useStyles()
  return (
    <Box margin={3} mx={2}>

      <NavLink exact to='/' className={classes.navLinks}>

        <ButtonBase
          focusRipple
          key={0}
          className={classes.fade}
          focusVisibleClassName={classes.focusVisible}
          style={{
            width: '100%'
          }}
          type='reset'
        >
          <span className={classes.backdrop}>
            <Box >
              <ExitToAppIcon fontSize='large' />
            </Box>
          </span>
          <Typography>
            Logout
          </Typography>

        </ButtonBase>
      </NavLink>
    </Box>

  )
}

export default Logout

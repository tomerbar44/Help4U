import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar'
import Box from '@material-ui/core/Box'
import ButtonBase from '@material-ui/core/ButtonBase'
import Typography from '@material-ui/core/Typography'

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
    backgroundColor: '#3f51b5',
    transition: theme.transitions.create('opacity')
  },

  avatar: {
    margin: 'auto'
  },
  navLinks: {
    textDecorationLine: 'none',
    color: 'unset'
  }
}))

const realoadPage = () => {
  window.location.reload()
}

export default function Profile () {
  const classes = useStyles()
  return (

    <ButtonBase
      focusRipple
      key={0}
      className={classes.fade}
      focusVisibleClassName={classes.focusVisible}
      style={{
        width: '100%'

      }}
      type='reset'
      onClick={realoadPage}

    >
      <span className={classes.backdrop} />
      <Box mx="auto" mt='2px'>

        <Avatar alt={sessionStorage.getItem('user_name')} src={sessionStorage.getItem('profile_img')} className={classes.avatar} />
        <Box mt ='6px'>
          <Typography>
            {sessionStorage.getItem('user_name')}
          </Typography>
        </Box>
      </Box>
    </ButtonBase>

  )
}

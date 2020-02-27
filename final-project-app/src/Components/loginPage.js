import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import SocialImg from '../Images/successfully-network-event-001.jpg';
import WaveImg from '../Images/pngfuel.com.png';
import { GoogleAuth, GoogleOut, isAuthenticated, Here4uSignup } from '../Authentication/googleAuth';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh'
  },
  main_image: {
    backgroundImage: `url(${SocialImg})`,
    backgroundRepeat: 'no-repeat',
    backgroundColor:
            theme.palette.type === 'dark' ? theme.palette.grey[900] : theme.palette.grey[50],
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  },
  wave_image: {
    backgroundImage: `url(${WaveImg})`,
    backgroundRepeat: 'no-repeat',
    backgroundColor:
            theme.palette.type === 'dark' ? theme.palette.grey[900] : theme.palette.grey[50],
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'

  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  spaceBottom: {
    marginBottom: theme.spacing(9)
  }

}));

export default function SignInSide (props) {
  const classes = useStyles();

  const { message, newUser } = props;

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.main_image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square className={classes.wave_image}>
        <div className={classes.paper}>
          <Box display="flex">
            <Typography component="h1" variant="h2" className={classes.spaceBottom}> Here4U </Typography>
          </Box>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" className={classes.spaceBottom}> Sign in via Google</Typography>
          {
            isAuthenticated() ? <GoogleOut message={message}/> : newUser === true ? <Here4uSignup message={message} /> : <GoogleAuth message={message}/>
          }
        </div>
      </Grid>
    </Grid>
  );
}

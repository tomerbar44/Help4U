import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      padding: theme.spacing(1, 2)
    }
  }
}));

export default function Form (props) {
  const { message } = props;

  const classes = useStyles();
  return (
    <div >
      <Paper variant="outlined" className={classes.root} >
        <Typography align='center' style={{ fontSize: 30 }} >{message} </Typography>
      </Paper>
    </div>
  );
}

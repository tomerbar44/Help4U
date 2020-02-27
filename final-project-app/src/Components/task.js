import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

import {
  Chip
} from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import Grow from '@material-ui/core/Grow';

// the show the user only y/m/d
function formatDate (date) {
  date = date.slice(0, 10);
  return date;
}

const useStyles = makeStyles(theme => ({
  card: {
    minWidth: '100%'
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  },
  Active: {
    backgroundColor: '#ffca28',
    float: 'right',
    marginBottom: '8px',
    width: '89px'
  },
  Complete: {
    backgroundColor: '#66bb6a',
    float: 'right',
    marginBottom: '8px',
    width: '89px'
  },
  navLinks: {
    textDecorationLine: 'none'
  },
  box: {
    margin: theme.spacing(3)
  },
  paper: {
    minHeight: '800px'
  },
  header: {
    margin: '15px'
  }
}));

export default function Task (props) {
  const {
    allTasks,
    activeOnly
  } = props;

  const classes = useStyles();

  const createTask = (task, i) => {
    return (
      <Grow in={true} key={i}>
        <Box mx="auto" className={classes.box}>
          <NavLink exact to={'/home/chat/' + task.taskID} className={classes.navLinks}>
            <Card className={classes.card} key={i}>
              <CardContent>
                <Typography variant="h5" component="h2">
                  {task.title}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                  Due date: {formatDate(task.datesend)}
                </Typography>
                <Chip className={task.status === 'Active' ? classes.Active : classes.Complete} label={task.status} />
              </CardContent>
            </Card>
          </NavLink>
        </Box>
      </Grow>
    );
  };

  // generate tasks depends on activeOnly flag
  return (
    <Paper variant="outlined" className={classes.paper} >
      <Typography align='center' variant="h4" className={classes.header}> {activeOnly ? 'Active Tasks' : 'All Tasks'} </Typography>
      {
        allTasks.map((task, i) => {
          if (activeOnly && task.status === 'Active') {
            return createTask(task, i);
          }
          if (!activeOnly) {
            return createTask(task, i);
          }
        })
      }
    </Paper>
  );
}

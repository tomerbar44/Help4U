import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Loader from '../Components/loader';

function TabPanel (props) {
  const { children, value, index, ...other } = props;
  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps (index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#b9cdd3'
  }
}));

export default function SubjectList (props) {
  const classes = useStyles();
  const [index, setIndex] = React.useState(0);
  const [subjects, setSubjects] = React.useState(null);
  let currentSubject = '';

  const handleChange = (event, newValue) => {
    setIndex(newValue);
    currentSubject = subjects[newValue].name;
    sendData(currentSubject);
  };

  const sendData = (currentSubject) => {
    props.parentCallback(currentSubject);
  };

  useEffect(() => {
    async function initSubjects () {
      try {
        const res = await fetch('https://mern-finalproj-api.herokuapp.com/Help4U/subjects').then(res => res.json());
        if (res.status == 200 && res.data != null) {
          setSubjects(res.data);
        }
      } catch (e) {
        // if fetch fail, reload and try again
        alert('something went work, page refreshing...');
        setInterval(() => {
          window.location.reload();
        }, 4000);
      }
    }
    initSubjects();
  }, []);

  if (subjects == null) {
    return <Loader />;
  } else {
    return (
      <div className={classes.root}>
        <AppBar position="static" color="white">
          <Tabs
            value={index}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="scrollable"
            scrollButtons="auto"
            aria-label="scrollable auto tabs example"
          >
            {subjects.map((name, index) => (
              <Tab key={index} label={name.name} {...a11yProps({ index })} />
            ))}
          </Tabs>
        </AppBar>
      </div>
    );
  }
}

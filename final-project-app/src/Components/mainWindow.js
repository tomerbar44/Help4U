import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import Box from '@material-ui/core/Box';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { NavLink, Route } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
// Components
import Chat from './chat';
import Task from './task';
import ComposeChart from './composedChart';
import MessageComponent from './messageComponent';
import Form from './form';
import Intentions from './intentions';
import Contacts from './contacts';
import MySideBar from './sideBar';
import Profile from './profile';
import Logout from './logout';
import MyPieChart from './pieChart';
import Loader from './loader';

const drawerWidth = 240;
const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  drawer: {
    [theme.breakpoints.up('md')]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  appBar: {
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth
    },
    backgroundColor: 'white',
    color: 'black'
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      display: 'none'
    }
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },

  navLinks: {
    textDecorationLine: 'none',
    color: 'unset'
  },
  avatar: {
    margin: 'auto'
  },
  statitcsInMobile: {
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  },
  forMobileView: {
    [theme.breakpoints.down('sm')]: {
      width: '330px'
    },
    [theme.breakpoints.between('sm', 'md')]: {
      width: '400px'
    }
  }
}));

const notAllowMessage = 'Oh no! Page not found. 🙄';
const newUserMessage = 'Welcome to Here4U 😍 Please create new Task to begin ';

function ResponsiveDrawer (props) {
  const { container } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [allUsersTasks, setAllUsersTasks] = React.useState(null);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  useEffect(() => {
    let res;
    const fetchHandler = (res) => {
      // check if registered
      if (res.status === 200) {
        // data === null for new users
        res.data !== null ? setAllUsersTasks(res.data) : setAllUsersTasks([]);
      }
      // maybe DB error, reload and try again
      if (res.status === 500) {
        alert('something went work, page refreshing...');
        setInterval(() => {
          window.location.reload();
        }, 4000);
      }
    };

    async function fetchUserTasks () {
      try {
        res = await fetch(`https://mern-finalproj-api.herokuapp.com/Help4U/task/user/${sessionStorage.getItem('user_id')}`)
          .then(res => res.json());
        fetchHandler(res);
      } catch (e) {
        // if fetch fail, reload and try again
        alert('something went work, page refreshing...');
        setInterval(() => {
          window.location.reload();
        }, 4000);
      }
    }

    async function fetchCompanyTasks () {
      try {
        // add to request admins access token
        res = await fetch(`https://mern-finalproj-api.herokuapp.com/Help4U/task/company/${sessionStorage.getItem('company_name')}`, {
          method: 'GET',
          mode: 'cors',
          headers: new Headers({
            'Content-Type': 'application/json; charset=utf-8',
            google_id: sessionStorage.getItem('user_id'),
            access_token: sessionStorage.getItem('access_token')
          })
        })
          .then(res => res.json());
        fetchHandler(res);
      } catch (e) {
        // if fetch fail, reload and try again
        alert('something went work, page refreshing...');
        setInterval(() => {
          window.location.reload();
        }, 4000);
      }
    }
    JSON.parse(sessionStorage.getItem('isAdmin')) ? fetchCompanyTasks() : fetchUserTasks();
  }, []);

  if (allUsersTasks == null) {
    return <Loader />;
  } else {
    return (
      <div className={classes.root}>
        <CssBaseline />
        <Box width='15%'>
          <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
              <IconButton color="inherit" aria-label="open drawer" edge="start" onClick={handleDrawerToggle} className={classes.menuButton} >
                <MenuIcon />
              </IconButton>
              <Grid container direction="row" justify="space-between" alignItems="center">
                <Grid>
                  <Typography variant="h6" noWrap> Here4U </Typography>
                </Grid>
                <Grid >
                  <Logout />
                </Grid>
              </Grid>
            </Toolbar>
          </AppBar>
          <nav className={classes.drawer} aria-label="mailbox folders">
            <Hidden smUp implementation="css">
              <Drawer container={container} variant="temporary" anchor={theme.direction === 'rtl' ? 'right' : 'left'} open={mobileOpen}
                onClose={handleDrawerToggle}
                classes={{ paper: classes.drawerPaper }}
                ModalProps={{ keepMounted: true }} // Better open performance on mobile.
              >
                <Profile />
                <MySideBar />
              </Drawer>
            </Hidden>
            <Hidden smDown implementation="css">
              <Drawer classes={{ paper: classes.drawerPaper }} variant="permanent" open >
                <Profile />
                <MySideBar />
              </Drawer>
            </Hidden>
          </nav>
        </Box>
        <main className={classes.content}>
          <Box width='85%'>
            <div className={classes.toolbar} />
            <Grid container spacing={2}>

              <Grid item md={8} >
                <div className={classes.forMobileView}>
                  <Route exact path="/home" > {allUsersTasks.length == 0 ? <MessageComponent message={newUserMessage} /> : <Task allTasks={allUsersTasks} activeOnly={true} />} </Route>
                  <Route path="/home/chat" > <Chat allTasks={allUsersTasks} setAllUsersTasks={setAllUsersTasks} /> </Route>
                  <Route path="/home/tasks" >  <Task allTasks={allUsersTasks} activeOnly={false} /> </Route>
                  <Route path="/home/contacts" >{JSON.parse(sessionStorage.getItem('isAdmin')) ? <Contacts allTasks={allUsersTasks} /> : <MessageComponent message={notAllowMessage} />}</Route>
                  <Route path="/home/create" >{JSON.parse(sessionStorage.getItem('isAdmin')) ? <MessageComponent message={notAllowMessage} /> : <Form setAllUsersTasks={setAllUsersTasks} />} </Route>
                  <Route path="/home/train subject" >{JSON.parse(sessionStorage.getItem('isAdmin')) ? <Intentions /> : <MessageComponent message={notAllowMessage} />}  </Route>
                </div>
              </Grid>
              {/* show to users who have tasks, and in mobile not showing in 'chat' and 'create' */}
              <Grid item md={4}>
                {
                  (window.location.pathname.split('/')[2]) == 'chat' || (window.location.pathname.split('/')[2]) == 'create'
                    ? allUsersTasks.length !== 0 && <div className={classes.statitcsInMobile}><ComposeChart allTasks={allUsersTasks} /><MyPieChart allTasks={allUsersTasks} ></MyPieChart></div>
                    : allUsersTasks.length !== 0 && <div className={classes.forMobileView}><ComposeChart allTasks={allUsersTasks} /><MyPieChart allTasks={allUsersTasks} ></MyPieChart></div>
                }
              </Grid>

            </Grid>
          </Box>
        </main>
      </div>
    );
  }
}

ResponsiveDrawer.propTypes = {
  container: PropTypes.instanceOf(typeof Element === 'undefined' ? Object : Element)
};

export default ResponsiveDrawer;

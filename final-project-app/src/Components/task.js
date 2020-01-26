import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import amber from '@material-ui/core/colors/amber';
import { get } from 'mongoose';
import { Chip, List, ListItem } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
export let queryRes = React.createContext();
let res ;



// the show the user only y/m/d
function formatDate(date) {
    date = date.slice(0, 10);
    return date;

}


const useStyles = makeStyles(theme => ({
    card: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    Active: {
        backgroundColor: '#ffca28',
        float: "right",
        marginBottom: "8px"
    },
    Complete: {
        backgroundColor: '#66bb6a',
        float: "right",
        marginBottom: "8px"

    },
    navLinks: {
        textDecorationLine: 'none',
        // padding: 20
    },
    list: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
}));

export default function OutlinedCard(props) {

const {
    allTasks
} = props;

    const classes = useStyles();
    // here we have to send the userID and create cards for each one

    return (
        <queryRes.Provider >
                {/* {console.log('res inside TASK\n',res) */}
                

            <List className={classes.list}>

                {
                    allTasks.map((task, i) => (
                        <ListItem dense="true" key={i}>

                            <NavLink exact to={"/chat/" + task.taskID} className={classes.navLinks}>

                                <Card className={classes.card} variant="outlined" key={i}>

                                    <CardContent>

                                        <Typography variant="h5" component="h2">
                                            {task.title}

                                        </Typography>
                                        <Typography className={classes.pos} color="textSecondary">
                                            Due date: {formatDate(task.datesend)}
                                        </Typography>
                                        <Chip className={task.status === "Active" ? classes.Active : classes.Complete} label={task.status} />



                                    </CardContent>
                                    <CardActions>
                            <Button size="small">Learn More</Button>
                        </CardActions>
                                </Card>
                            </NavLink>

                        </ListItem>
                    ))


                }
            </List>

        </queryRes.Provider>

    );
}
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography'
import MuiAlert from '@material-ui/lab/Alert';


const useStyles = makeStyles(theme => ({
    root: {
        '& > *': {
            padding: theme.spacing(1, 2)
        },
    },
}));


export default function Form() {

    const classes = useStyles();
    return (
        <div >
            <Paper variant="outlined" className={classes.root} >
                <Typography style={{fontSize:30}} > Oh no! Page not found. 🙄</Typography>
            </Paper>
        </div>
    )
}
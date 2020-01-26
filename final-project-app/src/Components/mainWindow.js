import React, { useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import { Route } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import ResponsoveDrawer from "./responsiveDrawer";
import ChartBar from "../Components/chartBar";
import Chat from "../Components/chat";
import Task from "../Components/task";
// import ComposeChart from '../Components/composed-chart';




let res;
let queryRes;


const MainWindow = props => {

    // const [allTasks, setAllTasks] = React.useState([])

    const [allUsersTasks, setAllUsersTasks] = React.useState([])

    useEffect(() => {
    
        async function fetchChatDetails() {
    
    
            try {
                res = await fetch('https://floating-wave-00252.herokuapp.com/Help4U/task/getTasksByUID?userID=305171159').then(res => res.json())
                // queryRes = React.createContext(res);
                console.log('res MAIN WINDOW\n', res);
            }
            catch (e) {
                console.log(e);
            }
    
            if (res.status == 200 && res.data != null ) {
    
                // let tasks = res.data;
                setAllUsersTasks(res.data)
    
            }
        }
    
        fetchChatDetails();
        console.log('useEffect of mainWIndow!');
        
    
    }, []);

    return (
        <div >
            <ResponsoveDrawer>
                <Grid container spacing={2}>
                    <Grid item xs={8}   >

                        <Route exact path="/" component={() => <Task allTasks = {allUsersTasks} />} />
                        <Route path="/chat" component={() => <Chat allTasks={allUsersTasks} />} />
                        {/* another option to show chart from Bit */}
                        {/* <Route exact path="/" component={ComposeChart}  /> */}

                    </Grid>
                    <Grid item xs={4}>
                        {/* another option to show chart from Bit */}
                        <ChartBar />
                    </Grid>
                </Grid>

            </ResponsoveDrawer>
        </div>
    )
}



export default MainWindow;
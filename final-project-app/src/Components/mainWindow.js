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


const MainWindow = props => {

    const [allUsersTasks, setAllUsersTasks] = React.useState([])

    useEffect(() => {
    
        async function fetchChatDetails() {
    
    
            try {
                res = await fetch('https://mern-finalproj-api.herokuapp.com/Help4U/task/getTasksByUID?userID=305171159').then(res => res.json())
            
                

            }
            catch (e) {
                console.log(e);
            }
    
            if (res.status == 200 && res.data != null ) {
    
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
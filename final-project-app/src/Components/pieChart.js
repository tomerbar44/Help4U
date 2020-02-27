import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import PieChart from 'react-minimal-pie-chart';
import { Box } from '@material-ui/core';

const useStyles = makeStyles({
  table: {
    minWidth: 650
  },
  PieChart: {
    marginTop: '10px'
  }
});

export default function MyPieChart (props) {
  const { allTasks } = props;
  const classes = useStyles();

  const [dataArr, setDataArr] = useState([]);

  useEffect(() => {
    countRatio();
  }, [allTasks]);

  const countRatio = () => {
    const arr = [];

    arr.push({ title: 'Completed', value: 0, color: '#2ED47A' },
             { title: 'Active', value: 0, color: '#FFB946' });

    allTasks.forEach((oneTask, i) => {
      oneTask.status === 'Active' ? arr[1].value += 1 : arr[0].value += 1;
    });
    setDataArr(arr);
  };

  return (

    <Paper variant="outlined" className={classes.PieChart}>
      <Typography textAlign='center' align='center' variant={'h5'} style={{ marginTop: '7px' }}> 🥧 Task Ratio  </Typography>
      <Box margin={2}>
        <PieChart
          animate={false}
          animationDuration={500}
          animationEasing="ease-out"
          cx={50}
          cy={50}
          data={dataArr}
          label={({ data, dataIndex }) =>
            Math.round(data[dataIndex].percentage) + '%'
          }
          labelPosition={50}
          labelStyle={{
            fontFamily: 'sans-serif',
            fontSize: '5px'
          }}
          lengthAngle={360}
          lineWidth={12}
          paddingAngle={18}
          radius={50}
          rounded
          startAngle={0}
          viewBoxSize={[100, 100]}
        />
      </Box>
    </Paper>

  );
}

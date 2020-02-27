
import React, { useEffect, useState } from 'react';
import Paper from '@material-ui/core/Paper';
import {
  Chart,
  ArgumentAxis,
  ValueAxis,
  BarSeries,
  Legend,
  Title,
  Tooltip
} from '@devexpress/dx-react-chart-material-ui';
import { EventTracker, HoverState, Stack } from '@devexpress/dx-react-chart';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  titleText: {
    textAlign: 'center'
  },
  legend: {
    display: 'contents'
  }
};

const TextComponent = withStyles(styles)(({ classes, ...restProps }) => (

  <Title.Text {...restProps} className={classes.titleText} />
));

const LableComponent = withStyles(styles)(({ classes, ...restProps }) => (
  <Legend.Root {...restProps} className={classes.legend} />
));

const stacks = [
  { series: ['Active', 'Completed'] }
];

export default function ComposedChart (props) {
  const [chartData, setChartData] = useState([]);
  const { allTasks } = props;

  const calcSubjects = () => {
    const subMap = new Map();

    allTasks.forEach((oneTask) => {
      const ob = subMap.get(oneTask.selectedSubject);
      if (ob !== undefined) {
        oneTask.status === 'Completed' ? ob.C += 1 : ob.A += 1;
      } else {
        subMap.set(oneTask.selectedSubject, oneTask.status === 'Completed' ? { A: 0, C: 1, state: oneTask.selectedSubject } : { A: 1, C: 0, state: oneTask.selectedSubject });
      }
    });
    // getting the values of map == the data for table
    const values = Array.from(subMap.values());
    setChartData(values);
  };

  useEffect(() => {
    calcSubjects();
  }, [allTasks]);

  return (
    <Paper>
      <Chart
        data={chartData}
      >
        <BarSeries
          name="Active"
          valueField="A"
          argumentField="state"
          color='#ffb946'
        />
        <BarSeries
          name="Completed"
          valueField="C"
          argumentField="state"
          color='#2ed47a'
        />
        <ArgumentAxis />
        <ValueAxis />
        <Stack
          stacks={stacks}
        />
        <EventTracker />
        <Tooltip />
        <HoverState />
        <Title text="📋 All Tasks" textComponent={TextComponent} />
        <Legend position='bottom' rootComponent={LableComponent} />
      </Chart>
    </Paper>
  );
}

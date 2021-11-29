// ------------------------------------------------------------------------ //
import React, {useState, useEffect} from 'react';
import {Box, Grid, Paper, Typography} from '@mui/material';
import CircularProgressWithLabel from './CircularProgressWithLabel';
import DoSectionResult from './DoSectionResult';

// ------------------------------------------------------------------------ //
const qUpdateTaskListResult = /* GraphQL */ `
  mutation UpdateTaskListResult(
    $input: UpdateTaskListResultInput!
    $condition: ModelTaskListResultConditionInput
  ) {
    updateTaskListResult(input: $input, condition: $condition) {
      id
      created
      started
      completed
      taskListID
    }
  }
`;

// ------------------------------------------------------------------------ //
const DoListResult = ({taskListResult}) => {

    // state variables
    // progress on the list so far
    const [listProgress, setListProgress] = useState(0);
    // progress on each section of the list
    const [sectionProgressDict, setSectionProgressDict] = useState({});
    

    // initialize the progress trackers
    useEffect(() => {
        let tmp = {};
        for (let section in taskListResult.taskSectionResults.items) {
            tmp[section.id] = 0;
        }
        setSectionProgressDict(tmp);
    }, []);

    // callback function that reports the task progresss so the 
    // progress trackers can be updated
    const reportTaskProgress = (id, progress) => {
        let nsections = taskListResult.taskSectionResults.items.length;

        let tmp = sectionProgressDict;
        tmp[id] = progress;
        setSectionProgressDict(tmp);

        let p = 0;
        for (let k in tmp) {
            p = p + (tmp[k] / nsections);
        }

        setListProgress(p);

        if (p >= 100.0 && taskListResult.completed === null) {
            saveTaskComplete()
        }
    }

    function saveTaskComplete() {
        (async () => {
            let datetime = new Date();
            let day = format(datetime, 'yyyy-MM-dd');
            let time = format(datetime, 'kk:mm:ss');
            let now = day + 'T' + time + '.0Z'; // not add UTC timezone offset
        
            let info = {
                id : taskListResult.id,
                completed : now
            };
            let q = {
                query : qUpdateTaskListResult,
                variables : {input : info}
            };
            const res = await API.graphql(q);
            console.log("DoListResult >> SaveTaskComplete");
            console.log(res);
        })();
    }


    return (
        <Paper elevation={2} sx={{bgcolor: '#f0f0f0'}}>
            <Box ml={2} mr={2}>
                <br />
                <Grid container>
                    <Grid item xs>
                        <Typography variant="h5">{taskListResult.taskList.title}</Typography>
                        <Typography variant="subtitle1">{taskListResult.taskList.description}</Typography>
                    </Grid>
                    <Grid item>
                        <CircularProgressWithLabel value={listProgress} />
                    </Grid>
                </Grid>

                {taskListResult.taskSectionResults.items.map(taskSectionResult => (
                    <React.Fragment key={'DoListResult' + taskSectionResult.id}>
                        <DoSectionResult 
                            taskSectionResult={taskSectionResult}
                            reportTaskProgress={reportTaskProgress}
                        />
                    </React.Fragment>
                ))}
                <br />
            </Box>
        </Paper>
    )
}

// ------------------------------------------------------------------------ //
export default DoListResult;

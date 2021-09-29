import { Box, Grid, Paper, Typography } from '@mui/material'
import React, {useState, useEffect} from 'react'
import DoSection from './DoSection'
import CircularProgressWithLabel from './CircularProgressWithLabel';

const DoList = ({taskList}) => {

    const [progress, setProgress] = useState(0);
    const [sectionProgress, setSectionProgress] = useState({});

    useEffect(() => {
        let tmp = {};
        for (let k in taskList.taskSections.items) {
            tmp[k] = 0;
        }
        setSectionProgress(tmp);
    }, [taskList.taskSections.items]);

    const reportTaskProgress = (id, progress) => {
        let nsections = taskList.taskSections.items.length;

        let tmp = sectionProgress;
        tmp[id] = progress;
        setSectionProgress(tmp);

        let p = 0;
        for (let k in tmp) {
            p = p + (tmp[k] / nsections);
        }

        setProgress(p);

    };

    return (
        <Paper elevation={2} >

            <Box ml={2} mr={2}>
                <br />
                <Grid container>
                    <Grid item xs>
                        <Typography variant="h5">{taskList.title}</Typography>
                        <Typography variant="subtitle1">{taskList.description}</Typography>
                    </Grid>
                    <Grid item>
                        <CircularProgressWithLabel value={progress} />
                    </Grid>
                </Grid>

                {taskList.taskSections.items.map(taskSection => (
                    <React.Fragment key={taskSection.id}>
                        <DoSection taskSection={taskSection} reportTaskProgress={reportTaskProgress} />
                    </React.Fragment>
                ))}
            </Box>            
            <br />
        </Paper>        
    )
}

export default DoList

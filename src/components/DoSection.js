// imports
import { ExpandMore } from '@mui/icons-material';
import { 
    Accordion, AccordionDetails, AccordionSummary, 
    Box, 
    Checkbox, 
    Grid, 
    LinearProgress, 
    Typography } from '@mui/material'

import React, {useState, useEffect} from 'react'

const DoSection = ({taskSection, reportTaskProgress}) => {

    const [progress, setProgress] = useState(0);
    const [nitems, setNitems] = useState(1);
    const [itemState, setItemState] = useState([]);

    useEffect(() => {
        let taskItems = taskSection.taskItems.items;
        setNitems(taskItems.length);
        let tmp = {};
        for (let i=0; i<taskItems.length; i++) {
            tmp[taskItems[i].id] = false;
        }
        setItemState(tmp);
    }, [taskSection.taskItems.items]);

    const onCheckboxChange = (e, id) => {
        console.log(id, e.target.checked)
        let tmp = itemState;
        tmp[id] = e.target.checked;
        let ctr = 0;
        for (let k in tmp) {
            if (tmp[k]) {
                ctr = ctr + 1;
            }
        }

        console.log(ctr/nitems);
        let p = (ctr * 100.0) / nitems;
        setProgress(p);

        reportTaskProgress(taskSection.id, p);
    }

    return (
        <>
            <Accordion >                
                <AccordionSummary expandIcon={<ExpandMore />}>
                    <Box sx={{width: '100%'}}>
                        <Typography variant="h6">{taskSection.title}</Typography>
                        <LinearProgress 
                            sx={{width: '100%'}}
                            variant='determinate'
                            value={progress}
                        />
                    </Box>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid container spacing={2} >
                        {taskSection.taskItems.items.map(taskItem => (
                            <React.Fragment key={taskItem.id}>
                                <Grid item xs={9}>{taskItem.name}</Grid>
                                <Grid item xs={3}>
                                    <Checkbox onChange={(e) => {onCheckboxChange(e, taskItem.id)}} />
                                </Grid>
                            </React.Fragment>
                        ))}
                    </Grid>
                </AccordionDetails>
            </Accordion>            
        </>
    )
}

export default DoSection

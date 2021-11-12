// ------------------------------------------------------------------------ //
import React, {useState, useEffect} from 'react'
import {ExpandMore} from '@mui/icons-material';
import {
    Accordion, AccordionDetails, AccordionSummary,
    Box,
    Grid,
    LinearProgress,
    Typography } from '@mui/material';
import API from '@aws-amplify/api';
import Auth from '@aws-amplify/auth';
import DoItemResult from './DoItemResult';

// ------------------------------------------------------------------------ //
const updateTaskItemResultMutation = /* GraphQL */ `
    mutation UpdateTaskItemResult(
        $input: UpdateTaskItemResultInput!
        $condition: ModelTaskItemResultConditionInput
    ) {
        updateTaskItemResult(input: $input, condition: $condition) {
            id
            result
            timestamp
            updatedBy
            taskItemID
            taskItem {
                id
                name
                description
                displayOrder
                resultType
            }
            taskSectionResultID
        }
    }
`;

// ------------------------------------------------------------------------ //
const qOnUpdateTaskItemResultBySectionResultId = /* GraphQL */ `
    subscription OnUpdateTaskItemResultBySectionResultId(
        $taskSectionResultID: ID!
    ) {
        onUpdateTaskItemResultBySectionResultId(
          taskSectionResultID: $taskSectionResultID
        ) {
            id
            result
            note
            timestamp
            updatedBy
            taskSectionResultID
        }
    }
`;


// ------------------------------------------------------------------------ //
const DoSectionResult = ({taskSectionResult, reportTaskProgress}) => {

    // -------------------------------------------------------------------- //    
    const [progress, setProgress] = useState(0);
    const [nitems, setNitems] = useState(1);
    const [itemState, setItemState] = useState([]);
    const [userName, setUserName] = useState("");
    const [newTaskItemResult, setNewTaskItemResult] = useState({});

    // -------------------------------------------------------------------- //
    useEffect(() => {
        Auth.currentAuthenticatedUser().then(user => {
            setUserName(user.username);
        }).catch(err => {
            console.log(err);
        });
    }, []);

    useEffect(() => {        
        let tmp = taskSectionResult.taskItemResults.items;
        let tmpItemState = {};

        for (let i=0; i<tmp.length; i++) {
            let taskItemResult = tmp[i];            

            // add code here to determine item state based on the result
            // stored in the taskItemResult object
            if (taskItemResult.result === null) {
                tmpItemState[taskItemResult.id] = false;
            }
            else {
                tmpItemState[taskItemResult.id] = true;                
            }

            if (taskItemResult.id === newTaskItemResult.id) {                
                taskItemResult.note = newTaskItemResult.note;
                taskItemResult.result = newTaskItemResult.result;
                taskItemResult.timestamp = newTaskItemResult.timestamp;
                taskItemResult.updatedBy = newTaskItemResult.updatedBy;
                tmp[i] = taskItemResult;                

                tmpItemState[taskItemResult.id] = (newTaskItemResult.result === "true") ? true : false;
                
                taskSectionResult.taskItemResults.items = tmp;
            }    
        }        

        calculateProgress(tmpItemState, nitems);
        setItemState(tmpItemState);

    }, [newTaskItemResult]);    

    // -------------------------------------------------------------------- //
    // When there is a change to an item, update it in the sectikon results
    function updateTaskItemInState(result) {                
        let item = result.value.data.onUpdateTaskItemResultBySectionResultId;
        item.ready = true;
        setNewTaskItemResult(item);
    }

    // -------------------------------------------------------------------- //
    // subscribe to any changes in the items in this section
    useEffect(() => {
        let q = {
            query: qOnUpdateTaskItemResultBySectionResultId,
            variables: {taskSectionResultID: taskSectionResult.id}
        }
        const subscription = API.graphql(q).subscribe({
            next: ({provider, value}) => updateTaskItemInState({provider, value}),
            error: error => console.warn(error)
        });

        return () => subscription.unsubscribe();
    }, []);

    // -------------------------------------------------------------------- //
    useEffect(() => {

        let taskItemResults = taskSectionResult.taskItemResults.items;
        setNitems(taskItemResults.length);

        let tmpItemState = {};        
        for (let i=0; i<taskItemResults.length; i++) {
            let taskItemResult = taskItemResults[i];

            // add code here to determine item state based on the result
            // stored in the taskItemResult object
            if (taskItemResult.result === null) {
                tmpItemState[taskItemResult.id] = false;
            }
            else {
                tmpItemState[taskItemResult.id] = true;                
            }
        }
            
        calculateProgress(tmpItemState, taskItemResults.length);        
        setItemState(tmpItemState);        

    }, [taskSectionResult]);
 
    // -------------------------------------------------------------------- //
    function calculateProgress(itemStateCurrent, numItems) {
        if (taskSectionResult.ready === false) return;

        let ctr = 0;
        for (let k in itemStateCurrent) {
            if (itemStateCurrent[k]) {
                ctr++;
            }
        }

        //console.log(ctr/numItems);
        let p = (ctr * 100.0) / numItems;
        setProgress(p);
        reportTaskProgress(taskSectionResult.id, p);
    }

    // this gets tricky because there will be an control input for
    // each result type in the item list    

    // -------------------------------------------------------------------- //
    // Checkboxes
    async function onCheckboxChange (e, id) {        

        let tmpItemState = {};        
        for (let i=0; i<taskSectionResult.taskItemResults.items.length; i++) {
            let taskItemResult = taskSectionResult.taskItemResults.items[i];

            // add code here to determine item state based on the result
            // stored in the taskItemResult object
            if (taskItemResult.result === null) {
                tmpItemState[taskItemResult.id] = false;
            }
            else {
                tmpItemState[taskItemResult.id] = true;                
            }

            if (id === taskItemResult.id) {
                if (e.target.checked === true) {
                    tmpItemState[id] = e.target.checked;
                }
                else {
                    tmpItemState[id] = null;
                }
            }
        }        

        calculateProgress(tmpItemState, nitems);
        setItemState(tmpItemState);

        // save the check state in the database
        // update the result
        // overwrite the object with the return value
        // from the database so that everything stays up
        // to date
        let info = {
            id: id,
            result: tmpItemState[id],
            note: '',
            updatedBy: userName,
            taskSectionResultID: taskSectionResult.id 
        };

        let q = {
            query: updateTaskItemResultMutation,
            variables: {input: info}
        };

        const rval = await API.graphql(q);
        console.log(rval);
        
    };
    
    // -------------------------------------------------------------------- //
    return (
        <>
            {taskSectionResult.ready === false ? (<></>) : (
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMore />}>
                    <Box sx={{width: '100%'}}>
                        <Typography variant='h6'>{taskSectionResult.taskSection.title}</Typography>
                        <LinearProgress
                            sx={{width: '100%'}}
                            variant='determinate'
                            value={progress}
                        />
                    </Box>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid container spacing={2}>
                        {taskSectionResult.taskItemResults.items.map(taskItemResult => (
                            <React.Fragment key={taskItemResult.id}>
                                <DoItemResult 
                                    taskItemResult={taskItemResult}
                                    onCheckboxChange={onCheckboxChange}
                                    isChecked={itemState[taskItemResult.id]}
                                />
                                
                            </React.Fragment>
                        ))}
                    </Grid>
                </AccordionDetails>
            </Accordion>
            )}
        </>
    )
}

// ------------------------------------------------------------------------ //
export default DoSectionResult;

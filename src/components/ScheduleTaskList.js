import API from '@aws-amplify/api';
import { 
    FormControl,
    InputLabel, MenuItem, Paper, Select,
    TableContainer, TableBody, TableHead, TableRow, TableCell, Table, 
} from '@mui/material';

import React, {useState, useEffect} from 'react'
import ScheduleTableRow from './ScheduleTableRow';

const qGetTaskList = `
    query GetTaskList($id: ID!) {
        getTaskList(id: $id) {
            id
            title
            description
            taskSchedules {
                items {
                    id
                    startdate
                    stopdate
                    starttime
                    stoptime
                    taskListID
                }
            }
        }
    }
`;

const qGetAllTaskLists = `
    query ListTaskLists {
        listTaskLists {
            items {
                id
                title
                description
                taskSchedules {
                    items {
                        id
                        startdate
                        stopdate
                        starttime
                        stoptime
                        taskListID
                    }
                }
            }
        }
    }
`;

const ScheduleTaskList = () => {

    // Property to hold the results of a tasks lists query
    const [taskLists, setTaskLists] = useState([]);
    const [taskList, setTaskList] = useState({});
    const [radioValue, setRadioValue] = useState("");
    const [refreshTaskList, setRefreshTaskList] = useState(null);

    // When the component is loaded, go fetch all the task lists
    useEffect(() => {
        fetchTaskLists();
    }, []);    

    // when refresh is updated, refresh the task list
    useEffect(() => {
        if (radioValue !== "") {
            fetchTaskList(radioValue);
        }
    }, [refreshTaskList])

    // function to fetch task lists
    async function fetchTaskLists () {
        const rval = await API.graphql({query: qGetAllTaskLists});
        //console.log('ScheduleTaskList.fetchTaskLists');
        //console.log(rval);        
        setTaskLists(rval.data.listTaskLists.items);
    };

    // function to fetch a specific task list and it's schedules
    async function fetchTaskList(id) {
        let q = {
            query: qGetTaskList,
            variables: {id: id}            
        }

        let rval = await API.graphql(q);
        console.log('ScheduleTaskList.fetchTaskList');
        console.log(rval);
        setTaskList(rval.data.getTaskList);        
    }

    const onRadioChange = (e) => {        
        setRadioValue(e.target.value);
        for (let i=0; i<taskLists.length; i++) {
            if (taskLists[i].id === e.target.value) {
                fetchTaskList(taskLists[i].id);
                //setTaskList(taskLists[i]);
            }
        }
    };

    return (
        <div>
            <FormControl fullWidth>                
                <InputLabel htmlFor='task-list-select'>Task List</InputLabel>
                <Select
                    value={radioValue}
                    onChange={(e) => {onRadioChange(e)}}
                    inputProps={{name:'test', id: 'task-list-select'}}                    
                >
                    <MenuItem value=""><em>Select Task List</em></MenuItem>
                    {taskLists.map(tList => (
                        <MenuItem 
                            key={`select-${tList.id}`}
                            value={tList.id}
                        >
                            {tList.title} - {tList.taskSchedules.items.length}
                        </MenuItem>
                    ))}                    
                </Select>
            </FormControl>
            <br />
            <br />
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} aria-label='simple-table'>
                    <TableHead>
                        <TableRow>
                            <TableCell>Start Date</TableCell>
                            <TableCell>Stop Date</TableCell>
                            <TableCell>Start Time</TableCell>
                            <TableCell>Stop Time</TableCell>     
                            <TableCell>&nbsp;</TableCell>                       
                        </TableRow>
                    </TableHead> 
                    {(typeof taskList.taskSchedules !== 'undefined') ? (
                        <TableBody>
                            {taskList.taskSchedules.items.map((taskSchedule) =>
                                <ScheduleTableRow
                                    key={`row-${taskSchedule.id}`} 
                                    taskSchedule={taskSchedule} 
                                    setRefreshTaskList={setRefreshTaskList}
                                    taskListID={taskList.id}
                                    newRow={false}
                                />
                                
                            )}                 
                            <ScheduleTableRow 
                                taskSchedule={null} 
                                setRefreshTaskList={setRefreshTaskList}
                                taskListID={taskList.id} 
                                newRow={true} 
                            />           
                        </TableBody>
                    ) : (
                        <></>
                    )}
                                       
                </Table>
            </TableContainer>
            <br />
        </div>
    )
}

export default ScheduleTaskList

import API from '@aws-amplify/api';
import { 
    Button, Box, FormControl, FormControlLabel, FormLabel, Grid, 
    InputLabel, MenuItem, Paper, Radio, RadioGroup, Select,
    TableContainer, TableBody, TableHead, TableRow, TableCell, Table, 
    TextField,
    IconButton
} from '@mui/material';
import { DatePicker, TimePicker } from '@mui/lab';
import React, {useState, useEffect} from 'react'
import {format} from 'date-fns';

import { createTaskSchedule as createTaskScheduleMutation } from '../graphql/mutations';
import EditIcon from '@mui/icons-material/Edit';
import AddBoxIcon from '@mui/icons-material/AddBox';

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
    
    const [localScheduleData, setLocalScheduleData] = useState({
        starttime: null,
        stoptime: null,
        startdate: null,
        stopdate: null    
    });         

    // When the component is loaded, go fetch all the task lists
    useEffect(() => {
        fetchTaskLists();
    }, []);

    // function to fetch task lists
    async function fetchTaskLists () {
        const rval = await API.graphql({query: qGetAllTaskLists});
        console.log(rval);        
        setTaskLists(rval.data.listTaskLists.items);
    };

    const onRadioChange = (e) => {        
        setRadioValue(e.target.value);
        for (let i=0; i<taskLists.length; i++) {
            if (taskLists[i].id === e.target.value) {
                setTaskList(taskLists[i]);
            }
        }
    };

    async function addSchedule() {
        if (typeof taskList.id !== 'undefined') {
            let startdate = format(localScheduleData.startdate, 'yyyy-MM-dd');            
            // stop date
            let stopdate = format(localScheduleData.stopdate, 'yyyy-MM-dd');            
            // start time
            let starttime = format(localScheduleData.starttime, 'kk:mm:ss');            
            // stop time
            let stoptime = format(localScheduleData.stoptime, 'kk:mm:ss');            

            let info = {
                startdate: startdate,
                stopdate: stopdate,
                starttime: starttime,
                stoptime: stoptime
            };
            info['taskListID'] = taskList.id;

            let q = {
                query: createTaskScheduleMutation,
                variables: {input: info}
            };
            let rval = await API.graphql(q);
            console.log(rval);

        }
    }

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
                                <TableRow key={`row-${taskSchedule.id}`}>
                                    <TableCell>{taskSchedule.startdate}</TableCell>
                                    <TableCell>{taskSchedule.stopdate}</TableCell>
                                    <TableCell>{taskSchedule.starttime}</TableCell>
                                    <TableCell>{taskSchedule.stoptime}</TableCell>
                                    <TableCell><IconButton aria-label='edit'><EditIcon /></IconButton></TableCell>
                                </TableRow>
                            )}                            
                        </TableBody>
                    ) : (
                        <></>
                    )}
                    <TableBody>
                        <TableRow>
                            <TableCell>
                                <DatePicker
                                    label="Start Date"
                                    value={localScheduleData.startdate}
                                    onChange={newDate => setLocalScheduleData({...localScheduleData, 'startdate': newDate})}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </TableCell>
                            <TableCell>
                                <DatePicker
                                    label="Stop Date"
                                    value={localScheduleData.stopdate}
                                    onChange={newDate => setLocalScheduleData({...localScheduleData, 'stopdate': newDate})}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </TableCell>
                            <TableCell>
                                <TimePicker
                                    label="Start Time"
                                    value={localScheduleData.starttime}
                                    onChange={newDate => setLocalScheduleData({...localScheduleData, 'starttime': newDate})}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </TableCell>
                            <TableCell>
                                <TimePicker
                                    label="Stop Time"
                                    value={localScheduleData.stoptime}
                                    onChange={newDate => setLocalScheduleData({...localScheduleData, 'stoptime': newDate})}
                                    renderInput={(params) => <TextField {...params} />}
                                />  
                            </TableCell>
                            <TableCell><IconButton aria-label='add' onClick={addSchedule}><AddBoxIcon /></IconButton></TableCell>
                        </TableRow>
                    </TableBody>
                                       
                </Table>
            </TableContainer>
            <br />
            <br />
            <Box
                component="form"
                sx = {{'& > :not(style)': {m: 1, width: '25ch'},}}
                noValidate
                autoComplete='off'
            >
                <DatePicker
                    label="Start Date"
                    value={localScheduleData.startdate}
                    onChange={newDate => setLocalScheduleData({...localScheduleData, 'startdate': newDate})}
                    renderInput={(params) => <TextField {...params} />}
                />
                <DatePicker
                    label="Stop Date"
                    value={localScheduleData.stopdate}
                    onChange={newDate => setLocalScheduleData({...localScheduleData, 'stopdate': newDate})}
                    renderInput={(params) => <TextField {...params} />}
                />
                <TimePicker
                    label="Start Time"
                    value={localScheduleData.starttime}
                    onChange={newDate => setLocalScheduleData({...localScheduleData, 'starttime': newDate})}
                    renderInput={(params) => <TextField {...params} />}
                />
                <TimePicker
                    label="Stop Time"
                    value={localScheduleData.stoptime}
                    onChange={newDate => setLocalScheduleData({...localScheduleData, 'stoptime': newDate})}
                    renderInput={(params) => <TextField {...params} />}
                />                
                <Button variant='contained' onClick={addSchedule}>Add Schedule</Button>
            </Box>
        </div>
    )
}

export default ScheduleTaskList

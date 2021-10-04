import React, { useState, useEffect } from 'react'

import { IconButton, TableCell, TableRow, TextField } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import AddBoxIcon from '@mui/icons-material/AddBox';
import DeleteIcon from '@mui/icons-material/Delete'
import SaveIcon from '@mui/icons-material/Save'
import { DatePicker, TimePicker } from '@mui/lab';

// mutation to update a row in the TaskSchedule table
import { createTaskSchedule as createTaskScheduleMutation } from '../graphql/mutations';
// mutation to create a row in the TaskSchedule table
import { updateTaskSchedule as updateTaskScheduleMutation } from '../graphql/mutations';
// mutation to delete a row in the TaskSchedule table
import { deleteTaskSchedule as deleteTaskScheduleMutation } from '../graphql/mutations';
import { format } from 'date-fns';
import API from '@aws-amplify/api';

// default schedule values, makes it so that date and time pickers
// behave nicely
const defaultScheduleValues = {
    id: null,
    startdate: null,
    stopdate: null,
    starttime: null,
    stoptime: null,
    taskListID: null
}

const ScheduleTableRow = ({taskSchedule, setRefreshTaskList, taskListID, newRow }) => {
    // local schedule field values
    const [scheduleValues, setScheduleValues] = useState(defaultScheduleValues);
    const [nativeScheduleValues, setNativeScheduleVales] = useState(defaultScheduleValues);
    const [editRow, setEditRow] = useState(false);

    const [tzOffset, setTzOffset] = useState("+0:00")

    // get the timezone offset
    useEffect(() => {
        let offset = (-1.0 * (new Date().getTimezoneOffset()))/60.0;            
        let soffset = '';
        if (offset < 0) {
            soffset = '-';
            offset = -1.0 * offset;
        }
        else {
            soffset = '+';
        }
        soffset = soffset + offset.toString() + ':00';
        //console.log(soffset);
        setTzOffset('-06:00');
    }, []);

    // on initialization, load existing taskschedule values into the
    // local schedule values
    useEffect(() => {
        if (newRow === false && taskSchedule !== null) {
            
            let today = format(new Date(), 'yyyy-MM-dd')  
            let tmp = {                
                startdate: new Date(taskSchedule.startdate + "T00:00:00.000" + tzOffset),
                stopdate: new Date(taskSchedule.stopdate + "T00:00:00.000" + tzOffset),
                starttime: new Date(today + "T" + taskSchedule.starttime + tzOffset),
                stoptime: new Date(today + "T" + taskSchedule.stoptime + tzOffset)
            }
            setNativeScheduleVales(tmp);            
            setScheduleValues({...scheduleValues, ...taskSchedule});
        }

        
    }, [taskSchedule, tzOffset]);

    // Create a new schedule and attach it to the task list
    async function createSchedule() {
        if (typeof taskListID !== 'undefined') {
            let startdate = format(nativeScheduleValues.startdate, 'yyyy-MM-dd');
            let stopdate = format(nativeScheduleValues.stopdate, 'yyyy-MM-dd');
            let starttime = format(nativeScheduleValues.starttime, 'kk:mm:ss');
            let stoptime = format(nativeScheduleValues.stoptime, 'kk:mm:ss');

            let info = {
                startdate: startdate,
                stopdate: stopdate,
                starttime: starttime,
                stoptime: stoptime,
                taskListID: taskListID
            }

            let q = {
                query: createTaskScheduleMutation,
                variables: {input: info}
            }
            
            let rval = await API.graphql(q);
            setRefreshTaskList(new Date());
            
            setNativeScheduleVales(defaultScheduleValues);
        }
    }

    // Update an existing schedule
    async function updateSchedule() {
        let s = scheduleValues;

        s.startdate = format(nativeScheduleValues.startdate, 'yyyy-MM-dd');
        s.stopdate = format(nativeScheduleValues.stopdate, 'yyyy-MM-dd');
        s.starttime = format(nativeScheduleValues.starttime, 'kk:mm:ss');
        s.stoptime = format(nativeScheduleValues.stoptime, 'kk:mm:ss');

        let q = {
            query: updateTaskScheduleMutation,
            variables: {input: s}            
        }

        let rval = await API.graphql(q);
        setRefreshTaskList(new Date());
        console.log(rval);

        setEditRow(false);
    }

    // delete a schedule
    async function deleteSchedule() {
        let s = {id: scheduleValues.id};

        let q = {
            query: deleteTaskScheduleMutation,
            variables: {input: s}
        }
        let rval = await API.graphql(q);
        setRefreshTaskList(new Date());
    }
    
    // Build up the UI
    return (
        <>
            {(editRow || newRow) ? (
                <TableRow>
                    <TableCell>
                        <DatePicker
                            label="Start Date"
                            value={nativeScheduleValues.startdate}
                            onChange={newDate => setNativeScheduleVales({...nativeScheduleValues, 'startdate': newDate})}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </TableCell>
                    <TableCell>
                        <DatePicker
                            label="Stop Date"
                            value={nativeScheduleValues.stopdate}
                            onChange={newDate => setNativeScheduleVales({...nativeScheduleValues, 'stopdate': newDate})}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </TableCell>
                    <TableCell>
                        <TimePicker
                            label="Start Time"
                            value={nativeScheduleValues.starttime}
                            onChange={newDate => setNativeScheduleVales({...nativeScheduleValues, 'starttime': newDate})}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </TableCell>
                    <TableCell>
                        <TimePicker
                            label="Stop Time"
                            value={nativeScheduleValues.stoptime}
                            onChange={newDate => setNativeScheduleVales({...nativeScheduleValues, 'stoptime': newDate})}
                            renderInput={(params) => <TextField {...params} />}
                        />  
                    </TableCell>                    
                    {editRow ? (
                        <TableCell>                            
                            <span>
                            <IconButton aria-label='save' onClick={updateSchedule}><SaveIcon /></IconButton>
                            <IconButton aria-label='delete' onClick={deleteSchedule}><DeleteIcon /></IconButton>
                            </span>
                        </TableCell>
                    ) : (
                        <TableCell><IconButton aria-label='add' onClick={createSchedule}><AddBoxIcon /></IconButton></TableCell>
                    )}
                    
        
                </TableRow>
            ) : (
                <TableRow>            
                    <TableCell>{scheduleValues.startdate}</TableCell>
                    <TableCell>{scheduleValues.stopdate}</TableCell>
                    <TableCell>{scheduleValues.starttime}</TableCell>
                    <TableCell>{scheduleValues.stoptime}</TableCell>
                    <TableCell>
                        <IconButton aria-label='edit' onClick={() => setEditRow(true)}>
                            <EditIcon />
                        </IconButton>
                    </TableCell>     
                </TableRow>
            )}
        </>
    )
}

export default ScheduleTableRow

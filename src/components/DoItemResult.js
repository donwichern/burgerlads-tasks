import { Checkbox, Grid, TextField, IconButton, Divider, TableRow, TableCell, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import Auth from '@aws-amplify/auth';
import API from '@aws-amplify/api';
import {format, getTime} from 'date-fns';


import { createTaskSectionResult as createTaskSectionResultMutation } from '../graphql/mutations';
import { createTaskItemResult as createTaskItemResultMutation } from '../graphql/mutations';

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
const ItemNote = ({taskItemResult, onNoteChange}) => {

    const [note, setNote] = useState(taskItemResult.note);

    function onChange(e) {        
        setNote(e.target.value);
    }

    // capture key press, if enter then save the note.
    /*
    function onKeyPress(e) {
        if (e.keyCode === 13) {
            saveNote(e.target.value);
        }
    }
    */

    // on exit, save the note
    function onBlur(e) {
        saveNote(e.target.value.trim());
    }


    function saveNote(noteText) {
        // null case
        if (noteText === "" && taskItemResult.note === null) {
            // no change, do nothing
        }
        // otherwise, if there was a change, 
        else if (noteText !== taskItemResult.note) {
            onNoteChange(taskItemResult.id, noteText);
        }
    }

    return(
        <>
            <TableRow>
                <TableCell width='40px' align="right">&nbsp;</TableCell>
                <TableCell colSpan={2}>
                    <TextField
                        id="outlined-multiline-flexible"
                        label="Note"
                        multiline
                        maxRows={4}
                        size="small"
                        fullWidth
                        onChange={onChange}
                        onBlur={onBlur}
                        value={note === null ? "" : note}
                    />
                </TableCell>
            </TableRow>
        </>
    )
}

/*
<Grid item xs={3}></Grid>
            <Grid item xs={9}>
                <TextField
                    id="outlined-multiline-flexible"
                    label="Note"
                    multiline
                    maxRows={4}
                    size="small"
                    fullWidth
                />
            </Grid> */

// ------------------------------------------------------------------------ //
const DoItemResultCheckbox = ({taskItemResult, onResultChange}) => {

    // -------------------------------------------------------------------- //
    // store the state of the checkbox
    const [isChecked, setIsChecked] = useState(false);

    // -------------------------------------------------------------------- //
    // if the database object changes, update the checkbox to match
    useEffect(() => {
        if (taskItemResult != null) {
            setIsChecked(taskItemResult.result === "true");            
        }
    }, [taskItemResult]);

    // -------------------------------------------------------------------- //
    // when the box is clicked, update the box and then send the
    // checked state up to be stored in the database
    async function onCheckboxChange(e) {
        setIsChecked(e.target.checked);
        
        if (e.target.checked === true) {
            onResultChange(taskItemResult.id, "true");
        }
        else {
            onResultChange(taskItemResult.id, null);
        }
    }

    // -------------------------------------------------------------------- //
    // render the component
    return (
        <>
            <TableCell align="right" width="20px" >
                <Checkbox 
                    checked={isChecked === true}
                    onChange={onCheckboxChange}
                />           
            </TableCell>
            <TableCell scope="row" colSpan={2}>{taskItemResult.taskItem.name}</TableCell>
        </>
    )
}

// ------------------------------------------------------------------------ //
const DoItemResultTemperature = ({taskItemResult, onResultChange}) => {

    // store initial value, if user exits the cell or presses enter and the current
    // value is different from the inital value then update

    // onenter

    // onchange

    // onkeypress (enter)

    // onexit

    return (
        <>
            {/*
            <TableCell align="right" width="20px" >
                <TextField
                    onKeyPress={onKeyPress}
                    onChange={onChange}
                />
                <Checkbox 
                    checked={isChecked === true}
                    onChange={(e) => {onCheckboxChange(e, taskItemResult.id)}}
                />           
            </TableCell>
            */}
            <TableCell scope="row" colSpan={2}>{taskItemResult.taskItem.name}</TableCell>
        </>
    )
}

// ------------------------------------------------------------------------ //
const DoItemResultTextbox = ({taskItemResult, onResultChange}) => {
    return (
        <>
            {/*
            <TableCell align="right" width="20px" >
                <Checkbox 
                    checked={isChecked === true}
                    onChange={(e) => {onCheckboxChange(e, taskItemResult.id)}}
                />           
            </TableCell>
            */}
            <TableCell scope="row" colSpan={2}>{taskItemResult.taskItem.name}</TableCell>
        </>
    )
}

// ------------------------------------------------------------------------ //
const DoItemResult = ({taskItemResult, reportResultChange}) => {

    // -------------------------------------------------------------------- //
    const [showNote, setShowNote] = useState(false);
    const [userName, setUserName] = useState("");
    
    // -------------------------------------------------------------------- //
    useEffect(() => {
        Auth.currentAuthenticatedUser().then(user => {
            setUserName(user.username);
        }).catch(err => {
            console.log(err);
        });
    }, []);

    // -------------------------------------------------------------------- //
    async function onResultChange(id, result) {        
        // report the change back up so that the progress state can update
        reportResultChange(id, result);        
         
        let info = {
            id: id,
            result: result,
            updatedBy: userName,
            timestamp: getTimestamp(),
            taskSectionResultID: taskItemResult.taskSectionResultID 
        };

        let q = {
            query: updateTaskItemResultMutation,
            variables: {input: info}
        };

        const rval = await API.graphql(q);
        console.log(rval);
    }

    async function onNoteChange(id, text) {
        // no need to report the note up to update progress.

        let info = {
            id: id,
            note: text,
            updatedBy: userName,
            timestamp: getTimestamp(),
            taskSectionResultID: taskItemResult.taskSectionResultID 
        };

        let q = {
            query: updateTaskItemResultMutation,
            variables: {input: info}
        };

        const rval = await API.graphql(q);
        console.log(rval);
        
    }

    function getTimestamp() {
        // save the check state in the database
        let datetime = new Date();
        let day = format(datetime, 'yyyy-MM-dd');
        let time = format(datetime, 'kk:mm:ss');
        let now = day + 'T' + time + '.0Z'; // not add UTC timezone offset
        return (now);
    }

    const renderResultComponent = (itemResult) => {
        switch (itemResult.taskItem.resultType) {
            case 'bool':
                return <DoItemResultCheckbox taskItemResult={itemResult} onResultChange={onResultChange}/>
            case 'temp':
                return <DoItemResultTemperature taskItemResult={itemResult} onResultChange={onResultChange}/>
            default:
                return <DoItemResultTextbox taskItemResult={itemResult} onResultChange={onResultChange}/>
        }
    };

    return (
        <>
            <TableRow >
                {renderResultComponent(taskItemResult)}
                <TableCell align="right" width="20px">     
                    <IconButton aria-label='edit' onClick={() => setShowNote(true)}>
                        <EditIcon />
                    </IconButton>
                </TableCell>
            </TableRow>
            {showNote && <ItemNote taskItemResult={taskItemResult} onNoteChange={onNoteChange} />}
        </>
    )
}

// ------------------------------------------------------------------------ //
export default DoItemResult;

/*
<Grid item xs={9}>{taskItemResult.taskItem.name}</Grid>
            <Grid item xs={3}>
                <Checkbox 
                    checked={isChecked === true}
                    onChange={(e) => {onCheckboxChange(e, taskItemResult.id)}} />
                <IconButton aria-label='edit' onClick={() => setShowNote(true)}>
                    <EditIcon />
                </IconButton>
            </Grid>
            {showNote && <ItemNote />}
            <Divider /> 

            <TextField
                        id="outlined-multiline-flexible"
                        label="Note"
                        multiline
                        maxRows={4}
                        size="small"
                        fullWidth
                    />
                    */
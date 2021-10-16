// display all lists that are active. An active list has a startdate, 
// enddate, starttime and endtime that surround the current time

// A list is started if it has a started entry in the TaskListResult table
// A list is completed if it has a completed entry in the TaskListResult table
// Show a start, edit or completed icon for each active task

// When a task becomes active, it should show a start icon
// When the task is started it should show an edit icon
// When the task is completed it should show a completed icon
// When the task is late it should still show the start or edit icons, but
//   have a different text color or background color
// When a task is completed and no longer in its active range it should
//   no longer be in the list of active tasks.

// Should the completion percentage display in the listview?

// Step 1. Query all the scheduled lists for today
// Step 2. If they don't have results started, start their results
// Step 3. Show the lists for today with their status 
//         (scheduled, started, completed, late)


import React, {useState, useEffect} from 'react';
import API from '@aws-amplify/api';
import { format } from 'date-fns';
import { createTaskListResult as createTaskListResultMutation } from '../graphql/mutations';
import { Divider, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';

import EditIcon from '@mui/icons-material/Edit';
import {Link as RouterLink} from 'react-router-dom';


const qListTaskSchedules = /* GraphQL */ `
  query ListTaskSchedules(
    $filter: ModelTaskScheduleFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTaskSchedules(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        startdate
        stopdate
        starttime
        stoptime
        taskListID
        taskList {
          id
          title
          description
          createdAt
          updatedAt
        }        
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;

const qListTaskListResults = /* GraphQL */ `
    query listTaskListResults(
        $filter: ModelTaskListResultFilterInput
        $limit: Int
        $nextToken: String
    ) {
        listTaskListResults(filter: $filter, limit: $limit, nextToken: $nextToken) {
            items {
                id
                created
                started
                completed
                taskListID
                taskList {
                    id
                    title
                    description
                }
                taskScheduleID
                taskSchedule {
                    id
                    startdate
                    stopdate
                    starttime
                    stoptime
                }
                createdAt
                updatedAt
            }
        }
    }
`;

const DisplayActiveLists = () => {
    
    // todays results lets us link each result to a 
    // schedule and a list, this is what we will use to
    // as the data source for this component
    const [todaysResults, setTodaysResults] = useState([]);
   
    // on load, get today's lists and put them into a state variable
    useEffect(() => {
        fetchTodaysLists();        
    }, []);

    // get all the lists scheduled for today
    async function fetchTodaysSchedules() {
        let today = format(new Date(), 'yyyy-MM-dd');

        // create a filter that will find today's scheduled lists
        let dateFilter = {
            and: [
                {startdate: {le: today}},
                {stopdate: {ge: today}}
            ]
        }
        // create a query using the filter
        let q = {
            query: qListTaskSchedules,
            variables: {filter: dateFilter}
        };
        // run the query
        let rval = await API.graphql(q);

        // debug
        //console.log(rval);

        // now check to see if the lists have been started
        // get all thelists that need to be completed today
        return (rval.data.listTaskSchedules.items);
    }

    // get all the result sets for todays scheduled lists
    async function fetchTodaysResults(tschedules) {
        let today = format(new Date(), 'yyyy-MM-dd');

        // create an empty filter list that we will populate with the schedule
        // ids    
        let schedIdFilterList = [];

        // loop through todays schedules
        for (let i=0; i<tschedules.length; i++) {
            let tschedule = tschedules[i];
            // build up the list of todays scheduled list ids
            schedIdFilterList.push({taskScheduleID: {eq: tschedule.id}});    
        }

        // create the filter to use on the results table
        let schedIdFilter = {
            or: schedIdFilterList,
            created: {eq: today}
        };
        // create the query using the filter
        let q = {
            query: qListTaskListResults,
            variables: {filter: schedIdFilter}
        };
        //console.log(q);
        // run the query
        let rval = await API.graphql(q);

        // rval contains a list of all today's results that have been generated.
        // if the listis missing any entries, create those entries in TaskResults        
        console.log(rval.data.listTaskListResults.items);
        return (rval.data.listTaskListResults.items);
    }

    // create any missing result sets for today's lists
    async function createTodaysResults(tschedules, tresults) {
        // 1. loop through today's schedules
        let isFound = false;
        let createdResult = false;        

        for (let sidx=0; sidx<tschedules.length; sidx++) {            
            let tschedule = tschedules[sidx];
            // 2. loop through today's results
            isFound = false;
            for (let ridx=0; ridx<tresults.length; ridx++) {                
                let tresult = tresults[ridx];

                // 3. see if there is a result for today for this schedule
                if (tschedule.id === tresult.taskScheduleID) {
                    // found result
                    isFound = true;
                    break;
                }
            }

            // if there isn't a result for this schedule for today
            if (isFound === false) {
                // create the result and store it in the table
                await createResult(tschedule.taskListID, tschedule.id);
                createdResult = true;
            }

        }

        // return whether or not a result was created, used to trigger
        // wheter or not we need to refresh today's results list
        return (createdResult);
    }
    
    // get today's lists and load them into a state variable
    async function fetchTodaysLists() {

        let tschedules = await fetchTodaysSchedules();        

        let tresults = await fetchTodaysResults(tschedules);

        // Make sure that there is a result created for each of
        // today's scheduled lists
        let rval = await createTodaysResults(tschedules, tresults);
        
        // if there were any results created, need to refhresh today's
        // list of results
        if (rval === true) {
            tresults = await fetchTodaysResults(tschedules);
        }

        // set some extra properties on the results to help with rendering
        let now = format(new Date(), 'kk:mm:ss');
        console.log(now);
        for(let i=0; i<tresults.length; i++) {
            let tresult = tresults[i];
            if ((tresult.taskSchedule.starttime <= now) && (tresult.taskSchedule.stoptime > now)) {
                tresult.backgroundColor = '#eeffee';
            }
            else if (tresult.taskSchedule.stoptime < now) {
                tresult.backgroundColor = '#ffeeee';
            }
            else {
                tresult.backgroundColor = '#eeeeee';
            }
        }

        setTodaysResults(tresults);
    }

    // run a mutation to create a result for a list that is scheduled
    // today
    async function createResult(taskListID, taskScheduleID) {

        let today = format(new Date(), 'yyyy-MM-dd');

        let info = {
            created: today,            
            taskListID: taskListID,
            taskScheduleID: taskScheduleID
        };

        let q = {
            query: createTaskListResultMutation,
            variables: {input: info}
        };

        let rval = await API.graphql(q);
        console.log(rval);
    }

    // When a list is clicked go to the do list page
    

    // build up the view of today's active lists
    return (
        <>
        <Typography variant='h3'>Today's Lists</Typography>
        <List>
            {todaysResults.map(res => (
                <React.Fragment key={res.id}>
                    <Divider />
                    <ListItem disablePadding>
                        <ListItemButton 
                            sx={{bgcolor: res.backgroundColor}} 
                            component={RouterLink}
                            to={{pathname: '/dolist', value: {res}}}
                        >
                            <ListItemIcon><EditIcon /></ListItemIcon>
                            <ListItemText
                                primary={                                    
                                    <>
                                        <Grid container spacking={2}>
                                            <Grid item xs={12} sm={6}>{res.taskList.title}</Grid>
                                            <Grid item xs={6} sm={3}>{res.taskSchedule.starttime}</Grid>
                                            <Grid item xs={6} sm={3}>{res.taskSchedule.stoptime}</Grid>                                
                                        </Grid>            
                                    </>
                                }
                            />
                        </ListItemButton>
                    </ListItem>                    
                </React.Fragment>
            ))}
        </List>
        </>
    )
}

export default DisplayActiveLists

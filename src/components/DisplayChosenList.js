// ------------------------------------------------------------------------ //
import API from '@aws-amplify/api';
import { graphqlOperation } from '@aws-amplify/api-graphql';
import React, {useState, useEffect} from 'react';

import {useLocation} from 'react-router-dom';
import DoListResult from './DoListResult';

// ------------------------------------------------------------------------ //
const qGetTaskListResult = /* GraphQL */ `
  query GetTaskListResult($id: ID!) {
    getTaskListResult(id: $id) {
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
        taskSectionResults {
          items {
            id
            taskSectionID
            taskSection {
              id
              title 
              description 
              displayOrder 
            }
            taskItemResults {
              items {
                id
                result 
                note 
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
              }
            }
          }
        }
        createdAt
        updatedAt
      }
    }
  }
`;

// ------------------------------------------------------------------------ //
const qOnUpdateTaskItemResult = /* GraphQL */ `
  subscription OnUpdateTaskItemResult {
    onUpdateTaskItemResult {
      id
      result
      note
      timestamp
      updatedBy            
    }
  }
`;

// ------------------------------------------------------------------------ //



// ------------------------------------------------------------------------ //
const DisplayChosenList = () => {

    // state variables
    const [taskListResult, setTaskListResult] = useState(null);
    const [refreshInterval, setRefreshInterval] = useState(0);

    // access the location object to get the parameters passed in 
    // from the link button
    const location = useLocation();


    // -------------------------------------------------------------------- //
    // run when the componnent is instantiated
    useEffect(() => {
        console.log('DisplayChosenList.useEffect() >>');
        console.log(location.value);

        let tListResult = location.value.res;

        console.log(tListResult);

        // error checking here to make sure that location.value.res is
        // something useful. If it is not then return to the main page
        // and show and appropriate error message

        // set up an interval timer so that we can poll for updates
        // to the task list result
        ////const interval = setInterval(() => {
        ////    setRefreshInterval(refreshInterval => refreshInterval + 1);
        ////}, 1500);

        // set the task list result, program flow must get to this point
        // in order to render the list using the DoListResult component
        setTaskListResult(sortSectionsAndItems(tListResult));

        // clear the referesh interal on close
        ////return () => clearInterval(interval);
    }, [location.value]);

    // -------------------------------------------------------------------- //
    // sort the sections and items in the list
    function sortSectionsAndItems(tListResult) {

        // sort the sections and items in the list by their
        // display order. The are presented here as an array,
        // but the dynamodb table does not sort them in its current
        // configuration
        let tSectionResults = tListResult.taskSectionResults.items;
        tListResult.taskSectionResults.items = tSectionResults.sort(
            function(a, b) {
                return(
                    parseFloat(a.taskSection.displayOrder)-
                    parseFloat(b.taskSection.displayOrder)
                );
            }
        );
        tSectionResults = tListResult.taskSectionResults.items;

        // the sections are sorted, now sort the items in each section
        for (let sectionIdx=0; sectionIdx<tSectionResults.length; sectionIdx++) {
            let tSectionResult = tSectionResults[sectionIdx];

            let tItemResults = tSectionResult.taskItemResults.items;
            tSectionResult.taskItemResults.items = tItemResults.sort(
                function(a, b) {
                    return(
                        parseFloat(a.taskItem.displayOrder)-
                        parseFloat(b.taskItem.displayOrder)
                    );
                }
            );
            //tItemResults = tSectionResult.taskItemResults.items;
        }

        return (tListResult);
    }

    // -------------------------------------------------------------------- //
    // poll for updates to the component every couple seconds

    // -------------------------------------------------------------------- //
    // JSX component generation
    return (
        <>
            {taskListResult === null ? (
                <></>
            ) : (
                <DoListResult taskListResult={taskListResult} />
            )}
        </>        
    )
}

// ------------------------------------------------------------------------ //
export default DisplayChosenList;

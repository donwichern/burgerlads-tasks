// ------------------------------------------------------------------------ //
import API from '@aws-amplify/api';
import React, {useState, useEffect} from 'react';
import {format} from 'date-fns';
import {useLocation} from 'react-router-dom';
import DoListResult from './DoListResult';

// ------------------------------------------------------------------------ //

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
const DisplayChosenList = () => {

    // state variables
    const [taskListResult, setTaskListResult] = useState(null);

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

        // If the list result hasn't been started yet, give it a start timestamp
        if (tListResult.started === null) {
            (async () => {
                let datetime = new Date();
                let day = format(datetime, 'yyyy-MM-dd');
                let time = format(datetime, 'kk:mm:ss');
                let now = day + 'T' + time + '.0Z'; // not add UTC timezone offset
              
                let info = {
                    id : tListResult.id,
                    started : now
                };
                let q = {
                    query : qUpdateTaskListResult,
                    variables : {input : info}
                };
                const res = await API.graphql(q);
                console.log("DisplayChoseList >> Start List");
                console.log(res);
            })();
        }

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

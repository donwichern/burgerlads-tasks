import React from 'react'

import {useLocation} from 'react-router-dom';
// mutation to update results

// get a complete task list with it's result set
const qGetCompleteResult = /* GraphQL */ `
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
                taskSectionResults {
                    items {
                        id
                        taskSection {
                            id
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

            }
        }

    }
`;


// This component requires having a list with a valid result already created.
// then it creates the rest of the needed results to complete the list
const CompleteList = () => {   

    // this list will be able to get the result id from the location parameter
    // if the location parameter doesn't have a list, redirect to today's active
    // lists
    let location = useLocation();

    async function fetchCompleteResult(resultId) {

    }

    return (
        <div>
            
        </div>
    )
}

export default CompleteList

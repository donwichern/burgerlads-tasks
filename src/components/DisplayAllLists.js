import API from '@aws-amplify/api'
import React, {useState, useEffect} from 'react'
import DoList from './DoList';

// Query traversing enough levels to return complete task
const qGetAllTaskLists = `
    query ListTaskLists {
        listTaskLists {
            items {
                id
                title
                description
                taskSections {
                    items {
                        id
                        title
                        description
                        displayOrder
                        taskItems {
                            items {
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
`;

const DisplayAllLists = () => {

    const [taskLists, setTaskLists] = useState([]);

    // run when component is instantiated
    useEffect(() => {
        fetchTaskLists();
    }, []);

    async function fetchTaskLists() {
        const rval = await API.graphql({query: qGetAllTaskLists});

        //console.log(rval);
        let tLists = rval.data.listTaskLists.items;
        //console.log(tLists);

        for (let tlidx=0; tlidx<tLists.length; tlidx++) {
            let tList = tLists[tlidx];
            //console.log(tList.title);
            //console.log(tList.description);
            
            let tSections = tList.taskSections.items;            
            tList.taskSections.items = tSections.sort(
                function(a, b) {
                    return(parseFloat(a.displayOrder)-parseFloat(b.displayOrder));
                }
            );
            tSections = tList.taskSections.items;

            for (let tsidx=0; tsidx<tSections.length; tsidx++) {
                let tSection = tSections[tsidx];
                //console.log(tSection.title);

                let tItems = tSection.taskItems.items;
                tSection.taskItems.items = tItems.sort(
                    function(a, b) {
                        return(parseFloat(a.displayOrder)-parseFloat(b.displayOrder));
                    }
                )
                tItems = tSection.taskItems.items;

                for (let tiidx=0; tiidx<tItems.length; tiidx++) {
                    let tItem = tItems[tiidx];
                    //console.log(tItem.displayOrder, tItem.name);
                }
            }
        }

        setTaskLists(tLists);
    }

    return (
        <div>
            <br />
            {taskLists.map(taskList => (
                <React.Fragment key = {taskList.id}>
                    <DoList taskList={taskList} />
                </React.Fragment>
            ))}
        </div>
    )
}

export default DisplayAllLists

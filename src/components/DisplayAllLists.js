import API from '@aws-amplify/api'
import React, {useState, useEffect} from 'react'

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

        console.log(rval);
        let tasklists = rval.data.listTaskLists.items;
        console.log(tasklists);

        for (let tlidx=0; tlidx<tasklists.length; tlidx++) {
            let tasklist = tasklists[tlidx];
            console.log(tasklist.title);
            console.log(tasklist.description);

            let tasksections = tasklist.tasksections.items;
            tasklist.tasksections.items = tasksections.sort(
                function(a, b) {
                    return(parseFloat(a.displayOrder)-parseFloat(b.displayOrder));
                }
            );
            tasksections = tasklist.tasksections.items;

            for (let tsidx=0; tsidx<tasksections.length; tsidx++) {
                let tasksection = tasksections[tsidx];
                console.log(tasksection.title);

                let taskitems = tasksection.taskitems.items;
                tasksection.taskitems.items = taskitems.sort(
                    function(a, b) {
                        return(parseFloat(a.displayOrder)-parseFloat(b.displayOrder));
                    }
                )
                taskitems = tasksection.taskitems.items;

                for (let tiidx=0; tiidx<taskitems.length; tiidx++) {
                    let taskitem = taskitems[tiidx];
                    console.log(taskitem.displayOrder, taskitem.name);
                }
            }
        }

        setTaskLists(tasklists);
    }

    return (
        <div>
            
        </div>
    )
}

export default DisplayAllLists

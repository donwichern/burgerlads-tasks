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

import React from 'react'



const DisplayActiveLists = () => {
    return (
        <div>
            
        </div>
    )
}

export default DisplayActiveLists

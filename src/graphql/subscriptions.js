/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateTaskList = /* GraphQL */ `
  subscription OnCreateTaskList {
    onCreateTaskList {
      id
      title
      description
      taskSections {
        items {
          id
          title
          description
          displayOrder
          taskListID
          createdAt
          updatedAt
        }
        nextToken
      }
      taskSchedules {
        items {
          id
          startdate
          stopdate
          starttime
          stoptime
          taskListID
          createdAt
          updatedAt
        }
        nextToken
      }
      taskListResults {
        items {
          id
          created
          started
          completed
          taskListID
          taskScheduleID
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateTaskList = /* GraphQL */ `
  subscription OnUpdateTaskList {
    onUpdateTaskList {
      id
      title
      description
      taskSections {
        items {
          id
          title
          description
          displayOrder
          taskListID
          createdAt
          updatedAt
        }
        nextToken
      }
      taskSchedules {
        items {
          id
          startdate
          stopdate
          starttime
          stoptime
          taskListID
          createdAt
          updatedAt
        }
        nextToken
      }
      taskListResults {
        items {
          id
          created
          started
          completed
          taskListID
          taskScheduleID
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteTaskList = /* GraphQL */ `
  subscription OnDeleteTaskList {
    onDeleteTaskList {
      id
      title
      description
      taskSections {
        items {
          id
          title
          description
          displayOrder
          taskListID
          createdAt
          updatedAt
        }
        nextToken
      }
      taskSchedules {
        items {
          id
          startdate
          stopdate
          starttime
          stoptime
          taskListID
          createdAt
          updatedAt
        }
        nextToken
      }
      taskListResults {
        items {
          id
          created
          started
          completed
          taskListID
          taskScheduleID
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onCreateTaskSection = /* GraphQL */ `
  subscription OnCreateTaskSection {
    onCreateTaskSection {
      id
      title
      description
      displayOrder
      taskListID
      taskList {
        id
        title
        description
        taskSections {
          nextToken
        }
        taskSchedules {
          nextToken
        }
        taskListResults {
          nextToken
        }
        createdAt
        updatedAt
      }
      taskItems {
        items {
          id
          name
          description
          displayOrder
          resultType
          taskSectionID
          createdAt
          updatedAt
        }
        nextToken
      }
      taskSectionResults {
        items {
          id
          taskListResultID
          taskSectionID
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateTaskSection = /* GraphQL */ `
  subscription OnUpdateTaskSection {
    onUpdateTaskSection {
      id
      title
      description
      displayOrder
      taskListID
      taskList {
        id
        title
        description
        taskSections {
          nextToken
        }
        taskSchedules {
          nextToken
        }
        taskListResults {
          nextToken
        }
        createdAt
        updatedAt
      }
      taskItems {
        items {
          id
          name
          description
          displayOrder
          resultType
          taskSectionID
          createdAt
          updatedAt
        }
        nextToken
      }
      taskSectionResults {
        items {
          id
          taskListResultID
          taskSectionID
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteTaskSection = /* GraphQL */ `
  subscription OnDeleteTaskSection {
    onDeleteTaskSection {
      id
      title
      description
      displayOrder
      taskListID
      taskList {
        id
        title
        description
        taskSections {
          nextToken
        }
        taskSchedules {
          nextToken
        }
        taskListResults {
          nextToken
        }
        createdAt
        updatedAt
      }
      taskItems {
        items {
          id
          name
          description
          displayOrder
          resultType
          taskSectionID
          createdAt
          updatedAt
        }
        nextToken
      }
      taskSectionResults {
        items {
          id
          taskListResultID
          taskSectionID
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onCreateTaskItem = /* GraphQL */ `
  subscription OnCreateTaskItem {
    onCreateTaskItem {
      id
      name
      description
      displayOrder
      resultType
      taskSectionID
      taskSection {
        id
        title
        description
        displayOrder
        taskListID
        taskList {
          id
          title
          description
          createdAt
          updatedAt
        }
        taskItems {
          nextToken
        }
        taskSectionResults {
          nextToken
        }
        createdAt
        updatedAt
      }
      taskItemResults {
        items {
          id
          result
          note
          timestamp
          updatedBy
          taskSectionResultID
          taskItemID
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateTaskItem = /* GraphQL */ `
  subscription OnUpdateTaskItem {
    onUpdateTaskItem {
      id
      name
      description
      displayOrder
      resultType
      taskSectionID
      taskSection {
        id
        title
        description
        displayOrder
        taskListID
        taskList {
          id
          title
          description
          createdAt
          updatedAt
        }
        taskItems {
          nextToken
        }
        taskSectionResults {
          nextToken
        }
        createdAt
        updatedAt
      }
      taskItemResults {
        items {
          id
          result
          note
          timestamp
          updatedBy
          taskSectionResultID
          taskItemID
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteTaskItem = /* GraphQL */ `
  subscription OnDeleteTaskItem {
    onDeleteTaskItem {
      id
      name
      description
      displayOrder
      resultType
      taskSectionID
      taskSection {
        id
        title
        description
        displayOrder
        taskListID
        taskList {
          id
          title
          description
          createdAt
          updatedAt
        }
        taskItems {
          nextToken
        }
        taskSectionResults {
          nextToken
        }
        createdAt
        updatedAt
      }
      taskItemResults {
        items {
          id
          result
          note
          timestamp
          updatedBy
          taskSectionResultID
          taskItemID
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onCreateTaskListResult = /* GraphQL */ `
  subscription OnCreateTaskListResult {
    onCreateTaskListResult {
      id
      created
      started
      completed
      taskListID
      taskList {
        id
        title
        description
        taskSections {
          nextToken
        }
        taskSchedules {
          nextToken
        }
        taskListResults {
          nextToken
        }
        createdAt
        updatedAt
      }
      taskScheduleID
      taskSchedule {
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
        taskListResults {
          nextToken
        }
        createdAt
        updatedAt
      }
      taskSectionResults {
        items {
          id
          taskListResultID
          taskSectionID
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateTaskListResult = /* GraphQL */ `
  subscription OnUpdateTaskListResult {
    onUpdateTaskListResult {
      id
      created
      started
      completed
      taskListID
      taskList {
        id
        title
        description
        taskSections {
          nextToken
        }
        taskSchedules {
          nextToken
        }
        taskListResults {
          nextToken
        }
        createdAt
        updatedAt
      }
      taskScheduleID
      taskSchedule {
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
        taskListResults {
          nextToken
        }
        createdAt
        updatedAt
      }
      taskSectionResults {
        items {
          id
          taskListResultID
          taskSectionID
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteTaskListResult = /* GraphQL */ `
  subscription OnDeleteTaskListResult {
    onDeleteTaskListResult {
      id
      created
      started
      completed
      taskListID
      taskList {
        id
        title
        description
        taskSections {
          nextToken
        }
        taskSchedules {
          nextToken
        }
        taskListResults {
          nextToken
        }
        createdAt
        updatedAt
      }
      taskScheduleID
      taskSchedule {
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
        taskListResults {
          nextToken
        }
        createdAt
        updatedAt
      }
      taskSectionResults {
        items {
          id
          taskListResultID
          taskSectionID
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onCreateTaskSectionResult = /* GraphQL */ `
  subscription OnCreateTaskSectionResult {
    onCreateTaskSectionResult {
      id
      taskListResultID
      taskListResult {
        id
        created
        started
        completed
        taskListID
        taskList {
          id
          title
          description
          createdAt
          updatedAt
        }
        taskScheduleID
        taskSchedule {
          id
          startdate
          stopdate
          starttime
          stoptime
          taskListID
          createdAt
          updatedAt
        }
        taskSectionResults {
          nextToken
        }
        createdAt
        updatedAt
      }
      taskSectionID
      taskSection {
        id
        title
        description
        displayOrder
        taskListID
        taskList {
          id
          title
          description
          createdAt
          updatedAt
        }
        taskItems {
          nextToken
        }
        taskSectionResults {
          nextToken
        }
        createdAt
        updatedAt
      }
      taskItemResults {
        items {
          id
          result
          note
          timestamp
          updatedBy
          taskSectionResultID
          taskItemID
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateTaskSectionResult = /* GraphQL */ `
  subscription OnUpdateTaskSectionResult {
    onUpdateTaskSectionResult {
      id
      taskListResultID
      taskListResult {
        id
        created
        started
        completed
        taskListID
        taskList {
          id
          title
          description
          createdAt
          updatedAt
        }
        taskScheduleID
        taskSchedule {
          id
          startdate
          stopdate
          starttime
          stoptime
          taskListID
          createdAt
          updatedAt
        }
        taskSectionResults {
          nextToken
        }
        createdAt
        updatedAt
      }
      taskSectionID
      taskSection {
        id
        title
        description
        displayOrder
        taskListID
        taskList {
          id
          title
          description
          createdAt
          updatedAt
        }
        taskItems {
          nextToken
        }
        taskSectionResults {
          nextToken
        }
        createdAt
        updatedAt
      }
      taskItemResults {
        items {
          id
          result
          note
          timestamp
          updatedBy
          taskSectionResultID
          taskItemID
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteTaskSectionResult = /* GraphQL */ `
  subscription OnDeleteTaskSectionResult {
    onDeleteTaskSectionResult {
      id
      taskListResultID
      taskListResult {
        id
        created
        started
        completed
        taskListID
        taskList {
          id
          title
          description
          createdAt
          updatedAt
        }
        taskScheduleID
        taskSchedule {
          id
          startdate
          stopdate
          starttime
          stoptime
          taskListID
          createdAt
          updatedAt
        }
        taskSectionResults {
          nextToken
        }
        createdAt
        updatedAt
      }
      taskSectionID
      taskSection {
        id
        title
        description
        displayOrder
        taskListID
        taskList {
          id
          title
          description
          createdAt
          updatedAt
        }
        taskItems {
          nextToken
        }
        taskSectionResults {
          nextToken
        }
        createdAt
        updatedAt
      }
      taskItemResults {
        items {
          id
          result
          note
          timestamp
          updatedBy
          taskSectionResultID
          taskItemID
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onCreateTaskItemResult = /* GraphQL */ `
  subscription OnCreateTaskItemResult {
    onCreateTaskItemResult {
      id
      result
      note
      timestamp
      updatedBy
      taskSectionResultID
      taskSectionResult {
        id
        taskListResultID
        taskListResult {
          id
          created
          started
          completed
          taskListID
          taskScheduleID
          createdAt
          updatedAt
        }
        taskSectionID
        taskSection {
          id
          title
          description
          displayOrder
          taskListID
          createdAt
          updatedAt
        }
        taskItemResults {
          nextToken
        }
        createdAt
        updatedAt
      }
      taskItemID
      taskItem {
        id
        name
        description
        displayOrder
        resultType
        taskSectionID
        taskSection {
          id
          title
          description
          displayOrder
          taskListID
          createdAt
          updatedAt
        }
        taskItemResults {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateTaskItemResult = /* GraphQL */ `
  subscription OnUpdateTaskItemResult {
    onUpdateTaskItemResult {
      id
      result
      note
      timestamp
      updatedBy
      taskSectionResultID
      taskSectionResult {
        id
        taskListResultID
        taskListResult {
          id
          created
          started
          completed
          taskListID
          taskScheduleID
          createdAt
          updatedAt
        }
        taskSectionID
        taskSection {
          id
          title
          description
          displayOrder
          taskListID
          createdAt
          updatedAt
        }
        taskItemResults {
          nextToken
        }
        createdAt
        updatedAt
      }
      taskItemID
      taskItem {
        id
        name
        description
        displayOrder
        resultType
        taskSectionID
        taskSection {
          id
          title
          description
          displayOrder
          taskListID
          createdAt
          updatedAt
        }
        taskItemResults {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteTaskItemResult = /* GraphQL */ `
  subscription OnDeleteTaskItemResult {
    onDeleteTaskItemResult {
      id
      result
      note
      timestamp
      updatedBy
      taskSectionResultID
      taskSectionResult {
        id
        taskListResultID
        taskListResult {
          id
          created
          started
          completed
          taskListID
          taskScheduleID
          createdAt
          updatedAt
        }
        taskSectionID
        taskSection {
          id
          title
          description
          displayOrder
          taskListID
          createdAt
          updatedAt
        }
        taskItemResults {
          nextToken
        }
        createdAt
        updatedAt
      }
      taskItemID
      taskItem {
        id
        name
        description
        displayOrder
        resultType
        taskSectionID
        taskSection {
          id
          title
          description
          displayOrder
          taskListID
          createdAt
          updatedAt
        }
        taskItemResults {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onCreateTaskSchedule = /* GraphQL */ `
  subscription OnCreateTaskSchedule {
    onCreateTaskSchedule {
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
        taskSections {
          nextToken
        }
        taskSchedules {
          nextToken
        }
        taskListResults {
          nextToken
        }
        createdAt
        updatedAt
      }
      taskListResults {
        items {
          id
          created
          started
          completed
          taskListID
          taskScheduleID
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateTaskSchedule = /* GraphQL */ `
  subscription OnUpdateTaskSchedule {
    onUpdateTaskSchedule {
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
        taskSections {
          nextToken
        }
        taskSchedules {
          nextToken
        }
        taskListResults {
          nextToken
        }
        createdAt
        updatedAt
      }
      taskListResults {
        items {
          id
          created
          started
          completed
          taskListID
          taskScheduleID
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteTaskSchedule = /* GraphQL */ `
  subscription OnDeleteTaskSchedule {
    onDeleteTaskSchedule {
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
        taskSections {
          nextToken
        }
        taskSchedules {
          nextToken
        }
        taskListResults {
          nextToken
        }
        createdAt
        updatedAt
      }
      taskListResults {
        items {
          id
          created
          started
          completed
          taskListID
          taskScheduleID
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;

/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getTaskList = /* GraphQL */ `
  query GetTaskList($id: ID!) {
    getTaskList(id: $id) {
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
export const listTaskLists = /* GraphQL */ `
  query ListTaskLists(
    $filter: ModelTaskListFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTaskLists(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getTaskSection = /* GraphQL */ `
  query GetTaskSection($id: ID!) {
    getTaskSection(id: $id) {
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
export const listTaskSections = /* GraphQL */ `
  query ListTaskSections(
    $filter: ModelTaskSectionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTaskSections(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getTaskItem = /* GraphQL */ `
  query GetTaskItem($id: ID!) {
    getTaskItem(id: $id) {
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
export const listTaskItems = /* GraphQL */ `
  query ListTaskItems(
    $filter: ModelTaskItemFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTaskItems(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getTaskListResult = /* GraphQL */ `
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
export const listTaskListResults = /* GraphQL */ `
  query ListTaskListResults(
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
      nextToken
    }
  }
`;
export const getTaskSectionResult = /* GraphQL */ `
  query GetTaskSectionResult($id: ID!) {
    getTaskSectionResult(id: $id) {
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
export const listTaskSectionResults = /* GraphQL */ `
  query ListTaskSectionResults(
    $filter: ModelTaskSectionResultFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTaskSectionResults(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const getTaskItemResult = /* GraphQL */ `
  query GetTaskItemResult($id: ID!) {
    getTaskItemResult(id: $id) {
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
export const listTaskItemResults = /* GraphQL */ `
  query ListTaskItemResults(
    $filter: ModelTaskItemResultFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTaskItemResults(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        result
        note
        timestamp
        updatedBy
        taskSectionResultID
        taskSectionResult {
          id
          taskListResultID
          taskSectionID
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
export const getTaskSchedule = /* GraphQL */ `
  query GetTaskSchedule($id: ID!) {
    getTaskSchedule(id: $id) {
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
export const listTaskSchedules = /* GraphQL */ `
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
        taskListResults {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;

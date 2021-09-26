/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createTaskList = /* GraphQL */ `
  mutation CreateTaskList(
    $input: CreateTaskListInput!
    $condition: ModelTaskListConditionInput
  ) {
    createTaskList(input: $input, condition: $condition) {
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
          started
          completed
          taskListID
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
export const updateTaskList = /* GraphQL */ `
  mutation UpdateTaskList(
    $input: UpdateTaskListInput!
    $condition: ModelTaskListConditionInput
  ) {
    updateTaskList(input: $input, condition: $condition) {
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
          started
          completed
          taskListID
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
export const deleteTaskList = /* GraphQL */ `
  mutation DeleteTaskList(
    $input: DeleteTaskListInput!
    $condition: ModelTaskListConditionInput
  ) {
    deleteTaskList(input: $input, condition: $condition) {
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
          started
          completed
          taskListID
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
export const createTaskSection = /* GraphQL */ `
  mutation CreateTaskSection(
    $input: CreateTaskSectionInput!
    $condition: ModelTaskSectionConditionInput
  ) {
    createTaskSection(input: $input, condition: $condition) {
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
export const updateTaskSection = /* GraphQL */ `
  mutation UpdateTaskSection(
    $input: UpdateTaskSectionInput!
    $condition: ModelTaskSectionConditionInput
  ) {
    updateTaskSection(input: $input, condition: $condition) {
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
export const deleteTaskSection = /* GraphQL */ `
  mutation DeleteTaskSection(
    $input: DeleteTaskSectionInput!
    $condition: ModelTaskSectionConditionInput
  ) {
    deleteTaskSection(input: $input, condition: $condition) {
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
export const createTaskItem = /* GraphQL */ `
  mutation CreateTaskItem(
    $input: CreateTaskItemInput!
    $condition: ModelTaskItemConditionInput
  ) {
    createTaskItem(input: $input, condition: $condition) {
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
export const updateTaskItem = /* GraphQL */ `
  mutation UpdateTaskItem(
    $input: UpdateTaskItemInput!
    $condition: ModelTaskItemConditionInput
  ) {
    updateTaskItem(input: $input, condition: $condition) {
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
export const deleteTaskItem = /* GraphQL */ `
  mutation DeleteTaskItem(
    $input: DeleteTaskItemInput!
    $condition: ModelTaskItemConditionInput
  ) {
    deleteTaskItem(input: $input, condition: $condition) {
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
export const createTaskListResult = /* GraphQL */ `
  mutation CreateTaskListResult(
    $input: CreateTaskListResultInput!
    $condition: ModelTaskListResultConditionInput
  ) {
    createTaskListResult(input: $input, condition: $condition) {
      id
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
export const updateTaskListResult = /* GraphQL */ `
  mutation UpdateTaskListResult(
    $input: UpdateTaskListResultInput!
    $condition: ModelTaskListResultConditionInput
  ) {
    updateTaskListResult(input: $input, condition: $condition) {
      id
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
export const deleteTaskListResult = /* GraphQL */ `
  mutation DeleteTaskListResult(
    $input: DeleteTaskListResultInput!
    $condition: ModelTaskListResultConditionInput
  ) {
    deleteTaskListResult(input: $input, condition: $condition) {
      id
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
export const createTaskSectionResult = /* GraphQL */ `
  mutation CreateTaskSectionResult(
    $input: CreateTaskSectionResultInput!
    $condition: ModelTaskSectionResultConditionInput
  ) {
    createTaskSectionResult(input: $input, condition: $condition) {
      id
      taskListResultID
      taskListResult {
        id
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
export const updateTaskSectionResult = /* GraphQL */ `
  mutation UpdateTaskSectionResult(
    $input: UpdateTaskSectionResultInput!
    $condition: ModelTaskSectionResultConditionInput
  ) {
    updateTaskSectionResult(input: $input, condition: $condition) {
      id
      taskListResultID
      taskListResult {
        id
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
export const deleteTaskSectionResult = /* GraphQL */ `
  mutation DeleteTaskSectionResult(
    $input: DeleteTaskSectionResultInput!
    $condition: ModelTaskSectionResultConditionInput
  ) {
    deleteTaskSectionResult(input: $input, condition: $condition) {
      id
      taskListResultID
      taskListResult {
        id
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
export const createTaskItemResult = /* GraphQL */ `
  mutation CreateTaskItemResult(
    $input: CreateTaskItemResultInput!
    $condition: ModelTaskItemResultConditionInput
  ) {
    createTaskItemResult(input: $input, condition: $condition) {
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
          started
          completed
          taskListID
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
export const updateTaskItemResult = /* GraphQL */ `
  mutation UpdateTaskItemResult(
    $input: UpdateTaskItemResultInput!
    $condition: ModelTaskItemResultConditionInput
  ) {
    updateTaskItemResult(input: $input, condition: $condition) {
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
          started
          completed
          taskListID
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
export const deleteTaskItemResult = /* GraphQL */ `
  mutation DeleteTaskItemResult(
    $input: DeleteTaskItemResultInput!
    $condition: ModelTaskItemResultConditionInput
  ) {
    deleteTaskItemResult(input: $input, condition: $condition) {
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
          started
          completed
          taskListID
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
export const createTaskSchedule = /* GraphQL */ `
  mutation CreateTaskSchedule(
    $input: CreateTaskScheduleInput!
    $condition: ModelTaskScheduleConditionInput
  ) {
    createTaskSchedule(input: $input, condition: $condition) {
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
      createdAt
      updatedAt
    }
  }
`;
export const updateTaskSchedule = /* GraphQL */ `
  mutation UpdateTaskSchedule(
    $input: UpdateTaskScheduleInput!
    $condition: ModelTaskScheduleConditionInput
  ) {
    updateTaskSchedule(input: $input, condition: $condition) {
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
      createdAt
      updatedAt
    }
  }
`;
export const deleteTaskSchedule = /* GraphQL */ `
  mutation DeleteTaskSchedule(
    $input: DeleteTaskScheduleInput!
    $condition: ModelTaskScheduleConditionInput
  ) {
    deleteTaskSchedule(input: $input, condition: $condition) {
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
      createdAt
      updatedAt
    }
  }
`;

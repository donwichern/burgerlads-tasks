import React from 'react'
import { AmplifySignOut, withAuthenticator } from '@aws-amplify/ui-react';

import DisplayAllLists from './components/DisplayAllLists';
import UploadListFromFile from './components/UploadListFromFile';
import ScheduleTaskList from './components/ScheduleTaskList';
import { LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { Container, CssBaseline } from '@mui/material';

const App = () => {
  return (
    <>
    <CssBaseline />
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Container maxWidth="lg">

        <br />
        <UploadListFromFile />
        <br />
        <DisplayAllLists />
        <br />
        <ScheduleTaskList />

        <AmplifySignOut />
      </Container>
    </LocalizationProvider>
    </>
  )
}

export default withAuthenticator(App);

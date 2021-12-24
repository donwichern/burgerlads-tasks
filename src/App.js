import React from 'react'
import { AmplifySignOut, withAuthenticator } from '@aws-amplify/ui-react';

import DisplayChosenList from './components/DisplayChosenList';
import UploadListFromFile from './components/UploadListFromFile';
import ScheduleTaskList from './components/ScheduleTaskList';
import { LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { Container, CssBaseline } from '@mui/material';
import DisplayActiveLists from './components/DisplayActiveLists';
import DisplayAllLists from './components/DisplayAllLists';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <CssBaseline />
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Container maxWidth="lg">
          <br />
          <Switch>
            <Route path='/schedule'>
              <ScheduleTaskList />
            </Route>
            <Route path='/upload'>
              <UploadListFromFile />
            </Route>
            <Route path='/dolist'>
              <DisplayChosenList />
            </Route>
            <Route path='/displayall'>
              <DisplayAllLists />
            </Route>
            <Route path='/'>
              <DisplayActiveLists />
            </Route>
          </Switch>
          <AmplifySignOut />
        </Container>
        <br />
      </LocalizationProvider>
    </Router>
  )
}

export default withAuthenticator(App);

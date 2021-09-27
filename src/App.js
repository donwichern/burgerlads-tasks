import React from 'react'
import { AmplifySignOut, withAuthenticator } from '@aws-amplify/ui-react';
import { Container, createTheme, CssBaseline, ThemeProvider } from '@material-ui/core';
import DisplayAllLists from './components/DisplayAllLists';
import UploadListFromFile from './components/UploadListFromFile';

const muiTheme = createTheme();

const App = () => {
  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />

      <Container maxWidth="lg">

        <UploadListFromFile />
        <DisplayAllLists />

        <AmplifySignOut />
      </Container>
    </ThemeProvider>
  )
}

export default withAuthenticator(App);

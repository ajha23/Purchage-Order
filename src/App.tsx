import React from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider, createTheme, CssBaseline, Container, AppBar, Toolbar, Typography } from '@mui/material';
import store from './store';
import PurchaseOrderList from './components/PurchaseOrderList';

// Create a theme instance
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6">
              Purchase Order Management
            </Typography>
          </Toolbar>
        </AppBar>
        <Container maxWidth="lg" sx={{ mt: 4 }}>
          <PurchaseOrderList />
        </Container>
      </ThemeProvider>
    </Provider>
  );
}

export default App; 
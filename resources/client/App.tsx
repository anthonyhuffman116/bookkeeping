import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Dashboard from './components/Dashboard';
import Box from '@mui/material/Box';
import {
  AppBar,
  Container,
  createTheme,
  IconButton,
  ThemeProvider,
  Toolbar,
  Typography,
  useMediaQuery,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { LocalizationProvider } from '@mui/lab';
import enLocale from 'date-fns/locale/en-GB';
import AdapterDateFns from '@mui/lab/AdapterDateFns';

export default function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDateFns} locale={enLocale}>
        <CssBaseline />

        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                bookkeeping
              </Typography>
            </Toolbar>
          </AppBar>
        </Box>

        <Container maxWidth="xl">
          <Dashboard />
        </Container>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

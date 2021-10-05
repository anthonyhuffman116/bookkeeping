import React, { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Dashboard from './components/Dashboard';
import Box from '@mui/material/Box';
import {
  AppBar,
  Container,
  createTheme,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ThemeProvider,
  Toolbar,
  Typography,
  useMediaQuery,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { LocalizationProvider } from '@mui/lab';
import enLocale from 'date-fns/locale/en-GB';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

export default function App() {
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
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
        <Router>
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
                  onClick={() => setDrawerOpen(!drawerOpen)}
                >
                  <MenuIcon />

                  <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
                    <List>
                      <ListItem button>
                        <ListItemIcon>
                          <InboxIcon />
                        </ListItemIcon>
                        <ListItemText primary="Dashboard" />
                      </ListItem>
                    </List>
                  </Drawer>
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  bookkeeping
                </Typography>
              </Toolbar>
            </AppBar>
          </Box>

          <Container maxWidth="xl">
            <Switch>
              <Route path="/">
                <Dashboard />
              </Route>
            </Switch>
          </Container>
        </Router>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

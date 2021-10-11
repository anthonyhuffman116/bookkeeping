import React, { useEffect, useState } from 'react';
import 'regenerator-runtime/runtime.js';
import CssBaseline from '@mui/material/CssBaseline';
import DashboardPage from './components/pages/DashboardPage';
import CategoriesPage from './components/pages/CategoriesPage';
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
import CategoryIcon from '@mui/icons-material/Category';
import PaymentsIcon from '@mui/icons-material/Euro';
import { HashRouter as Router, Link, Route, Switch } from 'react-router-dom';
import PaymentsPage from './components/pages/PaymentsPage';
import AuthPage from './components/pages/AuthPage';
import LoggedInUser from './components/molecules/LoggedInUser';
import { supabase } from './lib/supabase';
import { User } from '@supabase/supabase-js';

function ListItemLink(props) {
  const { icon, primary, to } = props;

  const CustomLink = (props) => <Link to={to} {...props} />;

  return (
    <li>
      <ListItem button component={CustomLink}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={primary} />
      </ListItem>
    </li>
  );
}

export default function App() {
  const [user, setUser] = useState<null | User>(null);
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  useEffect(() => {
    const session = supabase.auth.session();
    setUser(session?.user ?? null);

    console.log(session?.user);

    const { data: authListener } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      authListener?.unsubscribe();
    };
  }, []);

  const handleLogout = () => {
    supabase.auth.signOut().catch(console.error);
  };

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

        {!user ? (
          <AuthPage supabase={supabase} />
        ) : (
          <Router>
            <Box sx={{ flexGrow: 1 }}>
              <AppBar position="fixed">
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
                        <ListItemLink to="/" icon={<InboxIcon />} primary="Dashboard" />
                        <ListItemLink to="/payments" icon={<PaymentsIcon />} primary="Payments" />
                        <ListItemLink
                          to="/categories"
                          icon={<CategoryIcon />}
                          primary="Categories"
                        />
                      </List>
                    </Drawer>
                  </IconButton>
                  <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    bookkeeping
                  </Typography>
                  <LoggedInUser user={user} onLogout={handleLogout} />
                </Toolbar>
              </AppBar>
            </Box>

            <Container maxWidth="xl">
              <Switch>
                <Route path="/payments">
                  <PaymentsPage />
                </Route>
                <Route path="/categories">
                  <CategoriesPage />
                </Route>
                <Route path="/">
                  <DashboardPage />
                </Route>
              </Switch>
            </Container>
          </Router>
        )}
      </LocalizationProvider>
    </ThemeProvider>
  );
}

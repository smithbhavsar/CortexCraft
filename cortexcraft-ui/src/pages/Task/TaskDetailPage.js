import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Box, Typography, Button, Grid, Paper } from '@mui/material';
import { alpha } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Stack from '@mui/material/Stack';
import AppNavbar from './components/AppNavbar';
import Header from './components/Header';
import TaskGrid from './components/TaskGrid';
import SideMenu from './components/SideMenu';
import AppTheme from '../shared-theme/AppTheme';
import {
  chartsCustomizations,
  dataGridCustomizations,
  datePickersCustomizations,
  treeViewCustomizations,
} from './theme/customizations';

const xThemeComponents = {
  ...chartsCustomizations,
  ...dataGridCustomizations,
  ...datePickersCustomizations,
  ...treeViewCustomizations,
};

const TaskDetailPage = (props) => {
  const { taskId } = useParams(); // Get the taskId from the URL
  const [task, setTask] = useState(null); // State to hold task details
  const [loading, setLoading] = useState(true); // State to handle loading indicator
  const [error, setError] = useState(null); // State to handle errors
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch task details using the taskId from the URL
    fetch(`http://localhost:8000/api/planning/tasks/${taskId}`)
      .then((response) => response.json())
      .then((data) => {
        setTask(data); // Set task data in state
        setLoading(false); // Hide loading spinner
      })
      .catch((err) => {
        console.error('Error fetching task details:', err);
        setError('Failed to fetch task details');
        setLoading(false);
      });
  }, [taskId]); // The useEffect will run again if taskId changes

  if (loading) return <div>Loading...</div>; // Loading indicator
  if (error) return <div>{error}</div>; // Error handling

  return (
    <AppTheme {...props} themeComponents={xThemeComponents}>
      <CssBaseline enableColorScheme />
      <Box sx={{ display: 'flex' }}>
        <SideMenu />
        <AppNavbar />
        {/* Main content */}
        <Box
          component="main"
          sx={(theme) => ({
            flexGrow: 1,
            backgroundColor: theme.vars
              ? `rgba(${theme.vars.palette.background.defaultChannel} / 1)`
              : alpha(theme.palette.background.default, 1),
            overflow: 'auto',
          })}
        >
          <Stack
            spacing={2}
            sx={{
              alignItems: 'center',
              mx: 3,
              pb: 5,
              mt: { xs: 8, md: 0 },
            }}
          >
            <Header />
            <Container>
                <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
                    {task && (
                        <Grid item xs={12} sm={6}>
                            <Paper sx={{ padding: 3 }}>
                            <Typography variant="h4" gutterBottom>
                                {task.task_name}
                            </Typography>
                            <Typography variant="h6" color="textSecondary" gutterBottom>
                                Description:
                            </Typography>
                            <Typography variant="body1" paragraph>
                                {task.description}
                            </Typography>

                            <Typography variant="h6" color="textSecondary" gutterBottom>
                                Assignee:
                            </Typography>
                            <Typography variant="body1" paragraph>
                                {task.assignee}
                            </Typography>

                            <Typography variant="h6" color="textSecondary" gutterBottom>
                                Timeline:
                            </Typography>
                            <Typography variant="body1" paragraph>
                                {task.timeline}
                            </Typography>
                            </Paper>
                        </Grid>
                    )}
                </Box>
            </Container>
          </Stack>
        </Box>
      </Box>
    </AppTheme>
  );
}

export default TaskDetailPage;

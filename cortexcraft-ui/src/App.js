import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CssBaseline, Box } from '@mui/material';
import Dashboard from './pages/Dashboard/Dashboard';
import Task from './pages/Task/Task'
import TaskDetailPage from './pages/Task/TaskDetailPage'
import RequirementsPage from './pages/RequirementsPage';

const App = () => {
  return (
    <Router>
      <CssBaseline />
      <Box sx={{ display: 'flex' }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/tasks" element={<Task />} />
            <Route path="/requirements" element={<RequirementsPage />} />
            <Route path="/tasks/:taskId" element={<TaskDetailPage />} />
          </Routes>
        </Box>
    </Router>
  );
};

export default App;

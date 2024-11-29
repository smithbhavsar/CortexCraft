import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CssBaseline, Box } from '@mui/material';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import TasksPage from './pages/TasksPage';
import RequirementsPage from './pages/RequirementsPage';

const App = () => {
  return (
    <Router>
      <CssBaseline />
      <Box sx={{ display: 'flex' }}>
        {/* Sidebar Component */}
        <Sidebar />
        
        {/* Main Content */}
        <Box 
          component="main" 
          sx={{ 
            flexGrow: 1, 
            bgcolor: '#f5f5f5', 
            padding: '20px', 
            marginLeft: '250px', // to offset the sidebar width
            transition: 'margin-left 0.3s' 
          }}
        >
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/tasks" element={<TasksPage />} />
            <Route path="/requirements" element={<RequirementsPage />} />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
};

export default App;

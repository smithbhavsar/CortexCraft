import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CssBaseline, Box } from '@mui/material';
import Dashboard from './pages/Dashboard/Dashboard';
import RequirementsPage from './pages/RequirementsPage';

const App = () => {
  return (
    <Router>
      <CssBaseline />
      <Box sx={{ display: 'flex' }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            {/* <Route path="/tasks" element={<Tasks />} /> */}
            <Route path="/requirements" element={<RequirementsPage />} />
          </Routes>
        </Box>
    </Router>
  );
};

export default App;

import React, { useState } from 'react';
import { Box, Drawer, List, ListItem, ListItemText, IconButton, AppBar, Toolbar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';

const Sidebar = () => {
  const [open, setOpen] = useState(false);

  const handleDrawerToggle = () => setOpen(!open);

  return (
    <>
      {/* Top AppBar (for mobile) */}
      <AppBar position="fixed">
        <Toolbar>
          <IconButton 
            color="inherit" 
            edge="start" 
            onClick={handleDrawerToggle} 
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">Admin Panel</Typography>
        </Toolbar>
      </AppBar>

      {/* Sidebar */}
      <Drawer
        sx={{
          width: 250,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 250,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <Box sx={{ overflow: 'auto' }}>
          <List>
            <ListItem button component={Link} to="/">
              <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem button component={Link} to="/tasks">
              <ListItemText primary="Tasks" />
            </ListItem>
            <ListItem button component={Link} to="/requirements">
              <ListItemText primary="Requirements" />
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Sidebar;

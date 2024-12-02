import * as React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Breadcrumbs, { breadcrumbsClasses } from '@mui/material/Breadcrumbs';
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';
import axios from 'axios';

const StyledBreadcrumbs = styled(Breadcrumbs)(({ theme }) => ({
  margin: theme.spacing(1, 0),
  display: 'flex',  // Ensure the items stay in a row
  [`& .${breadcrumbsClasses.separator}`]: {
    color: (theme.vars || theme).palette.action.disabled,
    margin: 1,
  },
  [`& .${breadcrumbsClasses.ol}`]: {
    display: 'flex',  // Ensures breadcrumbs stay in row
    alignItems: 'center',
  },
}));

export default function NavbarBreadcrumbs() {
  const location = useLocation();
  const { taskId } = useParams();
  const [taskName, setTaskName] = React.useState('');

  // Fetch task details if on a detailed task page
  React.useEffect(() => {
    if (taskId) {
      axios
        .get(`http://localhost:8000/api/planning/tasks/${taskId}`)
        .then((response) => {
          setTaskName(response.data.task_name);
        })
        .catch((error) => {
          console.error('Error fetching task details:', error);
        });
    }
  }, [taskId]);

  // Define breadcrumbs based on the current location
  const renderBreadcrumbs = () => {
    if (location.pathname === '/tasks') {
      // If on the tasks list page
      return (
        <>
          <Typography variant="body1" sx={{ display: 'inline' }}>Dashboard ></Typography>
          <Typography variant="body1" sx={{ color: 'text.primary', fontWeight: 600, display: 'inline' }}>
            Tasks
          </Typography>
        </>
      );
    }

    if (taskId) {
      // If on a task detail page
      return (
        <>
          <Typography variant="body1" sx={{ display: 'inline' }}>Dashboard > </Typography>
          <Typography variant="body1" sx={{ color: 'text.primary', fontWeight: 600, display: 'inline' }}>
            Tasks > 
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', display: 'inline' }}>
            {taskName || 'Loading...'}
          </Typography>
        </>
      );
    }

    return null;
  };

  return (
    <StyledBreadcrumbs aria-label="breadcrumb" separator={<NavigateNextRoundedIcon fontSize="small" />}>
      {renderBreadcrumbs()}
    </StyledBreadcrumbs>
  );
}

import React, { useEffect, useState } from 'react';
import { Container, Grid2, Card, CardContent, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';

const TasksPage = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/planning/tasks')
      .then((response) => setTasks(response.data))
      .catch((error) => console.error('Error fetching tasks:', error));
  }, []);

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'task_name', headerName: 'Task Name', width: 150 },
    { field: 'description', headerName: 'Description', width: 200 },
    { field: 'assignee', headerName: 'Assignee', width: 150 },
    { field: 'timeline', headerName: 'Timeline', width: 150 },
  ];

  return (
    <Container>
      <Grid2 container spacing={2}>
        <Grid2 item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h5">Tasks List</Typography>
              <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                  rows={tasks}
                  columns={columns}
                  pageSize={5}
                  rowsPerPageOptions={[5]}
                />
              </div>
            </CardContent>
          </Card>
        </Grid2>
      </Grid2>
    </Container>
  );
};

export default TasksPage;

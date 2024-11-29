import React from 'react';
import { Container, Grid2, Card, CardContent, Typography } from '@mui/material';

const Dashboard = () => {
  return (
    <Container maxWidth="lg">
      <Grid2 container spacing={4}>
        {/* Dashboard Card Example */}
        <Grid2 item xs={12} sm={6} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6">Total Tasks</Typography>
              <Typography variant="h4" color="primary">120</Typography>
            </CardContent>
          </Card>
        </Grid2>
        <Grid2 item xs={12} sm={6} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6">Total Requirements</Typography>
              <Typography variant="h4" color="primary">45</Typography>
            </CardContent>
          </Card>
        </Grid2>
      </Grid2>
    </Container>
  );
};

export default Dashboard;

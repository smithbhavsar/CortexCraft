import React, { useEffect, useState } from 'react';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import axios from 'axios';

const RequirementsPage = () => {
  const [requirements, setRequirements] = useState([]);

  useEffect(() => {
    // Fetch requirements from API
    const fetchRequirements = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/requirements'); // Update with your FastAPI URL
        setRequirements(response.data);
      } catch (error) {
        console.error("Error fetching requirements:", error);
      }
    };
    fetchRequirements();
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Requirements
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Project Name</TableCell>
              <TableCell>Goals</TableCell>
              <TableCell>Constraints</TableCell>
              <TableCell>Stakeholders</TableCell>
              <TableCell>Timeline</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {requirements.map((req) => (
              <TableRow key={req.id}>
                <TableCell>{req.project_name}</TableCell>
                <TableCell>{req.goals}</TableCell>
                <TableCell>{req.constraints}</TableCell>
                <TableCell>{req.stakeholders}</TableCell>
                <TableCell>{req.timelines}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default RequirementsPage;

import { Box, Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Card, CardContent, Grid } from '@mui/material';
import { useState } from 'react';

const Home = () => {
  const [productionData] = useState({
    daily: [
      { name: 'Today', meters: 1200 },
      { name: 'Yesterday', meters: 1100 },
    ],
    weekly: [
      { name: 'This Week', meters: 7500 },
      { name: 'Last Week', meters: 7000 },
    ],
    monthly: [
      { name: 'This Month', meters: 30000 },
      { name: 'Last Month', meters: 28000 },
    ]
  });

  const cardColors = {
    daily: '#1976d2',    // Blue
    weekly: '#9c27b0',   // Purple
    monthly: '#2e7d32'   // Green
  };

  const MetricCard = ({ title, data, color }) => (
    <Card sx={{ height: '100%', backgroundColor: color, color: 'white' }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <Typography variant="h4">
          {data[0].meters.toLocaleString()} m
        </Typography>
        <Typography variant="body2">
          vs {data[1].meters.toLocaleString()} m
        </Typography>
      </CardContent>
    </Card>
  );

  // Mock data for demonstration
  const firstHalfWorkers = [
    { name: 'Worker 1', meters: 500, salary: 10000 },
    { name: 'Worker 2', meters: 450, salary: 9000 },
    { name: 'Worker 3', meters: 400, salary: 8000 },
    { name: 'Worker 4', meters: 380, salary: 7600 },
    { name: 'Worker 5', meters: 350, salary: 7000 },
  ];

  const secondHalfWorkers = [
    { name: 'Worker 1', meters: 520, salary: 10400 },
    { name: 'Worker 2', meters: 470, salary: 9400 },
    { name: 'Worker 3', meters: 420, salary: 8400 },
    { name: 'Worker 4', meters: 400, salary: 8000 },
    { name: 'Worker 5', meters: 370, salary: 7400 },
  ];

  const WorkerTable = ({ title, workers }) => (
    <TableContainer component={Paper} sx={{ flex: 1 }}>
      <Typography variant="h6" sx={{ p: 2 }}>
        {title}
      </Typography>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Worker Name</TableCell>
            <TableCell align="right">Total Meter</TableCell>
            <TableCell align="right">Total Salary</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {workers.map((worker, index) => (
            <TableRow key={index}>
              <TableCell>{worker.name}</TableCell>
              <TableCell align="right">{worker.meters}</TableCell>
              <TableCell align="right">₹{worker.salary}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Production Dashboard
      </Typography>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <MetricCard 
            title="Daily Production" 
            data={productionData.daily}
            color={cardColors.daily}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <MetricCard 
            title="Weekly Production" 
            data={productionData.weekly}
            color={cardColors.weekly}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <MetricCard 
            title="Monthly Production" 
            data={productionData.monthly}
            color={cardColors.monthly}
          />
        </Grid>
      </Grid>

      <Box sx={{ display: 'flex', gap: 2 }}>
        <WorkerTable
          title="Top Workers (1st to 15th of Month)"
          workers={firstHalfWorkers}
        />
        <WorkerTable
          title="Top Workers (16th to End of Month)"
          workers={secondHalfWorkers}
        />
      </Box>
    </Box>
  );
};

export default Home;
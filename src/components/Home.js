import { Box, Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

const Home = () => {
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
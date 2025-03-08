import { useState } from 'react';
import { Box, TextField, Button, Paper, Typography, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

const AddWorker = () => {
  const [workerData, setWorkerData] = useState({
    workerName: '',
    mobileNumber: '',
    machineNumber: '',
  });

  // Mock data for worker list
  const workerList = [
    { workerName: 'Worker 1', mobileNumber: '1234567890', machineNumber: 'M001' },
    { workerName: 'Worker 2', mobileNumber: '2345678901', machineNumber: 'M002' },
    { workerName: 'Worker 3', mobileNumber: '3456789012', machineNumber: 'M003' },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setWorkerData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Worker Data:', workerData);
  };

  const handleEdit = (worker) => {
    console.log('Editing worker:', worker);
    // Set the form data with the selected worker's values
    setWorkerData({
      workerName: worker.workerName,
      mobileNumber: worker.mobileNumber,
      machineNumber: worker.machineNumber
    });
  };

  const handleDelete = (worker) => {
    console.log('Deleting worker:', worker);
    // Here you would typically make an API call to delete the worker
    // and then refresh the list
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" gutterBottom>
        Add Worker
      </Typography>
      <Paper sx={{ p: 2, maxWidth: 600, mx: 'auto', mb: 3 }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Worker Name"
                name="workerName"
                value={workerData.workerName}
                onChange={handleChange}
                required
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Mobile Number"
                name="mobileNumber"
                value={workerData.mobileNumber}
                onChange={handleChange}
                required
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Machine Number"
                name="machineNumber"
                value={workerData.machineNumber}
                onChange={handleChange}
                disabled
                size="small"
                helperText="Auto-filled when worker is assigned to a machine"
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                size="small"
                sx={{ height: '40px' }}
              >
                Add Worker
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>

      <Typography variant="h6" gutterBottom>
        Worker List
      </Typography>
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Worker Name</TableCell>
              <TableCell>Mobile Number</TableCell>
              <TableCell>Machine Number</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {workerList.map((worker, index) => (
              <TableRow key={index}>
                <TableCell>{worker.workerName}</TableCell>
                <TableCell>{worker.mobileNumber}</TableCell>
                <TableCell>{worker.machineNumber}</TableCell>
                <TableCell align="center">
                  <IconButton size="small" onClick={() => handleEdit(worker)}>
                    <Edit fontSize="small" />
                  </IconButton>
                  <IconButton size="small" onClick={() => handleDelete(worker)}>
                    <Delete fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default AddWorker;
import { useState, useEffect } from 'react';
import { Box, TextField, Button, Paper, Typography, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { useData } from '../context/DataContext';

const AddWorker = () => {
  const [workerData, setWorkerData] = useState({
    workerName: '',
    mobileNumber: '',
    machineNumber: '',
  });

  const { loading, addWorker, getWorkers, updateWorker, deleteWorker } = useData();
  const [workerList, setWorkerList] = useState([]);

  useEffect(() => {
    fetchWorkers();
  }, []);

  const fetchWorkers = async () => {
    try {
      const data = await getWorkers();
      setWorkerList(data || []);
    } catch (error) {
      console.error('Error fetching workers:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setWorkerData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addWorker(workerData);
      await fetchWorkers();
      setWorkerData({
        workerName: '',
        mobileNumber: '',
        machineNumber: ''
      });
    } catch (error) {
      console.error('Error submitting worker:', error);
    }
  };

  const handleEdit = async (worker) => {
    try {
      await updateWorker(worker.id, worker);
      await fetchWorkers();
      setWorkerData({
        workerName: worker.workerName,
        mobileNumber: worker.mobileNumber,
        machineNumber: worker.machineNumber
      });
    } catch (error) {
      console.error('Error updating worker:', error);
    }
  };

  const handleDelete = async (worker) => {
    try {
      await deleteWorker(worker.id);
      await fetchWorkers();
    } catch (error) {
      console.error('Error deleting worker:', error);
    }
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
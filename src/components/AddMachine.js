import { useState } from 'react';
import { Box, TextField, Button, Paper, Typography, Grid, MenuItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { getNextMachineNumber, validateAndRegisterNumber } from '../utils/numberGenerator';

const AddMachine = () => {
  // Mock data for demonstration
  const bimList = [
    { id: 1, number: 'BIM001' },
    { id: 2, number: 'BIM002' },
    { id: 3, number: 'BIM003' },
  ];

  const workerList = [
    { id: 1, name: 'Worker 1' },
    { id: 2, name: 'Worker 2' },
    { id: 3, name: 'Worker 3' },
    { id: 4, name: 'Worker 4' },
  ];

  // Mock data for machine list
  const machineList = [
    { machineNumber: 'M001', bimNumber: 'BIM001', productionRate: 100, worker1: 'Worker 1', worker2: 'Worker 2', worker3: 'Worker 3' },
    { machineNumber: 'M002', bimNumber: 'BIM002', productionRate: 120, worker1: 'Worker 2', worker2: 'Worker 3', worker3: 'Worker 4' },
    { machineNumber: 'M003', bimNumber: 'BIM003', productionRate: 110, worker1: 'Worker 3', worker2: 'Worker 4', worker3: 'Worker 1' },
  ];

  const [machineData, setMachineData] = useState({
    machineNumber: '',
    bimNumber: '',
    productionRate: '',
    worker1: '',
    worker2: '',
    worker3: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'machineNumber' && value) {
      const validation = validateAndRegisterNumber('machine', value);
      if (!validation.isValid) {
        setError(validation.message);
        return;
      }
      setError('');
    }
    setMachineData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAutoGenerate = () => {
    const newMachineNumber = getNextMachineNumber();
    setMachineData(prev => ({
      ...prev,
      machineNumber: newMachineNumber
    }));
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate that all required fields are filled
    if (!machineData.machineNumber || !machineData.bimNumber || 
        !machineData.productionRate || !machineData.worker1 || 
        !machineData.worker2 || !machineData.worker3) {
      setError('All fields are required');
      return;
    }
    
    // Log the machine data (in a real app, this would be sent to a backend)
    console.log('Machine Data:', machineData);
    
    // Reset form after successful submission
    setMachineData({
      machineNumber: '',
      bimNumber: '',
      productionRate: '',
      worker1: '',
      worker2: '',
      worker3: ''
    });
    setError('');
  };

  const handleEdit = (machine) => {
    console.log('Editing machine:', machine);
    // Set the form data with the selected machine's values
    setMachineData({
      machineNumber: machine.machineNumber,
      bimNumber: machine.bimNumber,
      productionRate: machine.productionRate,
      worker1: machine.worker1,
      worker2: machine.worker2,
      worker3: machine.worker3
    });
  };

  const handleDelete = (machine) => {
    console.log('Deleting machine:', machine);
    // Here you would typically make an API call to delete the machine
    // and then refresh the list
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" gutterBottom>
        Add Machine
      </Typography>
      <Paper sx={{ p: 2, maxWidth: 600, mx: 'auto', mb: 3 }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <TextField
                  fullWidth
                  label="Machine Number"
                  name="machineNumber"
                  value={machineData.machineNumber}
                  onChange={handleChange}
                  required
                  size="small"
                  error={!!error}
                  helperText={error}
                />
                <Button
                  variant="outlined"
                  onClick={handleAutoGenerate}
                  size="small"
                  sx={{ whiteSpace: 'nowrap', minWidth: 'auto', px: 1 }}
                >
                  Auto
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                select
                label="BIM Number"
                name="bimNumber"
                value={machineData.bimNumber}
                onChange={handleChange}
                required
                size="small"
              >
                {bimList.map((bim) => (
                  <MenuItem key={bim.id} value={bim.number}>
                    {bim.number}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Production Per Meter Rate"
                name="productionRate"
                type="number"
                value={machineData.productionRate}
                onChange={handleChange}
                required
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                select
                label="Worker 1"
                name="worker1"
                value={machineData.worker1}
                onChange={handleChange}
                required
                size="small"
              >
                {workerList.map((worker) => (
                  <MenuItem key={worker.id} value={worker.name}>
                    {worker.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                select
                label="Worker 2"
                name="worker2"
                value={machineData.worker2}
                onChange={handleChange}
                required
                size="small"
              >
                {workerList.map((worker) => (
                  <MenuItem key={worker.id} value={worker.name}>
                    {worker.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                select
                label="Worker 3"
                name="worker3"
                value={machineData.worker3}
                onChange={handleChange}
                required
                size="small"
              >
                {workerList.map((worker) => (
                  <MenuItem key={worker.id} value={worker.name}>
                    {worker.name}
                  </MenuItem>
                ))}
              </TextField>
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
                Add Machine
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>

      <Typography variant="h6" gutterBottom>
        Machine List
      </Typography>
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Machine Number</TableCell>
              <TableCell>BIM Number</TableCell>
              <TableCell align="right">Production Rate</TableCell>
              <TableCell>Worker 1</TableCell>
              <TableCell>Worker 2</TableCell>
              <TableCell>Worker 3</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {machineList.map((machine, index) => (
              <TableRow key={index}>
                <TableCell>{machine.machineNumber}</TableCell>
                <TableCell>{machine.bimNumber}</TableCell>
                <TableCell align="right">{machine.productionRate}</TableCell>
                <TableCell>{machine.worker1}</TableCell>
                <TableCell>{machine.worker2}</TableCell>
                <TableCell>{machine.worker3}</TableCell>
                <TableCell align="center">
                  <IconButton size="small" onClick={() => handleEdit(machine)}>
                    <Edit fontSize="small" />
                  </IconButton>
                  <IconButton size="small" onClick={() => handleDelete(machine)}>
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

export default AddMachine;
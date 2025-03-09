import { useState, useEffect } from 'react';
import { Box, TextField, Button, Paper, Typography, Grid, MenuItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { getNextMachineNumber, validateAndRegisterNumber } from '../utils/numberGenerator';
import { useData } from '../context/DataContext';

const AddMachine = () => {
  const { loading, addMachine, getMachines, updateMachine, deleteMachine, getBims, getWorkers } = useData();
  const [machineList, setMachineList] = useState([]);
  const [bimList, setBimList] = useState([]);
  const [workerList, setWorkerList] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [machines, bims, workers] = await Promise.all([
        getMachines(),
        getBims(),
        getWorkers()
      ]);
      console.log('Fetched machines:', machines); // Debug log
      if (!machines) {
        console.error('No machines data received');
        return;
      }
      if (machines.length === 0) {
        console.log('Machine list is empty');
      }
      setMachineList(machines);
      setBimList(bims || []);
      setWorkerList(workers || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Error loading machine data');
    }
  };

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
      // If the number exists, switch to edit mode
      if (validation.mode === 'edit') {
        const existingMachine = machineList.find(machine => machine.machineNumber === value);
        if (existingMachine) {
          setMachineData({
            machineNumber: existingMachine.machineNumber,
            bimNumber: existingMachine.bimNumber,
            productionRate: existingMachine.productionRate,
            worker1: existingMachine.worker1,
            worker2: existingMachine.worker2,
            worker3: existingMachine.worker3
          });
        }
      }
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!machineData.machineNumber || !machineData.bimNumber || 
        !machineData.productionRate || !machineData.worker1 || 
        !machineData.worker2 || !machineData.worker3) {
      setError('All fields are required');
      return;
    }

    try {
      await addMachine(machineData);
      await fetchData();
      setMachineData({
        machineNumber: '',
        bimNumber: '',
        productionRate: '',
        worker1: '',
        worker2: '',
        worker3: ''
      });
      setError('');
    } catch (error) {
      console.error('Error submitting machine:', error);
      setError('Error adding machine');
    }
  };

  const handleEdit = async (machine) => {
    try {
      await updateMachine(machine.id, machine);
      await fetchData();
      setMachineData({
        machineNumber: machine.machineNumber,
        bimNumber: machine.bimNumber,
        productionRate: machine.productionRate,
        worker1: machine.worker1,
        worker2: machine.worker2,
        worker3: machine.worker3
      });
    } catch (error) {
      console.error('Error updating machine:', error);
    }
  };

  const handleDelete = async (machine) => {
    try {
      await deleteMachine(machine.id);
      await fetchData();
    } catch (error) {
      console.error('Error deleting machine:', error);
    }
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
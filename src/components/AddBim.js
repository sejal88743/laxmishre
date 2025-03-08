import { useState } from 'react';
import { Box, TextField, Button, Paper, Typography, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { getNextBimNumber, validateAndRegisterNumber } from '../utils/numberGenerator';
import { IconButton } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

const AddBim = () => {
  const [bimData, setBimData] = useState({
    bimNumber: '',
    bimMeter: '',
    parTaka: '',
    loadDate: new Date().toISOString().split('T')[0],
    machineNumber: ''
  });

  const [error, setError] = useState('');

  // Mock data for BIM list
  const bimList = [
    { bimNumber: 'BIM001', bimMeter: 1000, parTaka: 50, bimTaka: 20, loadDate: '2024-01-15', machineNumber: 'M001', pendingTaka: 20, pendingMeter: 1000 },
    { bimNumber: 'BIM002', bimMeter: 1500, parTaka: 60, bimTaka: 25, loadDate: '2024-01-16', machineNumber: 'M002', pendingTaka: 25, pendingMeter: 1500 },
    { bimNumber: 'BIM003', bimMeter: 2000, parTaka: 40, bimTaka: 50, loadDate: '2024-01-17', machineNumber: 'M003', pendingTaka: 50, pendingMeter: 2000 },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'bimNumber' && value) {
      const validation = validateAndRegisterNumber('bim', value);
      if (!validation.isValid) {
        setError(validation.message);
        return;
      }
      setError('');
    }
    setBimData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAutoGenerate = () => {
    const newBimNumber = getNextBimNumber();
    setBimData(prev => ({
      ...prev,
      bimNumber: newBimNumber
    }));
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const bimTaka = bimData.bimMeter / bimData.parTaka;
    console.log('BIM Data:', { ...bimData, bimTaka, pendingTaka: bimTaka, pendingMeter: bimData.bimMeter });
  };

  const handleEdit = (bim) => {
    setBimData({
      bimNumber: bim.bimNumber,
      bimMeter: bim.bimMeter,
      parTaka: bim.parTaka,
      loadDate: bim.loadDate,
      machineNumber: bim.machineNumber
    });
  };

  const handleDelete = (bim) => {
    console.log('Deleting BIM:', bim);
    // Here you would typically make an API call to delete the BIM
    // and then refresh the list
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" gutterBottom>
        Add BIM
      </Typography>
      <Paper sx={{ p: 2, maxWidth: 600, mx: 'auto', mb: 3 }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <TextField
                  fullWidth
                  label="BIM Number"
                  name="bimNumber"
                  value={bimData.bimNumber}
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
                label="BIM Meter"
                name="bimMeter"
                type="number"
                value={bimData.bimMeter}
                onChange={handleChange}
                required
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Par Taka"
                name="parTaka"
                type="number"
                value={bimData.parTaka}
                onChange={handleChange}
                required
                size="small"
                helperText="Meters per Taka"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Load Date"
                name="loadDate"
                type="date"
                value={bimData.loadDate}
                onChange={handleChange}
                required
                size="small"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Machine Number"
                name="machineNumber"
                value={bimData.machineNumber}
                onChange={handleChange}
                required
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                size="small"
                sx={{ height: '40px' }}
              >
                Add BIM
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>

      <Typography variant="h6" gutterBottom>
        BIM List
      </Typography>
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>BIM Number</TableCell>
              <TableCell align="right">BIM Meter</TableCell>
              <TableCell align="right">Par Taka</TableCell>
              <TableCell align="right">BIM Taka</TableCell>
              <TableCell>Load Date</TableCell>
              <TableCell>Machine Number</TableCell>
              <TableCell align="right">Pending Taka</TableCell>
              <TableCell align="right">Pending Meter</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bimList.map((bim) => (
              <TableRow key={bim.bimNumber}>
                <TableCell>{bim.bimNumber}</TableCell>
                <TableCell align="right">{bim.bimMeter}</TableCell>
                <TableCell align="right">{bim.parTaka}</TableCell>
                <TableCell align="right">{bim.bimTaka}</TableCell>
                <TableCell>{bim.loadDate}</TableCell>
                <TableCell>{bim.machineNumber}</TableCell>
                <TableCell align="right">{bim.pendingTaka}</TableCell>
                <TableCell align="right">{bim.pendingMeter}</TableCell>
                <TableCell align="center">
                  <IconButton size="small" onClick={() => handleEdit(bim)}>
                    <Edit fontSize="small" />
                  </IconButton>
                  <IconButton size="small" onClick={() => handleDelete(bim)}>
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

export default AddBim;
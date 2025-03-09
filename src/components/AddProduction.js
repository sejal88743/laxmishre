import { useState } from 'react';
import { Box, TextField, Button, Paper, Typography, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { getNextTakaNumber, validateAndRegisterNumber } from '../utils/numberGenerator';

const AddProduction = () => {
  const [currentView, setCurrentView] = useState('firstHalf');
  const [productionData, setProductionData] = useState({
    date: new Date().toISOString().split('T')[0],
    takaNumber: '',
    machineNumber: '',
    bimNumber: '',
    pendingTaka: '',
    totalMeter: '',
    wetValue: ''
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'takaNumber' && value) {
      const validation = validateAndRegisterNumber('taka', value);
      if (!validation.isValid) {
        setError(validation.message);
        return;
      }
      setError('');
    }
    setProductionData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAutoGenerate = () => {
    const newTakaNumber = getNextTakaNumber();
    setProductionData(prev => ({
      ...prev,
      takaNumber: newTakaNumber
    }));
    setError('');
  };

  const [firstHalfProduction, setFirstHalfProduction] = useState(
    Array.from({ length: 15 }, (_, i) => ({
      date: i + 1,
      worker1: '',
      worker2: '',
      worker3: ''
    }))
  );

  const [secondHalfProduction, setSecondHalfProduction] = useState(
    Array.from({ length: 15 }, (_, i) => ({
      date: i + 16,
      worker1: '',
      worker2: '',
      worker3: ''
    }))
  );

  const handleCellChange = (index, field, value, isFirstHalf) => {
    const updateProduction = isFirstHalf ? setFirstHalfProduction : setSecondHalfProduction;
    updateProduction(prev => {
      const newData = [...prev];
      newData[index] = { ...newData[index], [field]: value };
      return newData;
    });
  };

  const handleSave = () => {
    const currentData = currentView === 'firstHalf' ? firstHalfProduction : secondHalfProduction;
    console.log('Saving production data:', {
      ...productionData,
      productionDetails: currentData
    });
  };

  const handleEdit = () => {
    console.log('Editing production data');
  };

  const calculateTotal = (data) => {
    return {
      worker1: data.reduce((sum, row) => sum + (Number(row.worker1) || 0), 0),
      worker2: data.reduce((sum, row) => sum + (Number(row.worker2) || 0), 0),
      worker3: data.reduce((sum, row) => sum + (Number(row.worker3) || 0), 0)
    };
  };

  const ProductionTable = ({ data, setData, title }) => {
    const totals = calculateTotal(data);
    const isFirstHalf = title.includes('1st');

    return (
      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Typography variant="h6" sx={{ p: 2 }}>
          {title}
        </Typography>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell style={{padding: '8px'}}>Date</TableCell>
              <TableCell align="right" style={{padding: '8px'}}>Worker 1</TableCell>
              <TableCell align="right" style={{padding: '8px'}}>Worker 2</TableCell>
              <TableCell align="right" style={{padding: '8px'}}>Worker 3</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={row.date}>
                <TableCell>{row.date}</TableCell>
                {['worker1', 'worker2', 'worker3'].map((worker) => (
                  <TableCell key={worker} align="right">
                    <TextField
                      size="small"
                      type="number"
                      value={row[worker]}
                      onChange={(e) => handleCellChange(index, worker, e.target.value, isFirstHalf)}
                      sx={{ width: '80px' }}
                      inputProps={{
                        inputMode: 'numeric',
                        pattern: '[0-9]*',
                        style: { textAlign: 'right' }
                      }}
                    />
                  </TableCell>
                ))}
              </TableRow>
            ))}
            <TableRow>
              <TableCell><strong>Total</strong></TableCell>
              <TableCell align="right"><strong>{totals.worker1}</strong></TableCell>
              <TableCell align="right"><strong>{totals.worker2}</strong></TableCell>
              <TableCell align="right"><strong>{totals.worker3}</strong></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Add Production
      </Typography>
      <Paper sx={{ p: 3, maxWidth: 800, mx: 'auto' }}>
        <form>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                type="date"
                label="Date"
                name="date"
                value={productionData.date}
                onChange={handleChange}
                required
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <TextField
                  fullWidth
                  label="Taka Number"
                  name="takaNumber"
                  value={productionData.takaNumber}
                  onChange={handleChange}
                  required
                  error={!!error}
                  helperText={error}
                />
                <Button
                  variant="outlined"
                  onClick={handleAutoGenerate}
                  size="small"
                  sx={{ whiteSpace: 'nowrap' }}
                >
                  Auto Generate
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Machine Number"
                name="machineNumber"
                value={productionData.machineNumber}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="BIM Number"
                name="bimNumber"
                value={productionData.bimNumber}
                onChange={handleChange}
                disabled
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Pending Taka"
                name="pendingTaka"
                value={productionData.pendingTaka}
                onChange={handleChange}
                disabled
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSave}
                fullWidth
              >
                Save
              </Button>
            </Grid>
            <Grid item xs={12} md={4}>
              <Button
                variant="outlined"
                color="primary"
                onClick={handleEdit}
                fullWidth
              >
                Edit
              </Button>
            </Grid>
          </Grid>
        </form>

        <Box sx={{ position: 'relative', mt: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 2 }}>
            <IconButton onClick={() => setCurrentView('firstHalf')} disabled={currentView === 'firstHalf'}>
              <ChevronLeft />
            </IconButton>
            <IconButton onClick={() => setCurrentView('secondHalf')} disabled={currentView === 'secondHalf'}>
              <ChevronRight />
            </IconButton>
          </Box>
          
          <Box sx={{ display: currentView === 'firstHalf' ? 'block' : 'none' }}>
            <ProductionTable
              data={firstHalfProduction}
              setData={setFirstHalfProduction}
              title="Production (1st to 15th)"
            />
          </Box>
          
          <Box sx={{ display: currentView === 'secondHalf' ? 'block' : 'none' }}>
            <ProductionTable
              data={secondHalfProduction}
              setData={setSecondHalfProduction}
              title="Production (16th to End)"
            />
          </Box>

          <Box sx={{ mt: 4, p: 2, border: '1px solid #e0e0e0', borderRadius: 1 }}>
            <Grid container spacing={3} alignItems="center">
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Total Meter"
                  name="totalMeter"
                  type="number"
                  value={productionData.totalMeter}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Wet Value"
                  name="wetValue"
                  type="number"
                  value={productionData.wetValue}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSave}
                    disabled={!productionData.totalMeter || !productionData.wetValue}
                    fullWidth
                  >
                    Save
                  </Button>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={handleEdit}
                    fullWidth
                  >
                    Edit
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default AddProduction;
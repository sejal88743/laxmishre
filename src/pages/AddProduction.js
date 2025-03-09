import { useState } from 'react';
import { 
  Box, 
  TextField, 
  Grid, 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  Button
} from '@mui/material';
import { useData } from '../context/DataContext';

function AddProduction() {
  const { addProduction } = useData();
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    taka_number: '',
    machine_number: '',
    bim_number: '',
    worker1_production: '',
    worker2_production: '',
    worker3_production: '',
    wet: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addProduction(formData);
      // Reset form after successful submission
      setFormData({
        ...formData,
        taka_number: '',
        worker1_production: '',
        worker2_production: '',
        worker3_production: '',
        wet: ''
      });
    } catch (error) {
      console.error('Error adding production:', error);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ p: 2 }}>
      {/* First Row */}
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={4}>
          <TextField
            fullWidth
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            required
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            fullWidth
            label="Taka Number"
            value={formData.taka_number}
            onChange={(e) => setFormData({ ...formData, taka_number: e.target.value })}
            required
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            fullWidth
            label="Machine Number"
            value={formData.machine_number}
            onChange={(e) => setFormData({ ...formData, machine_number: e.target.value })}
            required
          />
        </Grid>
      </Grid>

      {/* Second Row */}
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={4}>
          <TextField
            fullWidth
            label="BIM Number"
            value={formData.bim_number}
            onChange={(e) => setFormData({ ...formData, bim_number: e.target.value })}
            required
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            fullWidth
            label="Pending Taka"
            disabled
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            fullWidth
            label="Today Total"
            disabled
          />
        </Grid>
      </Grid>

      {/* Production Table */}
      <TableContainer component={Paper} sx={{ mb: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Worker 1</TableCell>
              <TableCell>Worker 2</TableCell>
              <TableCell>Worker 3</TableCell>
              <TableCell>Wet</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>
                <TextField
                  fullWidth
                  type="number"
                  value={formData.worker1_production}
                  onChange={(e) => setFormData({ ...formData, worker1_production: e.target.value })}
                />
              </TableCell>
              <TableCell>
                <TextField
                  fullWidth
                  type="number"
                  value={formData.worker2_production}
                  onChange={(e) => setFormData({ ...formData, worker2_production: e.target.value })}
                />
              </TableCell>
              <TableCell>
                <TextField
                  fullWidth
                  type="number"
                  value={formData.worker3_production}
                  onChange={(e) => setFormData({ ...formData, worker3_production: e.target.value })}
                />
              </TableCell>
              <TableCell>
                <TextField
                  fullWidth
                  type="number"
                  value={formData.wet}
                  onChange={(e) => setFormData({ ...formData, wet: e.target.value })}
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      {/* Bottom Buttons */}
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
        <Button variant="contained" color="primary" type="submit">
          Save
        </Button>
        <Button variant="contained" color="secondary">
          Edit
        </Button>
      </Box>
    </Box>
  );
}

export default AddProduction;
import { useState } from 'react';
import { TextField, Button, Box, Alert } from '@mui/material';
import { useData } from '../context/DataContext';

function AddBim() {
  const { addBim } = useData();
  const [formData, setFormData] = useState({
    bim_number: '',
    bim_meter: '',
    par_taka: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const bimData = {
        ...formData,
        bim_meter: parseFloat(formData.bim_meter),
        par_taka: parseFloat(formData.par_taka),
        pending_taka: Math.floor(parseFloat(formData.bim_meter) / parseFloat(formData.par_taka)),
        pending_meter: parseFloat(formData.bim_meter)
      };

      await addBim(bimData);
      setSuccess('BIM added successfully!');
      setFormData({ bim_number: '', bim_meter: '', par_taka: '' });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ p: 3 }}>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
      
      <TextField
        fullWidth
        label="BIM Number"
        value={formData.bim_number}
        onChange={(e) => setFormData({ ...formData, bim_number: e.target.value })}
        margin="normal"
        required
      />
      <TextField
        fullWidth
        label="BIM Meter"
        type="number"
        value={formData.bim_meter}
        onChange={(e) => setFormData({ ...formData, bim_meter: e.target.value })}
        margin="normal"
        required
      />
      <TextField
        fullWidth
        label="Par Taka"
        type="number"
        value={formData.par_taka}
        onChange={(e) => setFormData({ ...formData, par_taka: e.target.value })}
        margin="normal"
        required
      />
      <Button type="submit" variant="contained" sx={{ mt: 2 }}>
        Add BIM
      </Button>
    </Box>
  );
}

export default AddBim;
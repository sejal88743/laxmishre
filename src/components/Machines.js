import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

export default function Machines() {
  const { getMachines, addMachine, updateMachine, loading } = useData();
  const [machines, setMachines] = useState([]);

  React.useEffect(() => {
    const fetchMachines = async () => {
      try {
        const data = await getMachines();
        setMachines(data || []);
      } catch (error) {
        console.error('Error fetching machines:', error);
      }
    };
    fetchMachines();
  }, [getMachines]);
  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [currentMachine, setCurrentMachine] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    status: '',
    last_maintenance: ''
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setIsEdit(false);
    setCurrentMachine(null);
    setFormData({
      name: '',
      type: '',
      status: '',
      last_maintenance: ''
    });
  };

  const handleEdit = (machine) => {
    setCurrentMachine(machine);
    setFormData({
      name: machine.name,
      type: machine.type,
      status: machine.status,
      last_maintenance: machine.last_maintenance ? new Date(machine.last_maintenance).toISOString().split('T')[0] : ''
    });
    setIsEdit(true);
    setOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEdit && currentMachine) {
        await updateMachine(currentMachine.id, formData);
      } else {
        await addMachine(formData);
      }
      handleClose();
    } catch (error) {
      console.error('Error saving machine:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClickOpen} style={{ marginBottom: 20 }}>
        Add New Machine
      </Button>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Last Maintenance</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {machines.map((machine) => (
              <TableRow key={machine.id}>
                <TableCell>{machine.name}</TableCell>
                <TableCell>{machine.type}</TableCell>
                <TableCell>{machine.status}</TableCell>
                <TableCell>
                  {machine.last_maintenance ? new Date(machine.last_maintenance).toLocaleDateString() : '-'}
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEdit(machine)}>
                    <EditIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{isEdit ? 'Edit Machine' : 'Add New Machine'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Name"
            type="text"
            fullWidth
            value={formData.name}
            onChange={handleChange}
            required
          />
          <TextField
            margin="dense"
            name="type"
            label="Type"
            type="text"
            fullWidth
            value={formData.type}
            onChange={handleChange}
            required
          />
          <TextField
            margin="dense"
            name="status"
            label="Status"
            type="text"
            fullWidth
            value={formData.status}
            onChange={handleChange}
            required
          />
          <TextField
            margin="dense"
            name="last_maintenance"
            label="Last Maintenance"
            type="date"
            fullWidth
            value={formData.last_maintenance}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} color="primary">
            {isEdit ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
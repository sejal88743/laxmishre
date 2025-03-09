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

export default function Workers() {
  const { workers, addWorker, updateWorker, loading } = useData();
  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [currentWorker, setCurrentWorker] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    contact_number: '',
    email: ''
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setIsEdit(false);
    setCurrentWorker(null);
    setFormData({
      name: '',
      role: '',
      contact_number: '',
      email: ''
    });
  };

  const handleEdit = (worker) => {
    setCurrentWorker(worker);
    setFormData({
      name: worker.name,
      role: worker.role,
      contact_number: worker.contact_number || '',
      email: worker.email || ''
    });
    setIsEdit(true);
    setOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEdit && currentWorker) {
        await updateWorker(currentWorker.id, formData);
      } else {
        await addWorker(formData);
      }
      handleClose();
    } catch (error) {
      console.error('Error saving worker:', error);
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
        Add New Worker
      </Button>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Contact Number</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {workers.map((worker) => (
              <TableRow key={worker.id}>
                <TableCell>{worker.name}</TableCell>
                <TableCell>{worker.role}</TableCell>
                <TableCell>{worker.contact_number}</TableCell>
                <TableCell>{worker.email}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEdit(worker)}>
                    <EditIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{isEdit ? 'Edit Worker' : 'Add New Worker'}</DialogTitle>
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
            name="role"
            label="Role"
            type="text"
            fullWidth
            value={formData.role}
            onChange={handleChange}
            required
          />
          <TextField
            margin="dense"
            name="contact_number"
            label="Contact Number"
            type="text"
            fullWidth
            value={formData.contact_number}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="email"
            label="Email"
            type="email"
            fullWidth
            value={formData.email}
            onChange={handleChange}
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
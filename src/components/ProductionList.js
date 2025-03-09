import React, { useState, useEffect } from 'react';
import { Box, Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { useData } from '../context/DataContext';

const ProductionList = () => {
  const { getProductions, loading } = useData();
  const [productionData, setProductionData] = useState([]);

  useEffect(() => {
    const fetchProductions = async () => {
      try {
        const data = await getProductions();
        setProductionData(data || []);
      } catch (error) {
        console.error('Error fetching productions:', error);
      }
    };
    fetchProductions();
  }, [getProductions]);

  if (loading) {
    return <div>Loading...</div>;
  }

  // Production data from API
  const productions = productionData.length ? productionData : [
    { 
      date: '2024-01-01', 
      takaNumber: 'T001',
      machineNumber: 'M001', 
      pendingTaka: 5,
      totalMeter: 1000,
      wet: 50,
      avgWet: (50/1000).toFixed(3)
    },
    { 
      date: '2024-01-02', 
      takaNumber: 'T002',
      machineNumber: 'M002', 
      pendingTaka: 3,
      totalMeter: 1200,
      wet: 55,
      avgWet: (55/1200).toFixed(3)
    },
    { 
      date: '2024-01-03', 
      takaNumber: 'T003',
      machineNumber: 'M001', 
      pendingTaka: 4,
      totalMeter: 1100,
      wet: 52,
      avgWet: (52/1100).toFixed(3)
    }
  ];

  // Calculate today's total production
  const today = new Date().toISOString().split('T')[0];
  const todayTotal = productionData
    .filter(item => item.date === today)
    .reduce((sum, item) => sum + item.totalMeter, 0);

  const handleEdit = (production) => {
    console.log('Editing production:', production);
    // Here you would typically navigate to edit form or open a modal
    // with the selected production's data
  };

  const handleDelete = (production) => {
    console.log('Deleting production:', production);
    // Here you would typically make an API call to delete the production
    // and then refresh the list
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Production List
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Taka Number</TableCell>
              <TableCell>Machine Number</TableCell>
              <TableCell align="right">Pending Taka</TableCell>
              <TableCell align="right">Today's Total</TableCell>
              <TableCell align="right">Total Meter</TableCell>
              <TableCell align="right">Wet</TableCell>
              <TableCell align="right">Avg Wet</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {productionData.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.date}</TableCell>
                <TableCell>{row.takaNumber}</TableCell>
                <TableCell>{row.machineNumber}</TableCell>
                <TableCell align="right">{row.pendingTaka}</TableCell>
                <TableCell align="right">{row.date === today ? todayTotal : '-'}</TableCell>
                <TableCell align="right">{row.totalMeter}</TableCell>
                <TableCell align="right">{row.wet}</TableCell>
                <TableCell align="right">{row.avgWet}</TableCell>
                <TableCell align="center">
                  <IconButton size="small" onClick={() => handleEdit(row)}>
                    <Edit fontSize="small" />
                  </IconButton>
                  <IconButton size="small" onClick={() => handleDelete(row)}>
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

export default ProductionList;
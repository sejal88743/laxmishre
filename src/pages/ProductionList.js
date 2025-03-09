import { useState, useEffect } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper 
} from '@mui/material';
import { supabase } from '../utils/supabaseClient';

function ProductionList() {
  const [productions, setProductions] = useState([]);

  useEffect(() => {
    fetchProductions();
  }, []);

  const fetchProductions = async () => {
    try {
      const { data, error } = await supabase
        .from('production')
        .select('*')
        .order('date', { ascending: false });

      if (error) throw error;
      setProductions(data);
    } catch (error) {
      console.error('Error fetching productions:', error);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Taka Number</TableCell>
            <TableCell>Machine No</TableCell>
            <TableCell>Pending Taka</TableCell>
            <TableCell>Taka Meter</TableCell>
            <TableCell>Wet</TableCell>
            <TableCell>Wet/Meter</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {productions.map((prod) => (
            <TableRow key={prod.id}>
              <TableCell>{formatDate(prod.date)}</TableCell>
              <TableCell>{prod.taka_number}</TableCell>
              <TableCell>{prod.machine_number}</TableCell>
              <TableCell>{prod.pending_taka}</TableCell>
              <TableCell>{prod.taka_meter}</TableCell>
              <TableCell>{prod.wet}</TableCell>
              <TableCell>
                {prod.wet && prod.taka_meter 
                  ? (prod.wet / prod.taka_meter).toFixed(2) 
                  : '-'}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ProductionList;
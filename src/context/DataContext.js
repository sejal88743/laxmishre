import { createContext, useContext, useState } from 'react';
import { supabase } from '../utils/supabaseClient';

const DataContext = createContext();

export function DataProvider({ children }) {
  const [loading, setLoading] = useState(false);

  // BIM Operations
  const addBim = async (bimData) => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('bims')
        .insert([bimData]);
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error adding BIM:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const getBims = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('bims')
        .select('*');
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching BIMs:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateBim = async (id, bimData) => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('bims')
        .update(bimData)
        .eq('id', id);
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error updating BIM:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const deleteBim = async (id) => {
    try {
      setLoading(true);
      const { error } = await supabase
        .from('bims')
        .delete()
        .eq('id', id);
      if (error) throw error;
    } catch (error) {
      console.error('Error deleting BIM:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Worker Operations
  const addWorker = async (workerData) => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('workers')
        .insert([workerData]);
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error adding worker:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const getWorkers = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('workers')
        .select('*');
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching workers:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateWorker = async (id, workerData) => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('workers')
        .update(workerData)
        .eq('id', id);
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error updating worker:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const deleteWorker = async (id) => {
    try {
      setLoading(true);
      const { error } = await supabase
        .from('workers')
        .delete()
        .eq('id', id);
      if (error) throw error;
    } catch (error) {
      console.error('Error deleting worker:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Machine Operations
  const addMachine = async (machineData) => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('machines')
        .insert([machineData]);
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error adding machine:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const getMachines = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('machines')
        .select('*');
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching machines:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateMachine = async (id, machineData) => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('machines')
        .update(machineData)
        .eq('id', id);
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error updating machine:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const deleteMachine = async (id) => {
    try {
      setLoading(true);
      const { error } = await supabase
        .from('machines')
        .delete()
        .eq('id', id);
      if (error) throw error;
    } catch (error) {
      console.error('Error deleting machine:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Production Operations
  const addProduction = async (productionData) => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('production')
        .insert([productionData]);
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error adding production:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const getProductions = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('production')
        .select('*');
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching productions:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateProduction = async (id, productionData) => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('production')
        .update(productionData)
        .eq('id', id);
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error updating production:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const deleteProduction = async (id) => {
    try {
      setLoading(true);
      const { error } = await supabase
        .from('production')
        .delete()
        .eq('id', id);
      if (error) throw error;
    } catch (error) {
      console.error('Error deleting production:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    loading,
    // BIM operations
    addBim,
    getBims,
    updateBim,
    deleteBim,
    // Worker operations
    addWorker,
    getWorkers,
    updateWorker,
    deleteWorker,
    // Machine operations
    addMachine,
    getMachines,
    updateMachine,
    deleteMachine,
    // Production operations
    addProduction,
    getProductions,
    updateProduction,
    deleteProduction
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
}

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
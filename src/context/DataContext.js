import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../utils/supabaseClient';

const DataContext = createContext();

export function DataProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [realTimeData, setRealTimeData] = useState({});

  // Set up real-time subscriptions
  useEffect(() => {
    const tables = ['bims', 'workers', 'machines', 'production'];
    const subscriptions = tables.map(table => {
      return supabase
        .channel(`${table}_changes`)
        .on('postgres_changes', { event: '*', schema: 'public', table }, (payload) => {
          setRealTimeData(prev => ({
            ...prev,
            [table]: {
              type: payload.eventType,
              data: payload.new,
              oldData: payload.old
            }
          }));
        })
        .subscribe();
    });

    return () => {
      subscriptions.forEach(subscription => {
        supabase.removeChannel(subscription);
      });
    };
  }, []);

  // Generic fetch function
  const fetchData = async (table) => {
    try {
      setLoading(true);
      setError(null);
      const { data, error } = await supabase
        .from(table)
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Generic add function
  const addData = async (table, data) => {
    try {
      setLoading(true);
      setError(null);
      const { data: result, error } = await supabase
        .from(table)
        .insert([data])
        .select();
      
      if (error) throw error;
      return result[0];
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Generic update function
  const updateData = async (table, id, data) => {
    try {
      setLoading(true);
      setError(null);
      const { data: result, error } = await supabase
        .from(table)
        .update(data)
        .eq('id', id)
        .select();
      
      if (error) throw error;
      return result[0];
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Generic delete function
  const deleteData = async (table, id) => {
    try {
      setLoading(true);
      setError(null);
      const { error } = await supabase
        .from(table)
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Enhanced BIM operations
  const bimOperations = {
    add: (data) => addData('bims', {
      ...data,
      pending_taka: Math.floor(data.bim_meter / data.par_taka),
      pending_meter: data.bim_meter
    }),
    update: (id, data) => updateData('bims', id, data),
    delete: (id) => deleteData('bims', id),
    fetch: () => fetchData('bims'),
    fetchByMachine: async (machineNumber) => {
      try {
        setLoading(true);
        setError(null);
        const { data, error } = await supabase
          .from('bims')
          .select('*')
          .eq('machine_number', machineNumber);
        if (error) throw error;
        return data;
      } catch (error) {
        setError(error.message);
        throw error;
      } finally {
        setLoading(false);
      }
    }
  };

  // Enhanced Worker operations
  const workerOperations = {
    add: (data) => addData('workers', data),
    update: (id, data) => updateData('workers', id, data),
    delete: (id) => deleteData('workers', id),
    fetch: () => fetchData('workers'),
    fetchTopWorkers: async (startDate, endDate) => {
      try {
        setLoading(true);
        setError(null);
        const { data, error } = await supabase
          .from('production')
          .select(`
            worker1_production,
            worker2_production,
            worker3_production,
            workers(name)
          `)
          .gte('date', startDate)
          .lte('date', endDate)
          .order('date', { ascending: true });
        if (error) throw error;
        return data;
      } catch (error) {
        setError(error.message);
        throw error;
      } finally {
        setLoading(false);
      }
    }
  };

  // Enhanced Machine operations
  const machineOperations = {
    add: async (data) => {
      try {
        setLoading(true);
        setError(null);
        const result = await addData('machines', data);
        // Update workers with machine number in parallel
        const workerUpdates = [
          data.worker1_id && updateData('workers', data.worker1_id, { machine_number: data.machine_number }),
          data.worker2_id && updateData('workers', data.worker2_id, { machine_number: data.machine_number }),
          data.worker3_id && updateData('workers', data.worker3_id, { machine_number: data.machine_number })
        ].filter(Boolean);
        
        await Promise.all(workerUpdates);
        return result;
      } catch (error) {
        setError(error.message);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    update: (id, data) => updateData('machines', id, data),
    delete: (id) => deleteData('machines', id),
    fetch: () => fetchData('machines'),
    fetchWithWorkers: async () => {
      try {
        setLoading(true);
        setError(null);
        const { data, error } = await supabase
          .from('machines')
          .select(`
            *,
            workers!worker1_id(name),
            workers!worker2_id(name),
            workers!worker3_id(name)
          `);
        if (error) throw error;
        return data;
      } catch (error) {
        setError(error.message);
        throw error;
      } finally {
        setLoading(false);
      }
    }
  };

  // Enhanced Production operations
  const productionOperations = {
    add: async (data) => {
      try {
        setLoading(true);
        setError(null);
        // Calculate total production
        const totalProduction = 
          parseFloat(data.worker1_production || 0) +
          parseFloat(data.worker2_production || 0) +
          parseFloat(data.worker3_production || 0);

        // Update BIM pending meters and taka
        const { data: bim, error: bimError } = await supabase
          .from('bims')
          .select('*')
          .eq('bim_number', data.bim_number)
          .single();

        if (bimError) throw bimError;

        if (bim) {
          await updateData('bims', bim.id, {
            pending_meter: bim.pending_meter - totalProduction,
            pending_taka: bim.pending_taka - 1
          });
        }

        return addData('production', {
          ...data,
          total_production: totalProduction,
          wet_per_meter: data.wet ? data.wet / totalProduction : 0
        });
      } catch (error) {
        setError(error.message);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    update: (id, data) => updateData('production', id, data),
    delete: (id) => deleteData('production', id),
    fetch: () => fetchData('production'),
    fetchByDateRange: async (startDate, endDate) => {
      try {
        setLoading(true);
        setError(null);
        const { data, error } = await supabase
          .from('production')
          .select('*')
          .gte('date', startDate)
          .lte('date', endDate)
          .order('date', { ascending: true });
        if (error) throw error;
        return data;
      } catch (error) {
        setError(error.message);
        throw error;
      } finally {
        setLoading(false);
      }
    }
  };

  const value = {
    loading,
    error,
    realTimeData,
    bimOperations,
    workerOperations,
    machineOperations,
    productionOperations,
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
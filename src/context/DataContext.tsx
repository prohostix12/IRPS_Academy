"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { University, Program } from '../types';

interface DataContextType {
  universities: University[];
  programs: Program[];
  loading: boolean;
  error: string | null;
  refreshData: () => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [universities, setUniversities] = useState<University[]>([]);
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [unisRes, progsRes] = await Promise.all([
        fetch('/api/universities'),
        fetch('/api/programs')
      ]);
      
      if (!unisRes.ok || !progsRes.ok) {
        throw new Error('Failed to fetch data from the server');
      }

      const unisData = await unisRes.json();
      const progsData = await progsRes.json();

      setUniversities(unisData);
      setPrograms(progsData);
      setError(null);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'An error occurred while fetching data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <DataContext value={{ universities, programs, loading, error, refreshData: fetchData }}>
      {children}
    </DataContext>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { University, Program, Testimonial } from '../types';

interface DataContextType {
  universities: University[];
  programs: Program[];
  testimonials: Testimonial[];
  loading: boolean;
  error: string | null;
  refreshData: () => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [universities, setUniversities] = useState<University[]>([]);
  const [programs, setPrograms] = useState<Program[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [unisRes, progsRes, testRes] = await Promise.all([
        fetch('/api/universities'),
        fetch('/api/programs'),
        fetch('/api/testimonials')
      ]);
      
      if (!unisRes.ok || !progsRes.ok || !testRes.ok) {
        throw new Error('Failed to fetch data from the server');
      }

      const unisData = await unisRes.json();
      const progsData = await progsRes.json();
      const testData = await testRes.json();

      setUniversities(unisData);
      setPrograms(progsData);
      setTestimonials(testData);
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
    <DataContext value={{ universities, programs, testimonials, loading, error, refreshData: fetchData }}>
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

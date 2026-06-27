import React, { createContext, useState, useContext, useEffect } from 'react';
import { getJobsFromDB } from '../services/jobService';

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({
    location: '',
    type: '',
    minSalary: ''
  });

  useEffect(() => {
    getJobsFromDB()
      .then((data) => {
        setJobs(data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error al traer empleos en el Contexto:", err);
        setLoading(false);
      });
  }, []);

  const filteredJobs = jobs.filter(job => {
    const matchesQuery = searchQuery.trim() === '' || 
                         job.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.company?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.location?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesLocation = filters.location === '' || job.location === filters.location;
    const matchesType = filters.type === '' || job.type === filters.type;
    const matchesSalary = filters.minSalary === '' || job.salary >= Number(filters.minSalary);

    return matchesQuery && matchesLocation && matchesType && matchesSalary;
  });

  return (
    <SearchContext.Provider value={{
      isModalOpen,
      setIsModalOpen,
      searchQuery,
      setSearchQuery,
      filters,
      setFilters,
      jobs,
      filteredJobs,
      loading
    }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => useContext(SearchContext);
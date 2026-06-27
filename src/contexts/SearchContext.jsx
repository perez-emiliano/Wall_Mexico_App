import React, { createContext, useState, useContext, useEffect } from 'react';
import { getJobsFromDB } from '../services/jobService';

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({
    location: '', // Mapeará contra la modalidad seleccionada en el modal (onsite, remote, hybrid)
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

  // 🔥 FILTRADO INTELIGENTE ADAPTADO A LA BASE DE DATOS DE SUPABASE
  const filteredJobs = jobs.filter(job => {
    // 1. Búsqueda por texto (Busca en el título de la vacante O en el nombre relacional de la empresa)
    const matchesQuery = searchQuery.trim() === '' || 
                         job.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.companies?.company_name?.toLowerCase().includes(searchQuery.toLowerCase());
    
    // 2. Filtro por Modalidad (Mapeado a la propiedad 'modality' de tu tabla)
    const matchesLocation = filters.location === '' || job.modality === filters.location;
    
    // 3. Filtro por tipo o categoría si lo necesitas en el futuro (por ahora lo dejamos libre)
    const matchesType = filters.type === '' || job.companies?.sector === filters.type;
    
    // 4. Filtro por Salario Mínimo (Convertimos el salario de la DB a número para comparar correctamente)
    const matchesSalary = filters.minSalary === '' || Number(job.salary) >= Number(filters.minSalary);

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
import React, { useState, useEffect } from 'react';
import './FilterModal.css';

const FilterModal = ({ isOpen, onClose, onApplyFilters, currentFilters }) => {
  const [localFilters, setLocalFilters] = useState(currentFilters);

  // 💡 Sincroniza el estado local cada vez que el modal se abre o cambian los filtros globales
  useEffect(() => {
    setLocalFilters(currentFilters);
  }, [currentFilters, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleApply = () => {
    onApplyFilters(localFilters);
    onClose();
  };

  return (
    <div className="filter-overlay" onClick={onClose}>
      <div className="filter-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="filter-drag-handle" />
        
        <h3>Filtros de Búsqueda</h3>

        <div className="filter-group">
          <label>Ubicación</label>
          <select 
            name="location" 
            value={localFilters.location} 
            onChange={handleChange}
            className="filter-select"
          >
            <option value="">Todas las ciudades</option>
            <option value="Mexicali, BC">Mexicali, BC</option>
            <option value="Tijuana, BC">Tijuana, BC</option>
            <option value="CDMX">CDMX</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Tipo de Empleo</label>
          <select 
            name="type" 
            value={localFilters.type} 
            onChange={handleChange}
            className="filter-select"
          >
            <option value="">Todos los tipos</option>
            <option value="Tiempo Completo">Tiempo Completo</option>
            <option value="Medio Tiempo">Medio Tiempo</option>
            <option value="Remoto">Remoto</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Salario Mínimo Mensual</label>
          <input 
            type="number" 
            name="minSalary"
            placeholder="Ej. 4000"
            value={localFilters.minSalary}
            onChange={handleChange}
            className="filter-input"
          />
        </div>

        <button className="filter-apply-btn" onClick={handleApply}>
          Aplicar Filtros
        </button>
      </div>
    </div>
  );
};

export default FilterModal;
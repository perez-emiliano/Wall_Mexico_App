import React from 'react';
import './Searchbar.css';

// Iconos para la barra de búsqueda y filtros
import { HiOutlineMagnifyingGlass, HiAdjustmentsHorizontal } from "react-icons/hi2";

// 💡 Recibe searchTerm y onSearchChange como propiedades desde el archivo padre (Search.jsx o Home.jsx)
function Searchbar({ searchTerm, onSearchChange }) {
  return (
    <div className="searchbar-section-container">
      <div className="searchbar-input-wrapper">
        <HiOutlineMagnifyingGlass className="searchbar-input-icon" />
        <input 
          type="text" 
          placeholder="Buscar empleos por ciudad, rol, salario..." 
          value={searchTerm} // 💡 Conectado al estado del padre
          onChange={(e) => onSearchChange(e.target.value)} // 💡 Le avisa al padre en cada letra que presionas
          className="search-bar-input"
        />
      </div>
      
      <button className="filter-action-btn" onClick={() => alert('Abrir filtros')}>
        <HiAdjustmentsHorizontal className="filter-icon-style" />
      </button>
    </div>
  );
}

export default Searchbar;
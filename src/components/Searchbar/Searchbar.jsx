import React from 'react';
import './Searchbar.css';
import { useSearch } from '../../contexts/SearchContext'; // 💡 Tu importación perfecta

// Iconos para la barra de búsqueda y filtros
import { HiOutlineMagnifyingGlass, HiAdjustmentsHorizontal } from "react-icons/hi2";

// 🪓 Quitamos las props porque ahora nos conectamos directo a la antena global
function Searchbar() {
  // 🔥 Conectamos el Walkie-Talkie y extraemos lo que necesitamos del contexto
  const { searchQuery, setSearchQuery, setIsModalOpen } = useSearch();

  return (
    <div className="searchbar-section-container">
      <div className="searchbar-input-wrapper">
        <HiOutlineMagnifyingGlass className="searchbar-input-icon" />
        <input 
          type="text" 
          placeholder="Buscar empleos por ciudad, rol, salario..." 
          value={searchQuery} // 💡 Conectado al estado global del Contexto
          onChange={(e) => setSearchQuery(e.target.value)} // 💡 Actualiza el contexto en tiempo real
          className="search-bar-input"
        />
      </div>
      
      {/* 🚀 Ahora sí, setIsModalOpen(true) funcionará de inmediato al dar clic */}
      <button className="filter-action-btn" onClick={() => setIsModalOpen(true)}>
        <HiAdjustmentsHorizontal className="filter-icon-style" />
      </button>
    </div>
  );
}

export default Searchbar;
import React, { useState } from 'react';
import './jobCard.css';
// Importamos la campana/marcador para guardar empleos y la estrella para las calificaciones
import { HiOutlineBookmark, HiBookmark, HiStar } from "react-icons/hi2";

function JobCard({ job }) {
  const [isSaved, setIsSaved] = useState(false);

  const handleApply = () => {
    alert(`Te has postulado con éxito a: ${job.title}`);
  };

  return (
    <div className="job-card">
      
      {/* Botón de favoritos/guardar en la esquina superior derecha */}
      <button className="job-bookmark-btn" onClick={() => setIsSaved(!isSaved)}>
        {isSaved ? <HiBookmark className="bookmark-icon active" /> : <HiOutlineBookmark className="bookmark-icon" />}
      </button>

      {/* Bloque Izquierdo: Contiene el logo de la empresa */}
      <div className="job-card-left">
        <div className="job-card-avatar">
          {job.logo ? <img src={job.logo} alt={job.company} /> : job.company?.charAt(0)}
        </div>
      </div>

      {/* Bloque Central: Contiene el título, empresa, ubicación y reviews */}
      <div className="job-card-center">
        <h4 className="job-card-title">{job.title}</h4>
        <span className="job-card-company">{job.company}</span>
        
        <div className="job-card-location">
          <span>📍 {job.location}</span>
        </div>

        {/* Sistema de calificación (Estrellas) simulado como el mockup */}
        <div className="job-card-rating">
          <HiStar className="rating-star-icon" />
          <HiStar className="rating-star-icon" />
          <HiStar className="rating-star-icon" />
          <HiStar className="rating-star-icon" />
          <HiStar className="rating-star-icon" />
          <span className="rating-number">4.5</span>
          <span className="rating-count">(128)</span>
        </div>
      </div>

      {/* Bloque Derecho: Contiene el precio y el botón de acción */}
      <div className="job-card-right">
        <div className="job-card-salary">
          {job.salary || "$30,000 - $50,000"}
        </div>
        <button className="job-card-apply-btn" onClick={handleApply}>
          Apply
        </button>
      </div>

    </div>
  );
}

export default JobCard;
import React from 'react'
import { Link } from 'react-router-dom';

export default function Servicios() {
  return (
    
        <>
        
          <h2 className="text-center my-4 fs-4">♪♫ Servicios ♫♪</h2>
          <div className="d-flex flex-column align-items-center bg-main p-0 rounded-3 shadow-sm border border-2 m-3 w-75 m-auto">
            <p className="text-center p-3 mb-4 mt-4 fw-semibold fs-3">Ofrecemos una variedad de servicios para satisfacer tus necesidades. Dejanos tu instrumento en boxes y te lo devolveremos como nuevo.</p>
            
              <ul className="d-flex flex-column align-items-center list-unstyled w-75 mb-4">
                <li>Calibración de instrumentos</li>
                <li>Encordados para todos los instrumentos</li>
                <li>Reparación de instrumentos</li>
                <h3 className="text-center p-3 mb-1 mt-1 fw-semibold fs-3">También tenemos:</h3>
                <li>Vientos</li>
                <li>Baterias</li>
                <li>Congas</li>
                <li>Platos</li>
                <li>Bajos</li>
                <li>Ukeleles</li>
                <li>Charangos</li>
                <li>Amplia gama de instrumentos de viento</li>
                <h3 className="text-center p-3 mb-1 mt-1 fw-semibold fs-3">Electrónica:</h3>
                <li>Luces</li>
                <li>Micrófonos</li>
                <li>Consolas</li>
                <li>Amplificadores</li>
                <li>Interfaces de grabación</li>
                <li>Mezcladoras</li>
                <h3 className="text-center p-3 mb-1 mt-1 fw-semibold fs-3">Pedaleras:</h3><li>Las que busques</li>            
              </ul>
          </div>
            
              <div className="text-center my-3">
                <Link to="/" className="btn btn-primary btn-lg p-1 fw-bold">
                  Volver al inicio
                </Link>
              </div>          
         </>
  )
};


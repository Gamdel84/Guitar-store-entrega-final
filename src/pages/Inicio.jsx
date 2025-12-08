import React from 'react'
import { Link } from 'react-router-dom';

export default function Inicio() {
  return (
    <>
    <h2 className="text-center p-3 mb-4 mt-4 fs-4">♪♫ Bienvenidos al mundo de las cuerdas ♫♪</h2>

      

      
    <div className="w-100 h-auto d-flex justify-content-center align-items-center bg-main mb-3 col-12 m-auto rounded-3">

      <div className='d-flex justify-content-center align-items-center m-auto'>
          <img src="/img/torre_izq1.png" alt="Torre de parlantes" className="w-50" />
      </div>
        
      <div id="carouselExampleFade" className="carousel slide carousel-fade mx-auto rounded-3 w-25" data-bs-ride="carousel" data-bs-interval="3000">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src="./img/logoGibson.png" className="d-block w-100" alt="logo Gibson" />
          </div>
          <div className="carousel-item">
            <img src="./img/gibson1.png" className="d-block w-100" alt="Gibson guitar 1" />
          </div>
          <div className="carousel-item">
            <img src="./img/gibson2.png" className="d-block w-100" alt="Gibson guitar 2" />
          </div>
          <div className="carousel-item">
            <img src="./img/gibson3.png" className="d-block w-100" alt="Gibson guitar 3" />
          </div>
          <div className="carousel-item">
            <img src="./img/logoFender.png" className="d-block w-100" alt="logo Fender" />
          </div>
          <div className="carousel-item">
            <img src="./img/fender1.png" className="d-block w-100" alt="Fender guitar 1" />
          </div>
          <div className="carousel-item">
            <img src="./img/fender2.png" className="d-block w-100" alt="Fender guitar 2" />
          </div>
          <div className="carousel-item">
            <img src="./img/fender3.png" className="d-block w-100" alt="Fender guitar 3" />
          </div>
          
        </div>
        
      </div>
          
      <div className='d-flex justify-content-center align-items-center m-auto'>
          <img src="/img/torre_der1.png" alt="Torre de parlantes" className="w-50" />
      </div>

    </div>     

      <p className="col-6 text-center m-auto fs-6 bg-main p-3 rounded-3 shadow-sm">
        Llegaste al lugar indicado. <br />
        Tenemos amplificadores, accesorios y guitarras que usan los más grandes del mundo. <br />
        Registrate y descubrí beneficios exclusivos de Guitar Store.
      </p>
      <div className="text-center my-3">
        <Link to="/galeria" className="btn btn-primary btn-lg fw-bold p-1">
          Ir a galería
        </Link>
      </div>
     
      
    </>
  )
}


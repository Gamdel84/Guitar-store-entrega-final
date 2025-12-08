import { useState } from "react";
import { Link } from 'react-router-dom';

export default function Contacto() {
  const [form, setForm] = useState({ nombre: "", email: "", comentario: "" });

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    console.log(form);
  };

  return (
    <>
    <h2 className="text-center my-4 fs-4">♪♫ Contacto ♫♪</h2>
    <section className="d-flex flex-column align-items-center bg-main p-2 rounded-3 shadow-sm border border-2 m-3 w-75 m-auto">
      <div className="mb-2">        
        <address className="text-center fs-6 my-2">
          <small className="d-block mb-2">Guitar Store — Av. Siempre Viva 742, Buenos Aires</small>
          <a href="mailto:info@guitarstore.com" className="p-1 rounded-3 shadow-sm border border-2 fw-semibold fs-6 mt-3">info@guitarstore.com</a>
        </address>
      </div>

      <form onSubmit={onSubmit} className="w-100 mb-2">
        <fieldset className="d-flex flex-column align-items-center w-100 p-2 rounded-3 shadow-sm border border-2">
          <legend className="text-center p-2 mb-1 mt-1 fw-semibold fs-4">Dejános tu consulta</legend>

          <div className="mb-2 w-50">
            <label htmlFor="nombre" className="d-block form-label fw-semibold fs-6 mb-1">Nombre</label>
            <input
              id="nombre"
              name="nombre"
              type="text"
              autoComplete="name"
              placeholder="Tu nombre completo..."
              required
              className="form-control rounded-3 border-secondary border-2 shadow-sm p-1 mb-2"
              value={form.nombre}
              onChange={onChange}
            />
          </div>

          <div className="mb-2 w-50">
            <label htmlFor="email" className="d-block form-label fw-semibold fs-6 mb-1">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="tu@correo.com"
              required
              className="form-control rounded-3 border-secondary border-2 shadow-sm p-1 mb-2"
              value={form.email}
              onChange={onChange}
            />
          </div>

          <div className="mb-2 w-50">
            <label htmlFor="comentario" className="d-block form-label fw-semibold fs-6 mb-1">Comentario</label>
            <textarea
              id="comentario"
              name="comentario"
              rows={4}
              placeholder="Contanos qué andas necesitando..."
              required
              className="form-control rounded-3 border-secondary border-2 shadow-sm p-1 mb-2"
              value={form.comentario}
              onChange={onChange}
            />
          </div>

          <div>
            <button type="submit" className="d-inline btn btn-success">Enviar</button>
          </div>
        </fieldset>
      </form>
      <div className="text-center my-3">
        <Link to="/" className="btn btn-primary btn-lg p-1 fw-bold">
          Volver al inicio
        </Link>
      </div>
    </section>
    </>
  );
}

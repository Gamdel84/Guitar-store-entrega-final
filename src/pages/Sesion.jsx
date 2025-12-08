import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

export default function IniciarSesion() {
  const { iniciarSesion } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();

  const [form, setForm] = useState({ nombre: "", email: "", pass: "" });

  const from = location.state?.from?.pathname || "/";

  const manejarEnvio = (e) => {
    e.preventDefault();
    const { nombre, email, pass } = form;

    let rol = "user";

    if (email === "admin@admin" && pass === "admin") {
      rol = "admin";
    }

    iniciarSesion({ nombre, email, rol });
    navigate(from);
  };

  return (
    <>
  <h2 className="text-center my-4 fs-4">♪♫ Iniciar sesión ♫♪</h2>

    <div className="d-flex flex-column align-items-center bg-main p-2 rounded-3 shadow-sm border border-2 m-3 w-50 m-auto">    
      <form onSubmit={manejarEnvio} className="w-100 mb-2">
        <div className="mb-2 w-75 m-auto">
          <label className="d-block form-label fw-semibold fs-6 mb-1">Nombre</label>
          <input
            className="form-control rounded-3 border-secondary border-2 shadow-sm p-1 mb-2"
            type="text"
            value={form.nombre}
            onChange={(e) => setForm({ ...form, nombre: e.target.value })}
            required
            placeholder="Introduzca su nombre de usuario"
          />
        </div>

        <div className="mb-2 w-75 m-auto">
          <label className="d-block form-label fw-semibold fs-6 mb-1">Email</label>
          <input
            className="form-control rounded-3 border-secondary border-2 shadow-sm p-1 mb-2"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
            placeholder="Introduzca un email válido"
          />
        </div>

        <div className="mb-2 w-75 m-auto">
          <label className="d-block form-label fw-semibold fs-6 mb-1">Password</label>
          <input
            className="form-control rounded-3 border-secondary border-2 shadow-sm p-1 mb-2"
            type="password"
            value={form.pass}
            onChange={(e) => setForm({ ...form, pass: e.target.value })}
            required
            placeholder="Introduzca su contraseña"
          />
        </div>

        <div className="d-flex justify-content-center gap-3 mt-3">
          <button type="submit" className="d-inline btn btn-success">
            Continuar
          </button>
          <button
            type="button"
            className="d-inline btn btn-primary"
            onClick={() => navigate("/galeria")}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
    </>
  );
}

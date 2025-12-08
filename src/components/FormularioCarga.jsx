import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useProducts } from "../context/ProductsContext";

export default function FormularioCarga() {
  const navigate = useNavigate();
  const location = useLocation();
  const { agregarProducto, editarProducto, validar } = useProducts();

  const productoRecibido = location.state?.producto || null;
  const modo = productoRecibido ? "editar" : "agregar";

  const [form, setForm] = useState(
      productoRecibido || {
        marca: "",
        modelo: "",
        precio: "",
        tipo: "",
        avatar: "",
        stock: "",     
      }
    );

  const [errores, setErrores] = useState({});
  const [cargando, setCargando] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrores({});
    setCargando(true);

    try {
      const erroresVal = validar(form);
      if (Object.keys(erroresVal).length > 0) {
        setErrores(erroresVal);
        setCargando(false);
        return;
      }

      if (modo === "editar" && productoRecibido) {
        await editarProducto(productoRecibido.id, form);
      } else {
        await agregarProducto(form);
      }

      const destino = location.state?.fromDashboard ? "/dashboard" : "/galeria";
      navigate(destino);
    } catch (e2) {
      console.error(e2);
      if (e2?.type === "VALIDACION" && e2.errores) {
        setErrores(e2.errores);
      } else {
        alert("Ocurrió un error al guardar el producto.");
      }
    } finally {
      setCargando(false);
    }
  };

  const cancelar = () => {
    const destino = location.state?.fromDashboard ? "/dashboard" : "/galeria";
    navigate(destino);
  };

  return (
    <>
      <h2 className="text-center my-4 fs-4">{modo === "editar" ? "Editar guitarra" : "Agregar nueva guitarra"}</h2>
      <div className="d-flex flex-column align-items-center bg-main p-4 rounded-3 shadow-sm border border-2 m-3">

      <form onSubmit={handleSubmit} className="w-100 m-auto mb-2">
        <div className="d-flex flex-column align-items-center mb-2 w-75 m-auto">
          <label className="d-block form-label fw-semibold fs-6 mb-1 w-75">
            Marca*
            <input
              name="marca"
              value={form.marca}
              onChange={handleChange}
              className="form-control rounded-3 border-secondary border-2 shadow-sm p-1 mb-2"
            />
          </label>
          {errores.marca && <p>{errores.marca}</p>}
        </div>

        <div className="d-flex flex-column align-items-center mb-2 w-75 m-auto">
          <label className="d-block form-label fw-semibold fs-6 mb-1 w-75">
            Modelo*
            <input
              name="modelo"
              value={form.modelo}
              onChange={handleChange}
              className="form-control rounded-3 border-secondary border-2 shadow-sm p-1 mb-2"
            />
          </label>
          {errores.modelo && <p>{errores.modelo}</p>}
        </div>

        <div className="d-flex flex-column align-items-center mb-2 w-75 m-auto">
          <label className="d-block form-label fw-semibold fs-6 mb-1 w-75">
            Precio (u$s)*
            <input
              name="precio"
              type="number"
              value={form.precio}
              onChange={handleChange}
              className="form-control rounded-3 border-secondary border-2 shadow-sm p-1 mb-2"
            />
          </label>
          {errores.precio && <p>{errores.precio}</p>}
        </div>

        <div className="d-flex flex-column align-items-center mb-2 w-75 m-auto">
          <label className="d-block form-label fw-semibold fs-6 mb-1 w-75">
            Stock a agregar*
            <input
              type="number"
              name="stock"
              min="0"
              value={form.stock}
              onChange={handleChange}
              className="form-control rounded-3 border-secondary border-2 shadow-sm p-1 mb-2"
            />
          </label>
          {errores.stock && <p className="text-danger">{errores.stock}</p>}
        </div>


        <div className="d-flex flex-column align-items-center mb-2 w-75 m-auto">
          <label className="d-block form-label fw-semibold fs-6 mb-1 w-75">
            Tipo
            <input
              name="tipo"
              value={form.tipo}
              onChange={handleChange}
              className="form-control rounded-3 border-secondary border-2 shadow-sm p-1 mb-2"
            />
          </label>
        </div>

        <div className="d-flex flex-column align-items-center mb-2 w-75 m-auto">
          <label className="d-block form-label fw-semibold fs-6 mb-1 w-75">
            URL de imagen
            <input
              name="avatar"
              value={form.avatar}
              onChange={handleChange}
              className="form-control rounded-3 border-secondary border-2 shadow-sm p-1 mb-2"
            />
          </label>
        </div>
        <p className="text-danger text-center">(*) Campos obligatorios</p>
        <div className="d-flex justify-content-center align-items-center my-3">
          <button type="submit" disabled={cargando} className="btn btn-success btn-sm text-white">
              {cargando
                ? modo === "editar"
                  ? "Actualizando..."
                  : "Agregando..."
                : modo === "editar"
                ? "Guardar cambios"
                : "Agregar guitarra"}
            </button>

            <button type="button" onClick={cancelar} className="ms-2 btn btn-primary btn-sm text-white">
              Cancelar
            </button>
        </div>             
      </form>
    </div>
    </>
  );
}

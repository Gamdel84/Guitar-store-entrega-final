// src/components/EliminarProducto.jsx
import { useLocation, useNavigate } from "react-router-dom";
import { useProducts } from "../context/ProductsContext";

export default function EliminarProducto() {
  const location = useLocation();
  const navigate = useNavigate();
  const { eliminarProducto } = useProducts();

  const producto = location.state?.producto || null;

  const confirmar = async () => {
    if (!producto) return;
    try {
      await eliminarProducto(producto.id);
      alert("Producto eliminado correctamente.");
      navigate("/dashboard");
    } catch (e) {
      console.error(e);
      alert("Ocurrió un error al eliminar el producto.");
    }
  };

  const cancelar = () => {
    navigate("/dashboard");
  };

  if (!producto) {
    return (
      <div>
        <h2>No se recibió ningún producto para eliminar.</h2>
        <button onClick={() => navigate("/dashboard")}>Volver al Dashboard</button>
      </div>
    );
  }

  return (
      <>
      <h2 className="text-center">Eliminar producto</h2>
      <div className="d-flex flex-column align-items-center bg-main rounded-3 shadow-sm border border-2 w-50 m-auto">
      <p className="fw-semibold fs-5 text-danger mb-0">Estás a punto de eliminar:{" "}</p>
      <p className="text-primary fw-semibold fs-5 mb-0">{producto.marca}</p>
      <p className="fw-semibold fs-5 text-success mb-0">{producto.modelo}</p>   
      <p className="fw-semibold fs-5 mb-0">Precio: u$s {producto.precio}</p>
      <p className="fw-semibold fs-5 mb-0">Stock: {producto.stock}</p>
      <p className="fw-semibold fs-5 mb-0">Tipo: {producto.tipo}
      </p>
      {producto.avatar && (
        <div>
          <img src={producto.avatar} alt="Guitarra a eliminar" />
        </div>
      )}     

      <button onClick={confirmar} className="btn btn-danger mt-3 fw-bold inline-block">Sí, eliminar</button>
      <p className="mb-4 fw-semibold fs-6 text-danger p-1 rounded-3">¡ATENCION! Esta acción no se puede deshacer</p>
      <button onClick={cancelar} className="btn btn-primary my-2 fw-bold inline-block">Cancelar</button>

    </div>
    </>
  );
}

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { useCartContext } from "../context/CartContext";
import { useProducts } from "../context/ProductsContext";


export default function Pagar() {
  const { usuario } = useAuthContext();
  const { carrito, vaciarCarrito, total } = useCartContext();
  const { editarProducto } = useProducts();
  const navigate = useNavigate();

  const [procesando, setProcesando] = useState(false); // 👈 nuevo estado

  useEffect(() => {
    if (!usuario) {
      navigate("/login", { state: { from: { pathname: "/pagar" } } });
    }
  }, [usuario, navigate]);

  const comprar = async () => {
    if (!usuario) {
      navigate("/login", { state: { from: { pathname: "/pagar" } } });
      return;
    }

    if (!carrito.length) {
      // si querés, esto después también lo cambiamos
      alert("No hay productos en el carrito.");
      navigate("/galeria");
      return;
    }

    try {
      setProcesando(true); // 👈 empezamos “cargando”

      // Descontar stock en la API por cada producto del carrito
      for (const item of carrito) {
        const stockActual =
          item.stock !== undefined && item.stock !== null
            ? Number(item.stock)
            : null;

        if (stockActual === null || Number.isNaN(stockActual)) {
          continue; // este producto no maneja stock aún
        }

        const cantidadComprada = item.cantidad ?? 1;
        const nuevoStock = Math.max(stockActual - cantidadComprada, 0);

        await editarProducto(item.id, { stock: nuevoStock });
      }

      vaciarCarrito();

      // 👇 En vez de alert + navigate, mandamos info a /galeria
      navigate("/galeria", { state: { compraOk: true } });
    } catch (e) {
      console.error(e);
      alert("Ocurrió un problema al procesar la compra. Por favor, intentá de nuevo.");
    } finally {
      setProcesando(false);
    }
  };


  if (!usuario) {
    return null;
  }

  return (
    <>
    <h2 className="text-center my-4">Proceso de pago</h2>
    <div className="d-flex flex-column align-items-center bg-main p-4 rounded-3 shadow-sm border border-2 m-3 w-50 m-auto">
      
      <p><strong className="text-success fw-bold fs-4 mb-2">{usuario.nombre}</strong>, estamos terminando la compra...</p>         
      <p className="fw-bold fs-5 mb-2 text-success">Resumen de compra:</p>
      {carrito.map((item) => (
        <div key={item.id} className="border-bottom mb-2 pb-2 w-100">
          <p>
            <strong>{item.marca}</strong> - {item.modelo} x {item.cantidad}:  u$s{item.precio} 
          </p>
        </div>
      ))}
      <p className="fw-bold fs-4 text-success mb-2">Total a pagar: <strong className="text-danger fw-bold fs-4">u$s{total}</strong></p>
      <div className="">
        <button
          className="btn btn-success fw-bold"
          onClick={comprar}
          disabled={procesando}
        >
          {procesando && (
            <span className="spinner-border spinner-border-sm me-2" role="status" />
          )}
          {procesando ? "Procesando compra..." : "Confirmar y pagar"}
        </button>

        <button onClick={() => navigate("/galeria")} className="d-inline btn btn-primary me-2">
          Seguir comprando
        </button>
      </div>
    </div>
    </>
  );
}

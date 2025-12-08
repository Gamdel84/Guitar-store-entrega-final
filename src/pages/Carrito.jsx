// src/pages/Carrito.jsx
import { useNavigate } from "react-router-dom";
import { useCartContext } from "../context/CartContext";
import { useAuthContext } from "../context/AuthContext";

export default function CarritoCompras() {
  const { carrito, vaciarCarrito, agregarCantidad, quitarCantidad, total } =
    useCartContext();
  const { isAuthenticated } = useAuthContext();
  const navigate = useNavigate();

  const irAPagar = () => {
    if (!isAuthenticated) {
      navigate("/login", { state: { from: { pathname: "/pagar" } } });
    } else {
      navigate("/pagar");
    }
  };

  if (!carrito.length) {
    return <div className="text-center p-4 fs-3 fw-bold text-danger">No hay productos en el carrito</div>;
  }

  return (
    <div className="bg-main p-4 rounded-3 shadow-sm border border-2">
      <h3 className="text-center fw-semibold fs-3 text-success">Carrito de compras</h3>
      {carrito.map((item) => (
        <div key={item.id} className="border-bottom mb-3 pb-3">
          <img src={item.avatar} alt={`${item.marca} ${item.modelo}`} className="img-fluid mb-2" />
          <p>
            Marca: <strong>{item.marca}</strong> <br />Modelo: <strong>{item.modelo}</strong>
          </p>
          <p>Precio: <strong>u$s{item.precio}</strong></p>
          <p>Cantidad: <strong>{item.cantidad}</strong></p>
          <button onClick={() => quitarCantidad(item.id)} className="btn btn-danger btn-cuadrado fw-bold inline-block m-2">-</button>
          <button onClick={() => agregarCantidad(item.id)} className="btn btn-primary btn-cuadrado fw-bold inline-block m-2">+</button>
        </div>
      ))}
      <h3 className="text-center fw-semibold fs-4 text-success mt-3 mb-3">Total: <strong className="text-danger fw-semibold">u$s{total.toFixed(2)}</strong></h3>
      <div className="text-center">
        <button onClick={vaciarCarrito} className="d-inline btn btn-outline-primary me-2">Vaciar carrito</button>
        <button onClick={irAPagar} className="d-inline btn btn-outline-success me-2">Comprar</button>
      </div>
      
    </div>
  );
}

import { Link, useParams, useLocation } from "react-router-dom";
import { useCartContext } from "../context/CartContext";
import { useProducts } from "../context/ProductsContext";

export default function DetalleGaleria() {
  const { id } = useParams();
  const location = useLocation();
  const { productos, cargando } = useProducts();
  const { agregarAlCarrito } = useCartContext();
  
  let guitarra = location.state?.g;
  
  if (!guitarra && !cargando) {
    guitarra = productos.find((p) => String(p.id) === String(id));
  }

  if (cargando && !guitarra) {
    return <p>Cargando detalle...</p>;
  }

  if (!guitarra) {
    return (
      <div>
        <p>No se encontró la guitarra solicitada.</p>
        <Link to="/galeria">
          <button>Volver a Galería</button>
        </Link>
      </div>
    );
  }

  return (
    <>
    <div className="container my-4 text-center d-flex flex-column align-items-center">
      <h2 className="text-center my-4">Detalles del producto:</h2>
      <div className="d-flex flex-column align-items-center bg-main p-2 rounded-3 shadow-sm border border-2 w-50">
        <h3>
          Marca: <strong>{guitarra.marca}</strong> <br /> Modelo: <strong>{guitarra.modelo}</strong>
        </h3>
        <ul className="list-unstyled">
          <li className="">Precio: u$s {guitarra.precio}</li>
            {guitarra.tipo && <li>Tipo: {guitarra.tipo}</li>}
            {guitarra.avatar && (
              <li>
                <img
                  src={guitarra.avatar}
                  alt={`${guitarra.marca} ${guitarra.modelo}`}
                  width="80%"
                />
              </li>
            )}
        </ul>
        <div>
            <button onClick={() => agregarAlCarrito(guitarra)} className="btn btn-sm rounded-3 btn-success me-2">Comprar</button>

            <Link to="/galeria" className="btn btn-sm rounded-3 btn-primary me-2">
              Volver a Galería
            </Link>
        </div>        
      </div>
    </div>                
    </>
  );
}

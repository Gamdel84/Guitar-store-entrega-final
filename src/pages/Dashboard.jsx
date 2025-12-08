import { useAuthContext } from "../context/AuthContext";
import { useProducts } from "../context/ProductsContext";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const { usuario, cerrarSesion } = useAuthContext();
  const { productos, cargando, error } = useProducts();

  const tokenActual = localStorage.getItem("authToken");

  return (
    <>
    <h2 className="text-center my-4 fs-4">Sección del administrador</h2>
    <div className="container mt-4 bg-main rounded-3 p-4 shadow-sm w-100 m-auto border border-2 d-flex flex-column align-items-center">
      

      <p className="fs-5 mb-4 text-primary">
        Sesión iniciada como: {" "}
        <strong className="text-success">{usuario?.nombre || "Usuario sin nombre"}</strong>
      </p>

      <div className="mb-4 fs-5 fw-semibold">
        <p className="d-inline text-primary">Token de autenticación: </p>
        <code className="d-inline text-danger">{tokenActual || "No hay token guardado"}</code>
      </div>

      <div className="mb-4 fs-5 fw-semibold text-center d-flex flex-column align-items-center bg-main p-2 rounded-3 shadow-sm border border-2 w-75">
        <h3 className="text-center p-3 mb-1 mt-1 fw-semibold fs-3">Acciones</h3>
        <ul className="list-unstyled d-flex flex-row align-items-center">
          <li>
            <Link to="/agregar-producto" state={{ fromDashboard: true }} className="btn btn-outline-success me-2 my-2 fw-bold inline-block">
              Agregar guitarra
            </Link>
          </li>
          <li>
            <Link to="/galeria" className="btn btn-primary me-2 my-2 fw-bold inline-block">Ver en galería</Link>            
          </li>
        </ul>
      </div>

      <section className="mb-4 fs-5 fw-semibold text-start d-flex flex-column align-items-center bg-main p-2 rounded-3 shadow-sm border border-2 w-75">
        <h3 className="text-center p-3 mb-1 mt-1 fw-semibold fs-3">Disponibilidad</h3>

        {cargando && <p>Cargando guitarras...</p>}
        {error && <p>Ocurrió un error al cargar las guitarras: {error}</p>}

        {!cargando && !error && (!productos || productos.length === 0) && (
          <p>No hay guitarras cargadas en la API.</p>
        )}

        {!cargando && !error && productos && productos.length > 0 && (
        <table className="table table-striped table-bordered text-center">
          <thead>
            <tr>
              <th className="fw-bold text-primary fs-5">Marca</th>
              <th className="fw-bold text-primary fs-5">Modelo</th>
              <th className="fw-bold text-primary fs-5">Precio (u$s)</th>
              <th className="fw-bold text-primary fs-5">Stock</th>
              <th className="fw-bold text-primary fs-5">Editar</th>
              <th className="fw-bold text-primary fs-5">Eliminar</th>
            </tr>
          </thead>

          <tbody>
            {productos.map((p) => {
              const stock = Number(p.stock ?? 0);

              // 👉 Lógica de bajo stock
              let filaClass = "";
              let stockClass = "";

              if (stock === 0) {
                filaClass = "table-danger";              // fondo rojo
                stockClass = "text-danger fw-bold";      // texto rojo y fuerte
              } else if (stock <= 2) {
                filaClass = "table-warning";             // fondo amarillo
                stockClass = "text-danger fw-semibold";  // texto rojo
              }

              return (
                <tr key={p.id} className={filaClass}>
                  <td className="fw-bold text-info">{p.marca}</td>
                  <td>{p.modelo}</td>
                  <td>{p.precio}</td>
                  <td className={stockClass}>
                    {stock === 0 ? "Sin stock" : stock}
                  </td>
                  <td>
                    <Link
                      to="/agregar-producto"
                      state={{ producto: p, fromDashboard: true }}
                      className="btn btn-outline-success me-2 my-2"
                    >
                      Editar entrada
                    </Link>
                  </td>
                  <td>
                    <Link
                      to={`/eliminar-producto/${p.id}`}
                      state={{ producto: p }}
                      className="btn btn-outline-danger me-2 my-2"
                    >
                      Eliminar
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}

      </section>

      <div className="">
        <Link to="/galeria" className="btn btn-primary me-2 my-2 fw-bold inline-block">Ir a la galería</Link>
        <button onClick={cerrarSesion} className="btn btn-danger me-2 my-2 fw-bold inline-block">Cerrar sesión</button>
      </div>
    </div>
    </>
  );
}

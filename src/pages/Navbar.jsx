import { NavLink, Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { useCartContext } from "../context/CartContext";

export default function Navbar() {
  const { usuario, isAuthenticated, isAdmin, cerrarSesion } = useAuthContext();
  const { carrito, vaciarCarrito, animarCarrito } = useCartContext();
  const navigate = useNavigate();

  const totalItemsCarrito = carrito.reduce(
    (total, item) => total + (item.cantidad || 1),
    0
  );

  const manejarCerrarSesion = () => {
    navigate("/galeria");
    setTimeout(() => {
      vaciarCarrito();
      cerrarSesion();
    }, 100);
  };

  const irAPagar = () => {
    navigate("/pagar");
  };

  return (
    <>
      <nav className="navbar navbar-expand-xl p-1 nav position-sticky top-0 z-3 ">
        <div className="container-fluid col-12 mx-auto">
          
          <Link to="/" className="navbar-brand">
            <div className="d-flex flex-column align-items-center m-auto">
              <img src="/img/perillas.png" alt="Logo" className="w-75"/>
              <h1 className="fs-3 ms-2 fw-semibold ">Guitar Store</h1>
            </div>
          </Link>

          
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#mainNav"
            aria-controls="mainNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          
          <div className="collapse navbar-collapse" id="mainNav">
            
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 m-auto gap-3 ">
              <li className="nav-item">
                <NavLink to="/" className="nav-link fs-6" aria-current="page">
                  &#119070; Inicio
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/galeria" className="nav-link fs-6" aria-current="page">
                  &#119070; Galería
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/servicios" className="nav-link fs-6" aria-current="page">
                  &#119070; Servicios
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/contacto" className="nav-link fs-6" aria-current="page">
                  &#119070; Contacto
                </NavLink>
              </li>

              
              {isAdmin && (
                <>
                  <li className="nav-item">
                    <NavLink to="/dashboard" className="nav-link fs-6" aria-current="page">
                      &#119070; Dashboard
                    </NavLink>
                  </li>
                  <li className="nav-item ">
                    <NavLink to="/agregar-producto" className="nav-link fs-6" aria-current="page">
                      &#119070; Agregar producto
                    </NavLink>
                  </li>
                </>
              )}
            </ul>

            
            <div className="d-flex align-items-center gap-2">
              
              <button
                type="button"
                className={`carro ${animarCarrito ? "carro-animado" : ""}`}
                onClick={irAPagar}
              >
                <img src="/img/carrito_bl.png" alt="Carrito" className="carrito-icon" />
                <span className="carrito-count">{totalItemsCarrito}</span>
              </button>


              
              {isAuthenticated ? (
                <div className="d-flex align-items-center gap-2">
                  <span className="fs-6 fColor d-none d-sm-inline">
                    Hola, <strong className="fs-6 fw-bold text-success d-none d-sm-inline me-2">{usuario?.nombre || " "}</strong>
                  </span>                 

                  <button
                    type="button"
                    className="d-inline btn btn-outline-danger btn-sm fw-bold"
                    onClick={manejarCerrarSesion}
                  >
                    Cerrar sesión
                  </button>
                </div>
              ) : (
                <NavLink to="/login" className="d-inline btn btn-outline-success">
                  Iniciar sesión
                </NavLink>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import CarritoCompras from "./Carrito.jsx";
import { useCartContext } from "../context/CartContext";
import { useProducts } from "../context/ProductsContext";
import { useAuthContext } from "../context/AuthContext";

export default function Galeria() {
  const { productos, cargando, error } = useProducts();
  const { agregarAlCarrito } = useCartContext();
  const { isAdmin } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();

  const [busqueda, setBusqueda] = useState("");
  const [paginaActual, setPaginaActual] = useState(1);
  const guitarrasPorPagina = 6;

  const [mensajeCompra, setMensajeCompra] = useState("");
  const [resaltarCarrito, setResaltarCarrito] = useState(false);

  useEffect(() => {
    document.title = "Guitar Store | Galería de guitarras";

    const updateMetaTag = (name, content, attribute = "name") => {
      let meta = document.querySelector(`meta[${attribute}="${name}"]`);
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute(attribute, name);
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    updateMetaTag(
      "description",
      "Galería de guitarras eléctricas, acústicas y clásicas. Explorá el catálogo y encontrá tu próxima guitarra."
    );
    updateMetaTag(
      "keywords",
      "guitarras, guitarra eléctrica, guitarra acústica, guitarra clásica, instrumentos musicales"
    );
    updateMetaTag("author", "Guitar Store");
    updateMetaTag("robots", "index, follow");

    updateMetaTag(
      "og:title",
      "Guitar Store | Galería de guitarras",
      "property"
    );
    updateMetaTag(
      "og:description",
      "Explorá el catálogo de guitarras de Guitar Store.",
      "property"
    );
    updateMetaTag("og:type", "website", "property");
    updateMetaTag("og:url", window.location.href, "property");
  }, []);

  useEffect(() => {
    if (location.state?.compraOk) {
      setMensajeCompra("¡Tu compra se realizó con éxito! 🎸");

      window.history.replaceState({}, document.title, window.location.pathname);

      const timer = setTimeout(() => {
        setMensajeCompra("");
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [location.state]);

  if (cargando) return <p>Cargando guitarras...</p>;
  if (error) return <p>Ocurrió un error al cargar las guitarras: {error}</p>;

  if (!productos || !productos.length) {
    return (
      <>
        <p>No hay guitarras para mostrar.</p>
        <Link to="/">
          <button>Volver al inicio</button>
        </Link>
      </>
    );
  }

  // Filtro por búsqueda
  const busquedaLower = busqueda.toLowerCase();
  const guitarrasFiltradas = productos.filter((g) => {
    return (
      (g.marca && g.marca.toLowerCase().includes(busquedaLower)) ||
      (g.modelo && g.modelo.toLowerCase().includes(busquedaLower)) ||
      (g.tipo && g.tipo.toLowerCase().includes(busquedaLower))
    );
  });

  // Paginación
  const indiceUltima = paginaActual * guitarrasPorPagina;
  const indicePrimera = indiceUltima - guitarrasPorPagina;
  const guitarrasActuales = guitarrasFiltradas.slice(
    indicePrimera,
    indiceUltima
  );

  const totalPaginas = Math.ceil(
    guitarrasFiltradas.length / guitarrasPorPagina
  );

  const cambiarPagina = (num) => setPaginaActual(num);

  const manejarBusqueda = (e) => {
    setBusqueda(e.target.value);
    setPaginaActual(1);
  };

  const manejarEliminar = (guitarra) => {
    navigate(`/eliminar-producto/${guitarra.id}`, {
      state: { producto: guitarra },
    });
  };

  const manejarEditar = (guitarra) => {
    navigate("/agregar-producto", {
      state: { producto: guitarra },
    });
  };

  const manejarAgregarAlCarrito = (guitarra) => {
    agregarAlCarrito(guitarra);

    const carritoElem = document.getElementById("carrito-flotante");

    setResaltarCarrito(false);
    if (carritoElem) {
      void carritoElem.offsetWidth;
    }
    setResaltarCarrito(true);

    if (carritoElem) {
      const rect = carritoElem.getBoundingClientRect();
      const y = window.scrollY + rect.top - 100;
      window.scrollTo({ top: y, behavior: "smooth" });
    }

    setTimeout(() => {
      setResaltarCarrito(false);
    }, 600);
  };

  return (
    <>
      {mensajeCompra && (
        <div
          className="alert alert-success text-center fw-semibold"
          role="alert"
        >
          {mensajeCompra}
        </div>
      )}

      <h2 className="text-center my-4 fs-4">♪♫ Galería ♫♪</h2>
      <div className="container mt-4 bg-main rounded-3 p-4 shadow-sm">
        {/* Buscador */}
        <div className="row mb-4">
          <div className="col-12 col-md-6">
            <label className="form-label fw-bold mb-2 ">
              Buscar guitarras:
            </label>
            <input
              type="text"
              className="form-control rounded-3 border-secondary"
              placeholder="Buscar por marca, modelo o tipo..."
              value={busqueda}
              onChange={manejarBusqueda}
            />
            {busqueda && (
              <small className="text-muted">
                Mostrando {guitarrasFiltradas.length} de {productos.length} guitarras
              </small>
            )}
          </div>
        </div>

        {/* Grid de cards */}
        <div className="row">
          {guitarrasActuales.map((g) => {
            const stock =
              g.stock !== undefined && g.stock !== null
                ? Number(g.stock)
                : null;

            const sinStock = stock !== null && stock <= 0;

            return (
              <div key={g.id} className="col-12 col-md-6 col-lg-4 mb-4">
                <div className="card h-100 rounded-3 text-dark border-secondary shadow-sm">
                  {g.avatar && (
                    <img
                      src={g.avatar}
                      alt={`${g.marca} ${g.modelo}`}
                      className="card-img-top"
                    />
                  )}

                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">
                      Marca:<strong> {g.marca}</strong> <br />
                      Modelo: <strong>{g.modelo}</strong>
                    </h5>

                    {g.tipo && (
                      <p className="card-text">
                        Tipo: <strong>{g.tipo}</strong>
                      </p>
                    )}

                    <p className="card-text">
                      Precio: <strong>u$s {g.precio}</strong>
                    </p>

                    {stock !== null && (
                      <p
                        className={`card-text ${
                          sinStock ? "text-danger fw-bold" : ""
                        }`}
                      >
                        Stock:{" "}
                        <strong>{sinStock ? "Sin stock" : stock}</strong>
                      </p>
                    )}

                    <div className="mt-auto">
                      <div className="d-grid gap-2">
                        <Link
                          to={`/galeria/${g.id}`}
                          state={{ g }}
                          className="btn btn-info rounded-3 btn-sm"
                        >
                          Ver detalle
                        </Link>
                        <button
                          onClick={() => manejarAgregarAlCarrito(g)}
                          className="btn btn-sm rounded-3 btn-primary"
                          disabled={sinStock}
                        >
                          {sinStock ? "Sin stock" : "Agregar al carrito"}
                        </button>
                      </div>

                      {isAdmin && (
                        <div className="mt-3 pt-3 border-top">
                          <div className="d-flex gap-2">
                            <button
                              onClick={() => manejarEditar(g)}
                              className="btn btn-warning btn-sm flex-fill"
                            >
                              Editar
                            </button>
                            <button
                              onClick={() => manejarEliminar(g)}
                              className="btn btn-danger btn-sm flex-fill"
                            >
                              Eliminar
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ⬇ PAGINADOR: botones para cambiar de página */}
        {guitarrasFiltradas.length > guitarrasPorPagina && (
          <div className="d-flex justify-content-center my-4">
            {Array.from({ length: totalPaginas }, (_, index) => (
              <button
                key={index + 1}
                className={`btn mx-1 ${
                  paginaActual === index + 1
                    ? "btn-primary"
                    : "btn-outline-primary"
                }`}
                onClick={() => cambiarPagina(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        )}

        {/* ⬇ Info de página actual */}
        {guitarrasFiltradas.length > 0 && (
          <div className="text-center text-muted mt-2">
            <small>
              Mostrando {guitarrasActuales.length} guitarras (página{" "}
              {paginaActual} de {totalPaginas || 1})
            </small>
          </div>
        )}

        <div
          id="carrito-flotante"
          className={`mt-4 ${
            resaltarCarrito ? "carrito-flotante-resaltar" : ""
          }`}
        >
          <CarritoCompras />
        </div>

        <div className="text-center my-3">
          <Link to="/" className="btn btn-primary btn-lg p-1 fw-bold">
            Volver al inicio
          </Link>
        </div>
      </div>
    </>
  );
}



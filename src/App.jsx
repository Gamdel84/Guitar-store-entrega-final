import { Routes, Route } from "react-router-dom";
import Navbar from "./pages/Navbar.jsx";
import Footer from "./pages/Footer.jsx";
import Inicio from "./pages/Inicio.jsx";
import Galeria from "./pages/Galeria.jsx";
import DetalleGaleria from "./pages/DetalleGaleria.jsx";
import Servicios from "./pages/Servicios.jsx";
import Contacto from "./pages/Contacto.jsx";
import IniciarSesion from "./pages/Sesion.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import RutaProtegida from "./pages/RutaProtegida.jsx";
import Pagar from "./pages/Pagar.jsx";
import CarritoPagina from "./pages/Carrito.jsx";
import FormularioCarga from "./components/FormularioCarga.jsx";
import EliminarProducto from "./components/EliminarProducto.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import { ProductsProvider } from "./context/ProductsContext.jsx";

export default function App() {
  return (
    <>
      <AuthProvider>
        <CartProvider>
          <ProductsProvider>
            <Navbar />

            <Routes>
              <Route path="/" element={<Inicio />} />
              <Route path="/galeria" element={<Galeria />} />
              <Route path="/galeria/:id" element={<DetalleGaleria />} />
              <Route path="/servicios" element={<Servicios />} />
              <Route path="/contacto" element={<Contacto />} />
              <Route path="/login" element={<IniciarSesion />} />
              <Route path="/carrito" element={<CarritoPagina />} />

              <Route
                path="/pagar"
                element={
                  <RutaProtegida>
                    <Pagar />
                  </RutaProtegida>
                }
              />

              <Route
                path="/agregar-producto"
                element={
                  <RutaProtegida soloAdmin={true}>
                    <FormularioCarga />
                  </RutaProtegida>
                }
              />

              <Route
                path="/eliminar-producto/:id"
                element={
                  <RutaProtegida soloAdmin={true}>
                    <EliminarProducto />
                  </RutaProtegida>
                }
              />

              <Route
                path="/dashboard"
                element={
                  <RutaProtegida soloAdmin={true}>
                    <Dashboard />
                  </RutaProtegida>
                }
              />
            </Routes>

            <Footer />
          </ProductsProvider>
        </CartProvider>
      </AuthProvider>
    </>
  );
}

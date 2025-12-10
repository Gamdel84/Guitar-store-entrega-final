import { createContext, useContext, useEffect, useMemo, useState } from "react";

export const AuthContext = createContext(null);


const SESION_EXPIRADA = 5 * 60 * 1000;// SESION EXPIRA EN 5 MINUTOS A MODO DE PRUEBA RAPIDA DE OPERATIVIDAD

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);

  
  const cerrarSesion = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("authEmail");
    localStorage.removeItem("authNombre");
    localStorage.removeItem("authRol");
    localStorage.removeItem("authExpiracion");
    setUsuario(null);
  };

 
  useEffect(() => {
    try {
      const token = localStorage.getItem("authToken");
      const email = localStorage.getItem("authEmail");
      const nombre = localStorage.getItem("authNombre");
      const rol = localStorage.getItem("authRol") || "user";
      const expiracionStr = localStorage.getItem("authExpiracion");

      
      if (!token || !email || !expiracionStr) {
        cerrarSesion();
        return;
      }

      const expiracion = Number(expiracionStr);
      const ahora = Date.now();

      
      if (ahora >= expiracion) {
        cerrarSesion();
        return;
      }

      
      setUsuario({
        nombre: nombre || "",
        email,
        rol,
      });

      
      const tiempoRestante = expiracion - ahora;
      const timeoutId = setTimeout(() => {
        cerrarSesion();
      }, tiempoRestante);

      
      return () => clearTimeout(timeoutId);
    } finally {
      setCargando(false);
    }
  }, []);

  
  const iniciarSesion = ({ nombre, email, rol = "user" }) => {
    const token = `fake-token-${nombre || "user"}`;
    const expiracion = Date.now() + SESION_EXPIRADA;

    localStorage.setItem("authToken", token);
    localStorage.setItem("authEmail", email);
    localStorage.setItem("authNombre", nombre);
    localStorage.setItem("authRol", rol);
    localStorage.setItem("authExpiracion", expiracion.toString());

    setUsuario({ nombre, email, rol });

    
  };

  const isAuthenticated = !!usuario;
  const isAdmin = usuario?.rol === "admin";

  const value = useMemo(
    () => ({
      usuario,
      cargando,
      isAuthenticated,
      isAdmin,
      iniciarSesion,
      cerrarSesion,
    }),
    [usuario, cargando, isAuthenticated, isAdmin]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuthContext debe usarse dentro de AuthProvider");
  }
  return ctx;
}

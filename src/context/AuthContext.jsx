import { createContext, useContext, useEffect, useMemo, useState } from "react";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);

  
  useEffect(() => {
    try {
      const token = localStorage.getItem("authToken");
      const email = localStorage.getItem("authEmail");
      const nombre = localStorage.getItem("authNombre");
      const rol = localStorage.getItem("authRol");

      if (token && email) {
        setUsuario({
          nombre: nombre || "",
          email,
          rol: rol || "user",
        });
      }
    } finally {
      setCargando(false);
    }
  }, []);

  
  const iniciarSesion = ({ nombre, email, rol = "user" }) => {
    const token = `fake-token-${nombre || "user"}`;

    localStorage.setItem("authToken", token);
    localStorage.setItem("authEmail", email);
    localStorage.setItem("authNombre", nombre);
    localStorage.setItem("authRol", rol);

    setUsuario({ nombre, email, rol });
  };

  const cerrarSesion = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("authEmail");
    localStorage.removeItem("authNombre");
    localStorage.removeItem("authRol");
    setUsuario(null);
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

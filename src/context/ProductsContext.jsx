import { createContext, useContext, useEffect, useState } from "react";

const API_URL = "https://68e033f693207c4b4793f5d0.mockapi.io/api/guitars";

export const ProductsContext = createContext(null);

export function ProductsProvider({ children }) {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  // Cargar productos desde la API al iniciar
  useEffect(() => {
    const cargar = async () => {
      setCargando(true);
      setError(null);
      try {
        const res = await fetch(API_URL);
        if (!res.ok) {
          throw new Error("Error al cargar productos desde la API");
        }
        const data = await res.json();
        setProductos(data);
      } catch (e) {
        console.error(e);
        setError(e.message || "Error desconocido al cargar productos");
      } finally {
        setCargando(false);
      }
    };

    cargar();
  }, []);

  // Validación simple
 const validar = (producto) => {
  const errores = {};

  if (!producto.marca || !producto.marca.trim()) {
    errores.marca = "La marca es obligatoria.";
  }
  if (!producto.modelo || !producto.modelo.trim()) {
    errores.modelo = "El modelo es obligatorio.";
  }
  if (producto.precio === "" || producto.precio == null) {
    errores.precio = "El precio es obligatorio.";
  } else if (Number(producto.precio) <= 0) {
    errores.precio = "El precio debe ser mayor que 0.";
  }
  if (producto.stock !== undefined && producto.stock !== null && producto.stock !== "") {
    const n = Number(producto.stock);
    if (Number.isNaN(n) || n < 0) {
      errores.stock = "El stock debe ser un número mayor o igual a 0.";
    }
  }

  return errores;
};

  const agregarProducto = async (producto) => {
    const errores = validar(producto);
    if (Object.keys(errores).length > 0) {
      throw { type: "VALIDACION", errores };
    }

    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        marca: producto.marca,
        modelo: producto.modelo,
        precio: Number(
          typeof producto.precio === "string"
            ? producto.precio.replace(",", ".")
            : producto.precio
        ),
        tipo: producto.tipo || "",
        avatar: producto.avatar || "",
        stock: Number(producto.stock ?? 0),   // 👉 NUEVO
      }),
    });


    if (!res.ok) {
      throw new Error("Error al agregar el producto en la API");
    }

    const nuevo = await res.json();
    setProductos((prev) => [...prev, nuevo]);
    return nuevo;
  };

  const editarProducto = async (id, cambios) => {
    const actual = productos.find((p) => String(p.id) === String(id));
    if (!actual) {
      throw new Error("No se encontró el producto a editar");
    }

    const actualizado = {
      ...actual,
      ...cambios,
      precio: Number(
        typeof (cambios.precio ?? actual.precio) === "string"
          ? (cambios.precio ?? actual.precio).replace(",", ".")
          : cambios.precio ?? actual.precio
      ),
      stock: Number(cambios.stock ?? actual.stock ?? 0),   // 👉 NUEVO
    };


    const errores = validar(actualizado);
    if (Object.keys(errores).length > 0) {
      throw { type: "VALIDACION", errores };
    }

    const res = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(actualizado),
    });

    if (!res.ok) {
      throw new Error("Error al editar el producto en la API");
    }

    const data = await res.json();
    setProductos((prev) =>
      prev.map((p) => (String(p.id) === String(id) ? data : p))
    );
    return data;
  };

  const eliminarProducto = async (id) => {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      throw new Error("Error al eliminar el producto en la API");
    }

    setProductos((prev) => prev.filter((p) => String(p.id) !== String(id)));
  };

  const value = {
    productos,
    cargando,
    error,
    agregarProducto,
    editarProducto,
    eliminarProducto,
    validar,
  };

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  const ctx = useContext(ProductsContext);
  if (!ctx) {
    throw new Error("useProducts debe usarse dentro de ProductsProvider");
  }
  return ctx;
}

import { createContext, useContext, useEffect, useMemo, useState } from "react";

export const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [carrito, setCarrito] = useState([]);
  const [animarCarrito, setAnimarCarrito] = useState(false);


  
  useEffect(() => {
    try {
      const raw = localStorage.getItem("carrito");
      if (raw) {
        setCarrito(JSON.parse(raw));
      }
    } catch (e) {
      console.error(e);
      localStorage.removeItem("carrito");
    }
  }, []);

  
  useEffect(() => {
    try {
      localStorage.setItem("carrito", JSON.stringify(carrito));
    } catch (e) {
      console.error(e);
    }
  }, [carrito]);

  const agregarAlCarrito = (producto) => {
    setCarrito((prev) => {
      const idx = prev.findIndex((p) => String(p.id) === String(producto.id));
      if (idx > -1) {
        const copia = [...prev];
        const actual = copia[idx];
        copia[idx] = {
          ...actual,
          cantidad: (actual.cantidad || 1) + 1,
        };
        return copia;
      }
      return [...prev, { ...producto, cantidad: 1 }];
    });
    
      dispararAnimacionCarrito();
    };


  const agregarCantidad = (id) => {
    setCarrito((prev) =>
      prev.map((p) =>
        String(p.id) === String(id)
          ? { ...p, cantidad: (p.cantidad || 1) + 1 }
          : p
      )
    );
    dispararAnimacionCarrito();
  };

  const quitarCantidad = (id) => {
    setCarrito((prev) =>
      prev
        .map((p) =>
          String(p.id) === String(id)
            ? { ...p, cantidad: (p.cantidad || 1) - 1 }
            : p
        )
        .filter((p) => (p.cantidad || 1) > 0)
    );
    dispararAnimacionCarrito();
  };

  const quitarDelCarrito = (id) => {
    setCarrito((prev) => prev.filter((p) => String(p.id) !== String(id)));
  };

  const vaciarCarrito = () => {
    setCarrito([]);
  };

  const total = useMemo(
    () =>
      carrito.reduce(
        (acc, p) => acc + (p.precio || 0) * (p.cantidad || 1),
        0
      ),
    [carrito]
  );

  const dispararAnimacionCarrito = () => {
    // opcionalmente “reseteás” antes, por si querés asegurar el reinicio
    setAnimarCarrito(false);
    // forzar reflow si alguna vez ves que no se dispara bien:
    // void document.body.offsetWidth;
    setAnimarCarrito(true);

    setTimeout(() => {
      setAnimarCarrito(false);
    }, 500); // duración parecida a la animación CSS
  };

  const value = useMemo(
    () => ({
      carrito,
      agregarAlCarrito,
      agregarCantidad,
      quitarCantidad,
      quitarDelCarrito,
      vaciarCarrito,
      animarCarrito,
      setAnimarCarrito,
      dispararAnimacionCarrito,
      total,
    }),
    [carrito, total, animarCarrito]
  );

  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  );
}

export function useCartContext() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCartContext debe usarse dentro de CartProvider");
  }
  return ctx;
}

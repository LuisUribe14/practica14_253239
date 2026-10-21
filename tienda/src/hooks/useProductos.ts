import { useEffect, useState } from 'react';

import type { Producto } from '../datos';
import { obtenerProductos } from '../servicios/productos.service';

export function useProductos() {

  const [productos, setProductos] =
    useState<Producto[]>([]);

  const [cargando, setCargando] =
    useState(true);

  const [error, setError] =
    useState('');

  async function cargarProductos() {

    try {

      setCargando(true);
      setError('');

      const datos =
        await obtenerProductos();

      setProductos(datos);

    } catch {

      setError(
        'No se pudieron cargar los productos'
      );

    } finally {

      setCargando(false);

    }
  }

  useEffect(() => {

    cargarProductos();

  }, []);

  return {
    productos,
    cargando,
    error,
    reintentar: cargarProductos
  };
}
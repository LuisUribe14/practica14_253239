import { api } from '../api/cliente';
import type { Producto } from '../datos';

interface RespuestaProductos {
  data: Producto[];
  meta: unknown;
}

export async function obtenerProductos(): Promise<Producto[]> {

  const respuesta =
    await api.get<RespuestaProductos>('/productos');

  return respuesta.data.data;
}
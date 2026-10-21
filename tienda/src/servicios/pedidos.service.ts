import { api } from '../api/cliente';

interface CrearPedido {
  correo: string;
  telefono: string;
  productos: string[];
}

interface PedidoCreado {
  folio: string;
  total: number;
}

interface RespuestaPedido {
  data: PedidoCreado;
  meta: unknown;
}

export async function crearPedido(
  pedido: CrearPedido
): Promise<PedidoCreado> {

  const respuesta =
    await api.post<RespuestaPedido>(
      '/pedidos',
      pedido
    );

  return respuesta.data.data;
}
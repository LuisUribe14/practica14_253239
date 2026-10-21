import { useState } from 'react';
import axios from 'axios';
import { crearPedido } from './servicios/pedidos.service';

interface FormularioPagoProps {
  productos: string[];
  onPagado: (folio: string) => void;
}

export function FormularioPago({
  productos,
  onPagado
}: FormularioPagoProps) {

  const [correo, setCorreo] =
    useState('');

  const [telefono, setTelefono] =
    useState('');

  const [error, setError] =
    useState('');

  const [enviando, setEnviando] =
    useState(false);

  async function pagar(
    e: React.FormEvent<HTMLFormElement>
  ) {

    e.preventDefault();

    setError('');

    if (!correo.includes('@')) {
      setError('El correo no es válido');
      return;
    }

    if (!/^\d{10}$/.test(telefono)) {
      setError(
        'El teléfono debe tener 10 dígitos'
      );
      return;
    }

    if (productos.length === 0) {
      setError('El carrito está vacío');
      return;
    }

    try {

      setEnviando(true);

      const respuesta =
        await crearPedido({
          correo,
          telefono,
          productos
        });

      onPagado(respuesta.folio);

      setCorreo('');
      setTelefono('');

    } catch (error) {

      if (axios.isAxiosError(error)) {

        const mensaje =
          error.response?.data?.message;

        if (Array.isArray(mensaje)) {
          setError(mensaje.join(', '));
        } else {
          setError(
            mensaje ??
            'No se pudo completar el pedido'
          );
        }

      } else {

        setError(
          'No se pudo completar el pedido'
        );
      }

    } finally {

      setEnviando(false);
    }
  }

  return (
    <form
      className="pago"
      onSubmit={pagar}
    >

      <h2>Finalizar compra</h2>

      <label>
        Correo

        <input
          type="email"
          value={correo}
          onChange={(e) =>
            setCorreo(e.target.value)
          }
        />
      </label>


      <label>
        Teléfono

        <input
          type="tel"
          value={telefono}
          onChange={(e) =>
            setTelefono(e.target.value)
          }
        />
      </label>


      {error && (
        <p className="pago__error">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={enviando}
      >
        {
          enviando
            ? 'Procesando...'
            : 'Pagar'
        }
      </button>

    </form>
  );
}
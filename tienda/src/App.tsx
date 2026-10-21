import { useState } from 'react';
import { Catalogo } from './Catalogo';
import { Encabezado } from './Encabezado';
import { Layout } from './Layout';
import { PiePagina } from './PiePagina';
import { Filtros } from './Filtros';
import { Cargando } from './Cargando';
import { MensajeError } from './MensajeError';
import { FormularioPago } from './FormularioPago';
import { useProductos } from './hooks/useProductos';
import type { Producto } from './datos';

function App() {

  const {
    productos,
    cargando,
    error,
    reintentar
  } = useProductos();

  const [categoria, setCategoria] =
    useState('todas');

  const [carrito, setCarrito] =
    useState<Producto[]>([]);

  const [folio, setFolio] =
    useState('');

  const categorias = [
    'todas',
    ...new Set(
      productos.map(
        (p) => p.categoria
      )
    )
  ];

  const productosVisibles =
    categoria === 'todas'
      ? productos
      : productos.filter(
          (p) =>
            p.categoria === categoria
        );

  function agregarAlCarrito(
    producto: Producto
  ) {

    setCarrito((anterior) => [
      ...anterior,
      producto
    ]);
  }

  async function pedidoConfirmado(
    nuevoFolio: string
  ) {

    setFolio(nuevoFolio);

    setCarrito([]);

    await reintentar();
  }

  const piezas =
    carrito.length;

  const total =
    carrito.reduce(
      (acumulado, producto) =>
        acumulado + producto.precio,
      0
    );

  return (

    <Layout

      encabezado={
        <Encabezado
          piezas={piezas}
        />
      }

      pie={
        <PiePagina
          piezas={piezas}
          total={total}
        />
      }

    >

      <section className="portada">

        <h1>
          Catálogo de temporada
        </h1>

        {cargando && (
          <Cargando />
        )}

        {!cargando && error && (
          <MensajeError
            mensaje={error}
            onReintentar={reintentar}
          />
        )}

        {!cargando && !error && (
          <>

            <Filtros
              categorias={categorias}
              activa={categoria}
              onCambiar={setCategoria}
            />


            <Catalogo
              productos={productosVisibles}
              onAgregar={agregarAlCarrito}
            />

            <FormularioPago
              productos={
                carrito.map(
                  (producto) => producto.id
                )
              }
              onPagado={pedidoConfirmado}
            />

            {folio && (
              <p className="folio">
                Pedido confirmado:{" "}
                <strong>
                  {folio}
                </strong>
              </p>
            )}

          </>
        )}

      </section>

    </Layout>

  );
}

export default App;
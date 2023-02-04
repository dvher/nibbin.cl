import { Button, Grid, Stack } from "@mui/material";
import NavBar from "@components/NavBar";
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async (context) => {
  let query = context.query.q as string | null;

  if(!query) return {
    props: {
      products: null,
      query: "",
    },
  };

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_ADDR}/searchproducts?q=${query}`);
  const data = await res.json();

  const products = data.products;

  return {
    props: {
      products,
      query,
    },
  }
}

type Product = {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  descuento: number;
  stock: number;
  imagen: string;
}

export default function Search({ products, query }: { products: Array<Product> | null, query: string }) {
  if (typeof window !== "undefined") document.title = `Resultados de búsqueda para ${query} | Tienda`;

  if (products === null) return (
    <>
      <NavBar />
      <Grid
        container
        height="100vh"
        alignItems="center"
        justifyContent="center"
        direction="column"
      >
        <h1>No se encontraron resultados</h1>
        <Stack spacing={2} direction="row">
          <Button variant="contained" color="secondary" href="/">Volver al inicio</Button>
        </Stack>
      </Grid>
    </>
  );

  return (
    <>
      <NavBar />
      <Grid
        container
        height="100vh"
        alignItems="center"
        justifyContent="center"
        direction="column"
      >
        <h1>{products?.map(p => p.nombre)}</h1>
      </Grid>
    </>
  );
}

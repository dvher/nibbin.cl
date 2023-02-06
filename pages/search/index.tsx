import { Button, Grid, Stack, Typography, Divider } from "@mui/material";
import NavBar from "@components/NavBar";
import ProductComponent from "@components/ProductComponent";
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
        <Typography variant="h3" sx={{ fontFamily: 'VAG Rounded Next' }}>No se encontraron resultados</Typography>
        <Stack spacing={2} direction="row">
          <Button variant="contained" color="secondary" href="/" sx={{ fontFamily: 'VAG Rounded Next' }}>Volver al inicio</Button>
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
        <Grid item>
          <Typography variant="h3" sx={{ fontFamily: 'VAG Rounded Next' }}>Resultados de búsqueda para "<b>{query}</b>"</Typography>
        </Grid>
        <Grid item>
          <Stack spacing={2} direction="row">
            {products?.map(p => <ProductComponent key={p.id} id={p.id} nombre={p.nombre} descripcion={p.descripcion} precio={p.precio} descuento={p.descuento} stock={p.stock} imagen={p.imagen} />)}
          </Stack>
        </Grid>
      </Grid>
    </>
  );
}

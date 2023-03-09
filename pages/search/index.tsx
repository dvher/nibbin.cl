import { Button, Grid, Stack, ThemeProvider, Typography } from "@mui/material";
import NavBar from "@components/NavBar";
import ProductComponent from "@components/ProductComponent";
import { GetServerSideProps } from "next";
import theme from "../../theme/theme";

export const getServerSideProps: GetServerSideProps = async (context) => {
  let query = context.query.q as string | null;

  if(!query) return {
    props: {
      products: null,
      query: "",
    },
  };

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_ADDR}/searchproducts?q=${query}`);

  if(res.status !== 200) return {
    props: {
      products: null,
      query: "",
    },
  };

  const data = await res.json();

  const products = data.products as Product;

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
  isfavorite: boolean;
}

export default function Search({ products, query }: { products: Array<Product> | null, query: string }) {
  if (typeof window !== "undefined") document.title = `Resultados de búsqueda para ${query} | Tienda`;

  if (products === null) return (
    <ThemeProvider theme={theme}>
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
          <Button variant="contained" color="primary" href="/" sx={{ fontFamily: 'VAG Rounded Next' }}>Volver al inicio</Button>
        </Stack>
      </Grid>
    </ThemeProvider>
  );

  return (
    <ThemeProvider theme={theme}>
      <NavBar />
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        direction="column"
        spacing={2}
        sx={{ flexDirection: { xs: 'row', lg: 'column' }, marginTop: { xs: 0, lg: 10 } }}
      >
        <Grid item xs={0} lg={2} />
        <Grid item xs={4} lg={2} sx={{ marginTop: { xs: 10, lg: 0 } }}>
          <Typography variant="h3" sx={{ fontFamily: 'VAG Rounded Next' }}>Resultados de búsqueda para "<b>{query}</b>"</Typography>
        </Grid>
        <Grid item xs={8}>
          <Grid container alignContent="center" justifyContent="center" direction="row" flexGrow={1} spacing={2}>
            {products.map(p => (
              <Grid item xs={"auto"} key={p.id}>
                <ProductComponent id={p.id} nombre={p.nombre} descripcion={p.descripcion} precio={p.precio} descuento={p.descuento} stock={p.stock} imagen={p.imagen} isfavorite={p.isfavorite} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

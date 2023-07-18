import { Button, Grid, Stack, ThemeProvider, Typography } from "@mui/material";
import NavBar from "@components/NavBar";
import ProductComponent from "@components/ProductComponent";
import theme from "../../../theme";

type Product = {
  id: number;
  nombre: string;
  marca: string;
  descripcion: string;
  precio: number;
  descuento: number;
  stock: number;
  imagen: string;
  isfavorite: boolean;
}

export async function generateMetadata({ params }: { params: { query: string } }) {
  const query = params.query;
  
  return {
    title: `Resultados de búsqueda para "${query}"`,
  }
}

async function getProducts(query: string) {

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_ADDR}/search/product/${query}`);

  if(res.status !== 200) return null;

  const data = await res.json();

  const products = data.products as Array<Product>;

  return products;
}

export default async function Search({ params }: { params: { query: string } }) {
  const query = params.query;
  const products = await getProducts(query);

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
        <Typography variant="h5" sx={{ fontFamily: 'VAG Rounded Next' }}>No se encontraron resultados</Typography>
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
          <Typography variant="h5" sx={{ fontFamily: 'VAG Rounded Next' }}>Resultados de búsqueda para "<b>{query}</b>"</Typography>
        </Grid>
        <Grid item xs={8}>
          <Grid container alignContent="center" justifyContent="center" direction="row" flexGrow={1} spacing={2}>
            {products.map(p => (
              <Grid item xs={"auto"} key={p.id}>
                <ProductComponent id={p.id} nombre={p.nombre} marca={p.marca} descripcion={p.descripcion} precio={p.precio} descuento={p.descuento} stock={p.stock} imagen={p.imagen} isfavorite={p.isfavorite} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

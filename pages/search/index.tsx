import { Button, Grid, Stack } from "@mui/material";
import NavBar from "@components/NavBar";
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async (context) => {
  let query = context.query.q as string;

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

export default function Search({ products, query }: { products: any, query: string }) {
  if (typeof window !== "undefined") document.title = `Resultados de búsqueda para ${query} | Tienda`;
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
        <h1>Using Material UI with Next.js 13</h1>
        <Stack direction="row" columnGap={1}>
          <Button variant="text">Text</Button>
          <Button variant="contained">Contained</Button>
          <Button variant="outlined">Outlined</Button>
        </Stack>
      </Grid>
    </>
  );
}

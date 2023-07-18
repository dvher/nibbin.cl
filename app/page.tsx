import { Button, Grid, Stack, ThemeProvider } from "@mui/material";
import NavBar from "@components/NavBar";
import theme from "./theme";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nibbin",
  description: "Nibbin es una tienda online de productos de animales.",
}

export default function Index() {
  return (
    <ThemeProvider theme={theme}>
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
    </ThemeProvider>
  );
}

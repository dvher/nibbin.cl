import { Button, Grid, Stack, ThemeProvider, Typography } from "@mui/material";
import NavBar from "@components/NavBar";
import theme from "./theme";

export default function Product() {
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
        <Stack
          spacing={2}
          alignItems="center"
          justifyContent="center"
          textAlign="center"
        >
          <Typography variant="h3">Página no encontrada</Typography>
          <Typography variant="body1">La página que estás buscando no existe.</Typography>
          <Button variant="contained" href="/" color="primary">Volver al inicio</Button>
        </Stack>
      </Grid>
    </ThemeProvider>
  );
}

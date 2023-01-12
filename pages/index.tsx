import { Button, Grid, Stack } from "@mui/material";
import NavBar from "@components/NavBar";
export default function Index() {
  if (typeof window !== "undefined") document.title = "Nibbin";
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

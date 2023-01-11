import { Button, Grid, OutlinedInput, Typography, FormControl, TextField, InputAdornment, IconButton, InputLabel } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState, MouseEvent } from "react";
import NavBar from '@components/NavBar'
export default function Ej() {

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const width = 250;

  return (
    <>
        <NavBar/>
        <Grid container height="100vh" alignItems="center" justifyContent="center" direction="column">
          <Grid item>
            <Typography sx={{ fontFamily: "VAG Rounded Next" }} variant="h3">Iniciar sesión</Typography>
          </Grid>
          <form action="/log" method="POST">
            <Grid item>
              <FormControl sx={{ width, mt: 5, maxWidth: "70vw" }}>
                  <TextField fullWidth type="email" name="email" id="email" label="Email" />
              </FormControl>
            </Grid>
            <Grid item>
              <FormControl sx={{ width, mt: 2, maxWidth: "70vw" }}>
                <InputLabel htmlFor="password">Contraseña</InputLabel>
                <OutlinedInput
                  fullWidth
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Contraseña"
                />
              </FormControl>
            </Grid>
            <Grid item>
              <FormControl sx={{ width, mt: 2, maxWidth: "70vw" }}>
                <Button variant="contained" type="submit" color="secondary">Iniciar sesión</Button>
              </FormControl>
            </Grid>
          </form>
        </Grid>
    </>
  );
}

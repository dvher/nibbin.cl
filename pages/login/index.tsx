import {
  Button,
  Grid,
  Typography,
  FormControl,
  TextField,
  Modal,
  Box,
  Fade,
  Backdrop,
  ThemeProvider
} from "@mui/material";
import theme from '../../theme/theme';
import NavBar from "@components/NavBar";
import { FormEvent, useState } from "react";
import { MuiOtpInput } from 'mui-one-time-password-input';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/router";
import { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function matchIsNumeric(text: string) {
  const isNumber = !isNaN(+text)
  return (isNumber || text === '')
}

const validateChar = (value: string, _index: number) => {
  return matchIsNumeric(value)
}

export default function Login() {
  if (typeof window !== "undefined") document.title = "Iniciar Sesión";

  const router = useRouter();

  const [email, setEmail] = useState("");
  const [openOTP, setOpenOTP] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);
  const [otp, setOtp] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [usuario, setUsuario] = useState("");
  const [direccion, setDireccion] = useState("");
  const [telefono, setTelefono] = useState("");
  const [nacimiento, setNacimiento] = useState<Dayjs | null>(null);
  const [tries, setTries] = useState(3);
  const handleOpenOTP = () => setOpenOTP(true);
  const handleCloseOTP = () => {setOpenOTP(false); setOtp(""); setTries(3);}
  const onChangeOTP = (value: string) => setOtp(value);

  const submitEmail = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let sending = toast("Enviando correo", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      type: "info",
    });
    fetch(`${process.env.NEXT_PUBLIC_API_ADDR}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      credentials: "include",
      body: JSON.stringify({
        email,
      }),
    }).then((res) => {
      toast.dismiss(sending);
      if (res.ok) {
        handleOpenOTP();
        toast("Correo enviado", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          type: "success",
        });
      } else {

        let msg: string;

        switch(res.status) {
          case 400:
            msg = "Correo no válido";
            break;
          case 500:
            msg = "Error al enviar correo";
            break;
          default:
            msg = "Error desconocido"
            break;
        }

        toast(msg, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          type: "error",
        });
      }
    });

  }

  const submitOTP = (value: string) => {
    fetch(`${process.env.NEXT_PUBLIC_API_ADDR}/verify`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      credentials: "include",
      body: JSON.stringify({
        otp: value,
        email,
      }),
    }).then((res) => {
      if (res.ok) {
        handleCloseOTP();
        res.json().then((data) => {
          let message = data.message as string;
          if(message.includes("unregistered")) {
            setOpenRegister(true);
          } else {
            router.push("/");
          }
        });
      } else {
        setTries(tries - 1);
        if(tries > 0){
          toast(`Código incorrecto, te quedan ${tries} intentos`, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            type: "error",
          });
        } else {
          toast("Has agotado tus intentos", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            type: "error",
          });
          handleCloseOTP();
        }
      }
    });
  }

  const submitRegister = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    fetch(`${process.env.NEXT_PUBLIC_API_ADDR}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      credentials: "include",
      body: JSON.stringify({
        email,
        nombre,
        apellido,
        user: usuario,
        direccion,
        telefono,
        nacimiento: nacimiento?.format("YYYY-MM-DD"),
      }),
    }).then((res) => {
      if (res.ok) {
        toast("Usuario registrado", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          type: "success",
        });
        setOpenRegister(false);
        router.push("/");
      } else {
        res.json().then((data) => {
          let message = data.message as string;
          
          toast(message, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            type: "error",
          });
        });
      }
    });
  }

  const width = 250;

  return (
    <ThemeProvider theme={theme}>
      <NavBar />
      <ToastContainer />
      <Grid
        container
        height="100vh"
        alignItems="center"
        justifyContent="center"
        direction="column"
      >
        <Grid item>
          <Typography variant="h3">
            Iniciar sesión
          </Typography>
        </Grid>
        <form onSubmit={submitEmail}>
          <Grid item>
            <FormControl sx={{ width, mt: 5, maxWidth: "70vw" }}>
              <TextField
                fullWidth
                type="email"
                name="email"
                id="email"
                label="Email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
              />
            </FormControl>
          </Grid>
          <Grid item>
            <FormControl sx={{ width, mt: 2, maxWidth: "70vw" }}>
              <Button variant="contained" type="submit" color="primary">
                Iniciar Sesión
              </Button>
            </FormControl>
          </Grid>
        </form>
      </Grid>
      <Modal
        open={openOTP}
        onClose={handleCloseOTP}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
      >
        <Fade in={openOTP}>
          <Box sx={style}>
            <Grid container direction="column" spacing={2}>
              <Grid item>
                <Typography variant="h5">Código de validación</Typography>
              </Grid>
              <Grid item>
              <MuiOtpInput validateChar={validateChar} value={otp} onChange={onChangeOTP} length={6} placeholder="-" onComplete={submitOTP} TextFieldsProps={{ placeholder: '-', size: 'small' }} />
              </Grid>
            </Grid>
          </Box>
        </Fade>
      </Modal>
      <Modal
        open={openRegister}
        onClose={() => setOpenRegister(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
      >
        <Fade in={openRegister}>
          <Box sx={style}>
            <form onSubmit={submitRegister}>
              <Grid container direction="column" spacing={2}>
                <Grid item>
                  <Typography variant="h5">Registrarse</Typography>
                </Grid>
                <Grid item>
                  <TextField
                    fullWidth
                    type="text"
                    name="name"
                    id="name"
                    label="Nombres"
                    onChange={(e) => setNombre(e.target.value)}
                    value={nombre}
                    required
                  />
                </Grid>
                <Grid item>
                  <TextField
                    fullWidth
                    type="text"
                    name="lastname"
                    id="lastname"
                    label="Apellidos"
                    onChange={(e) => setApellido(e.target.value)}
                    value={apellido}
                    required
                  />
                </Grid>
                <Grid item>
                  <TextField
                    fullWidth
                    type="text"
                    name="user"
                    id="user"
                    label="Usuario"
                    onChange={(e) => setUsuario(e.target.value)}
                    value={usuario}
                    required
                  />
                </Grid>
                <Grid item>
                  <TextField
                    fullWidth
                    type="text"
                    name="direccion"
                    id="direccion"
                    label="Dirección"
                    onChange={(e) => setDireccion(e.target.value)}
                    value={direccion}
                    required
                  />
                </Grid>
                <Grid item>
                  <TextField
                    fullWidth
                    type="tel"
                    name="telefono"
                    id="telefono"
                    label="Telefono"
                    onChange={(e) => setTelefono(e.target.value)}
                    value={telefono}
                    required
                  />
                </Grid>
                <Grid item>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Fecha de nacimiento"
                      value={nacimiento}
                      onChange={(newValue) => {
                        setNacimiento(newValue);
                      }}
                      renderInput={(params) => <TextField {...params} />}
                      className="datePicker"
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item>
                  <Button variant="contained" type="submit" color="primary">
                    Registrarme
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Fade>
      </Modal>
    </ThemeProvider>
  );
}

import {
  AppBar,
  Toolbar,
  Typography,
  Menu,
  MenuItem,
  Box,
  IconButton,
  Button,
  Container,
  InputBase,
} from "@mui/material";
import Link from "next/link";
import MenuIcon from "@mui/icons-material/Menu";
import AdbIcon from "@mui/icons-material/Adb";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useState, MouseEvent } from "react";
import { styled, alpha } from "@mui/material/styles";

interface NavBarProps {
  isLogged?: boolean;
}

export default function NavBar({ isLogged }: NavBarProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleOpen = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const pages = [
    !isLogged ? ["Iniciar Sesión", "/login"] : ["Mi perfil", "/profile"],
    ["Sobre nosotros", "/about"],
    ["Contacto", "/contact"],
  ];

  isLogged && pages.push(["Cerrar Sesión", "/logout"]);

  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  }));

  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        width: "12ch",
        "&:focus": {
          width: "20ch",
        },
      },
    },
  }));

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: "#9c27b0",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "VAG Rounded Next",
              fontWeight: 700,
              letterSpacing: ".5rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Nibbin
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpen}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map(([page, url]) => (
                <MenuItem key={page} onClick={handleClose}>
                  <Link href={url}>{page}</Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "VAG Rounded Next",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Nibbin
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map(([page, url]) => (
              <Button
                key={page}
                onClick={handleClose}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                <Link href={url}>
                  <Typography
                    sx={{ fontWeight: "bold", fontFamily: "VAG Rounded Next" }}
                  >
                    {page}
                  </Typography>
                </Link>
              </Button>
            ))}
          </Box>
          <Search sx={{ display: { xs: "none", md: "flex" } }}>
            <form action="search" method="GET">
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Buscar..."
                inputProps={{ "aria-label": "search" }}
                name="q"
              />
              <Button
                type="submit"
                sx={{ display: "none"}}
              />
            </form>
          </Search>
          <Box sx={{ display: { xs: "none", md: "flex" }, ml: 4 }}>
            <Link href="/cart">
              <ShoppingCartIcon sx={{ color: "white", my: 2, mx: 1 }} />
            </Link>
            <Link href="/wishlist">
              <FavoriteIcon sx={{ color: "white", my: 2, mx: 1 }} />
            </Link>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

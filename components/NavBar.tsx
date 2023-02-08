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
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Drawer,
  Tooltip,
} from "@mui/material";
import Link from "next/link";
import MenuIcon from "@mui/icons-material/Menu";
import AdbIcon from "@mui/icons-material/Adb";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CloseIcon from '@mui/icons-material/Close';
import { useState, MouseEvent, useEffect } from "react";
import { styled, alpha } from "@mui/material/styles";

export default function NavBar() {

  const drawerWidth = '100vw';
  const [isLogged, setIsLogged] = useState(false);
  const [_user, setUser] = useState("");
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(prevstate => !prevstate);
  };

  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_ADDR}/islogged`, {
      credentials: "include",
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if(!res.ok) {
        setIsLogged(false);
        return;
      }
      res.json().then((data) => {
        setIsLogged(data.user ?? false);
        setUser(data.user ?? '');
      });
    });
  }, []);

  const pages = [
    ["Sobre nosotros", "/about"],
    ["Contacto", "/contact"],
  ];

  !isLogged && pages.unshift(["Iniciar sesión", "/login"]);

  const settings = [
    ["Mi perfil", "/profile"],
    ["Mis pedidos", "/orders"],
    ["Cerrar Sesión", "/logout"]
  ]

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

  const drawer = (
    <Box sx={{ textAlign: 'center' }}>
      <CloseIcon sx={{ cursor: 'pointer', zIndex: 2, position: "absolute", right: 15, top: 15 }} onClick={handleDrawerToggle} />
      <Typography variant="h6" sx={{ my: 2, fontFamily: 'VAG Rounded Next' }}>
        Nibbin
      </Typography>
      <Divider />
      <List>
        {pages.map((page, idx) => (
          <ListItem key={idx} disablePadding>
            <ListItemButton href={page[1]} sx={{ textAlign: 'center' }}>
              <ListItemText primary={page[0]} />
            </ListItemButton>
          </ListItem>
        ))}
        <ListItem disablePadding sx={{ display: { xs: "flex", md: "none" } }}>
          <ListItemButton href="/cart" sx={{ textAlign: 'center' }}>
            <ListItemText primary="Carrito" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding sx={{ display: { xs: "flex", md: "none" } }}>
          <ListItemButton href="/wishlist" sx={{ textAlign: 'center' }}>
            <ListItemText primary="Favoritos" />
          </ListItemButton>
        </ListItem>
      </List>
      <Search sx={{ display: { xs: "flex", md: "none" } }}>
        <form action="search" method="GET">
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Buscar..."
            inputProps={{ "aria-label": "search" }}
            name="q"
            required
          />
          <Button
            type="submit"
            sx={{ display: "none"}}
          />
        </form>
      </Search>
      <br />
    </Box>
  );

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
              onClick={handleDrawerToggle}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Drawer
              variant="temporary"
              anchor="top"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              ModalProps={{
                keepMounted: true,
              }}
              sx={{
                display: { xs: "block", md: "none" },
                "& .MuiDrawer-paper": {
                  boxSizing: "border-box",
                  width: drawerWidth,
                  backgroundColor: "#9c27b0",
                  color: "white",
                },
              }}
            >
              {drawer}
            </Drawer>
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
                required
              />
              <Button
                type="submit"
                sx={{ display: "none"}}
              />
            </form>
          </Search>
          <Box sx={{ display: { xs: "none", md: "flex" }, ml: 4 }}>
            <Link href="/cart">
              <ShoppingCartIcon sx={{ color: "white", my: 2, mx: 1, verticalAlign: "middle" }} />
            </Link>
            <Link href="/wishlist">
              <FavoriteIcon sx={{ color: "white", my: 2, mx: 1, verticalAlign: "middle" }} />
            </Link>
          </Box>
          {isLogged ? (<Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Opciones de usuario">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <AccountCircleIcon sx={{ color: "white", my: 2, mx: 1, verticalAlign: "middle" }} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting, idx) => (
                <MenuItem key={idx} onClick={handleCloseUserMenu}>
                  <Link href={setting[1]}>{setting[0]}</Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>) : ''}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

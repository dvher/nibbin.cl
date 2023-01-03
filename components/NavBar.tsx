import { AppBar, Toolbar, Typography, Menu, MenuItem, Box, IconButton, Button } from "@mui/material";
import Link from 'next/link';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from "react";

export default function NavBar() {

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const pages = [["Iniciar Sesión", "/login"], ["Sobre nosotros", "/about"], ["Contacto", "/contact"]];

    return (
        <AppBar position="static" sx={{
            backgroundColor: "#86E3CE",
        }}>
            <Toolbar disableGutters>
                <Typography variant="h6" component="div" sx={{ flexGrow: 0 }}>
                Nibbin
                </Typography>
                <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
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
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                  sx={{
                    display: { xs: 'block', md: 'none' },
                  }}
                >
                  {pages.map(([page, url]) => (
                    <MenuItem key={page} onClick={handleClose}>
                      <Link href={url}>{page}</Link>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
              <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                {pages.map(([page, url]) => (
                    <Button key={page} onClick={handleClose}>
                      <Link href={url}>
                        <Typography sx={{ my: 2, color: 'white', display: 'block' }}>{page}</Typography>
                      </Link>
                    </Button>
                ))}
              </Box>
            </Toolbar>
        </AppBar>
    );
}

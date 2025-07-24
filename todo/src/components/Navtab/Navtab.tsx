import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import TipsAndUpdatesRoundedIcon from '@mui/icons-material/TipsAndUpdatesRounded';
import { Link as RouterLink } from 'react-router-dom';
import { Stack } from '@mui/material';
import { getAuth, onAuthStateChanged, type User } from "firebase/auth";
import { app } from '../../firebase/firebase';
import { useState, useEffect } from 'react'

const settings = ['Logout'];

function ResponsiveAppBar() {

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);



  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };


  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  getAuth(app);
  // use 'user' from state instead of redeclaring

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <TipsAndUpdatesRoundedIcon sx={{ display: 'flex', mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"

              sx={{
                mr: 2,
                display: 'flex',
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              Taskz
            </Typography>

          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Stack direction='row' sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant='h6' sx={{ mr: 2, display: { xs: 'none', sm: 'flex', md: 'flex' } }}>Olá, {user?.displayName}</Typography>
              <Tooltip title="Abrir configurações">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt={user?.displayName ?? ''} src={user?.photoURL ?? ''} />
                </IconButton>
              </Tooltip>
            </Stack>

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
              <MenuItem sx={{ display: { sm: 'none', md: 'none', xs: 'flex' } }} >
                <Typography color='primary' fontSize={20}>Olá, {user?.displayName}!</Typography>
              </MenuItem>
              {settings.map((setting) => (

                <MenuItem key={setting} onClick={handleCloseUserMenu} sx={{ textAlign: 'end' }}>
                  <Typography><RouterLink to={'/login'} style={{ textDecoration: 'none', color: 'black' }}>{setting}</RouterLink></Typography>
                </MenuItem>

              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;

import * as React from 'react';

//material ui
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
import { Stack } from '@mui/material';

//icones
import TipsAndUpdatesRoundedIcon from '@mui/icons-material/TipsAndUpdatesRounded';
import TipsAndUpdatesOutlinedIcon from '@mui/icons-material/TipsAndUpdatesOutlined';

//routes
import { Link as RouterLink } from 'react-router-dom';

//firebase
import { getAuth, onAuthStateChanged, type User } from "firebase/auth";
import { app } from '../../firebase/firebase';

import { useState, useEffect } from 'react'
import { useContext } from 'react';
import { ColorModeContext } from '../../context/ThemeContext';


const settings = ['Logout'];

function ResponsiveAppBar() {

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const [user, setUser] = useState<User | null>(null)
  const { mode, toggleColorMode } = useContext(ColorModeContext);
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


  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton onClick={toggleColorMode} >
              {mode === 'dark'
                ? <TipsAndUpdatesOutlinedIcon />
                : <TipsAndUpdatesRoundedIcon sx={{ color: '#fff !important' }} />
              }

            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="a"
              sx={{
                pl: 1,
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
                  {
                    mode === "dark" ? (
                      
                    <Typography>
                      <RouterLink to={'/login'} style={{ textDecoration: 'none', color: 'white' }}>{setting}</RouterLink>
                    </Typography>
                    ) : (
                    <Typography>
                      <RouterLink to={'/login'} style={{ textDecoration: 'none', color: 'black' }}>{setting}</RouterLink>
                    </Typography>

                    )
                  }
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

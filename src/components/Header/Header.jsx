// src/components/Header.js
import React, { useContext } from 'react';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import Link from '@mui/material/Link';
import { AuthContext } from '../../contexts/AuthContext';
import RunningIcon from '../../assets/Icons/running.svg';

const logoStyle = {
  width: '70px',
  height: 'auto',
  cursor: 'pointer',
  padding: '0px 10px',
};

function Header() {
  const [open, setOpen] = React.useState(false);
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const handleSignOut = () => {
    setIsLoggedIn(false);
  };

  const scrollToSection = (sectionId) => {
    const sectionElement = document.getElementById(sectionId);
    const offset = 128;
    if (sectionElement) {
      const targetScroll = sectionElement.offsetTop - offset;
      sectionElement.scrollIntoView({ behavior: 'smooth' });
      window.scrollTo({
        top: targetScroll,
        behavior: 'smooth',
      });
      setOpen(false);
    }
  };

  return (
    <div>
      <AppBar
        position="fixed"
        sx={{
          boxShadow: 0,
          bgcolor: 'transparent',
          backgroundImage: 'none',
          mt: 2,
        }}
      >
        <Container maxWidth="lg">
          <Toolbar
            variant="regular"
            sx={(theme) => ({
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexShrink: 0,
              borderRadius: '999px',
              bgcolor:
                theme.palette.mode === 'light'
                  ? 'rgba(255, 255, 255, 0.4)'
                  : 'rgba(0, 0, 0, 0.4)',
              backdropFilter: 'blur(24px)',
              maxHeight: 40,
              border: '1px solid',
              borderColor: 'divider',
              boxShadow:
                theme.palette.mode === 'light'
                  ? `0 0 1px rgba(85, 166, 246, 0.1), 1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)`
                  : '0 0 1px rgba(2, 31, 59, 0.7), 1px 1.5px 2px -1px rgba(2, 31, 59, 0.65), 4px 4px 12px -2.5px rgba(2, 31, 59, 0.65)',
            })}
          >
            <Box
              sx={{
                flexGrow: 1,
                display: 'flex',
                alignItems: 'center',
                ml: '-18px',
                px: 0,
              }}
            >
              <Link href="/">
                <img src={RunningIcon} style={logoStyle} alt="logo of sitemark" />
              </Link>
              <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                <MenuItem
                  onClick={() => scrollToSection('favourites')}
                  sx={{ py: '6px', px: '12px' }}
                >
                  <Typography variant="body1" color="text.primary">
                    Favourite Runs
                  </Typography>
                </MenuItem>
                <MenuItem
                  onClick={() => scrollToSection('contact-us')}
                  sx={{ py: '6px', px: '12px' }}
                >
                  <Link href="https://www.strava.com" target="_blank" rel="noopener noreferrer">
                    <Typography variant="body1" color="text.primary">
                      Go to Strava
                    </Typography>
                  </Link>
                </MenuItem>
              </Box>
            </Box>
            <Box
              sx={{
                display: { xs: 'none', md: 'flex' },
                gap: 0.5,
                alignItems: 'center',
              }}
            >
              {isLoggedIn ? (
                <Button
                  color="primary"
                  variant="text"
                  size="small"
                  onClick={handleSignOut}
                >
                  Sign out
                </Button>
              ) : (
                <>
                  <Button
                    color="primary"
                    variant="text"
                    size="small"
                    component="a"
                    href="/signin"
                  >
                    Sign in
                  </Button>
                  <Button
                    color="primary"
                    variant="contained"
                    size="small"
                    component="a"
                    href="/signup"
                  >
                    Sign up
                  </Button>
                </>
              )}
            </Box>
            <Box sx={{ display: { sm: '', md: 'none' } }}>
              <Button
                variant="text"
                color="primary"
                aria-label="menu"
                onClick={toggleDrawer(true)}
                sx={{ minWidth: '30px', p: '4px' }}
              >
                <MenuIcon />
              </Button>
              <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
                <Box
                  sx={{
                    minWidth: '60dvw',
                    p: 2,
                    backgroundColor: 'background.paper',
                    flexGrow: 1,
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'end',
                      flexGrow: 1,
                    }}
                  ></Box>
                  <MenuItem onClick={() => scrollToSection('favourites')}>
                    Favourite Runs
                  </MenuItem>
                  <MenuItem onClick={() => scrollToSection('contact-us')}>
                    Contact Us
                  </MenuItem>
                  <MenuItem onClick={() => scrollToSection('faq')}>FAQ</MenuItem>
                  <Divider />
                  {isLoggedIn ? (
                    <MenuItem>
                      <Button
                        color="primary"
                        variant="contained"
                        onClick={handleSignOut}
                        sx={{ width: '100%' }}
                      >
                        Sign out
                      </Button>
                    </MenuItem>
                  ) : (
                    <>
                      <MenuItem>
                        <Button
                          color="primary"
                          variant="contained"
                          component="a"
                          href="/signup"
                          sx={{ width: '100%' }}
                        >
                          Sign up
                        </Button>
                      </MenuItem>
                      <MenuItem>
                        <Button
                          color="primary"
                          variant="outlined"
                          component="a"
                          href="/signin"
                          sx={{ width: '100%' }}
                        >
                          Sign in
                        </Button>
                      </MenuItem>
                    </>
                  )}
                </Box>
              </Drawer>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}

export default Header;

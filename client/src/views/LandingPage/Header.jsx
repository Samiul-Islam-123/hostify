import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';

function Header() {
  return (
    <AppBar position="static" elevation={0} sx={{ backgroundColor: 'transparent' }}>
      <Toolbar sx={{ justifyContent: 'space-between', padding: { xs: '16px', md: '24px 64px' } }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', color: 'white' }}>
            Hostify
          </Typography>
          <Box sx={{ display: { xs: 'none', md: 'flex' }, marginLeft: 4 }}>
            <Button color="inherit" sx={{ textTransform: 'none', marginRight: 2 }}>Features</Button>
            <Button color="inherit" sx={{ textTransform: 'none', marginRight: 2 }}>Platforms</Button>
            <Button color="inherit" sx={{ textTransform: 'none', marginRight: 2 }}>Pricing</Button>
            <Button color="inherit" sx={{ textTransform: 'none' }}>FAQ</Button>
          </Box>
        </Box>
        <Box>
          <Button color="inherit" sx={{ textTransform: 'none', marginRight: 2 }}>Login</Button>
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#00D1A3', // Greenish color from screenshots
              color: 'black',
              textTransform: 'none',
              '&:hover': {
                backgroundColor: '#00B89C',
              },
            }}
          >
            Sign up free
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
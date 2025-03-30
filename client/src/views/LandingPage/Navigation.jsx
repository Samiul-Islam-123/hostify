import React from 'react';
import { AppBar, Box, Button, Toolbar, Typography, IconButton, useMediaQuery, useTheme } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const Navigation = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <AppBar position="sticky" color="transparent" elevation={0} sx={{ backdropFilter: 'blur(10px)' }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
          Hostify
        </Typography>

        {!isMobile ? (
          <Box sx={{ display: 'flex', mx: 4 }}>
            {['Home', 'Features', 'Pricing', 'Docs', 'Contact'].map((item) => (
              <Button key={item} color="inherit" sx={{ mx: 1 }}>
                {item}
              </Button>
            ))}
          </Box>
        ) : (
          <IconButton edge="end" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;

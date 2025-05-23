import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow'; // Or appropriate icon for "View documentation"

function HeroSection() {
  return (
    <Container maxWidth="lg" sx={{ textAlign: 'center', py: { xs: 8, md: 12 } }}>
      <Typography
        variant="h3"
        component="h1"
        sx={{
          fontWeight: 'bold',
          mb: 4,
          fontSize: { xs: '2.5rem', md: '3.5rem' },
          lineHeight: 1.2,
          color: 'white',
        }}
      >
        Host everything from <span style={{ color: '#00D1A3' }}>static sites</span> to <span style={{ color: '#00D1A3' }}>full-stack apps</span>
      </Typography>
      <Typography variant="h6" sx={{ mb: 6, maxWidth: 800, mx: 'auto', color: '#B0B0B0' }}>
        Deploy and scale web applications with ease. Hostify provides the infrastructure, so you can focus on creating amazing experiences.
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 8 }}>
        <Button
          variant="contained"
          sx={{
            backgroundColor: '#00D1A3',
            color: 'black',
            textTransform: 'none',
            fontSize: '1.1rem',
            px: 4,
            py: 1.5,
            '&:hover': {
              backgroundColor: '#00B89C',
            },
          }}
        >
          Start deploying
        </Button>
        <Button
          variant="outlined"
          sx={{
            borderColor: '#00D1A3',
            color: '#00D1A3',
            textTransform: 'none',
            fontSize: '1.1rem',
            px: 4,
            py: 1.5,
            '&:hover': {
              backgroundColor: 'rgba(0, 209, 163, 0.1)',
            },
          }}
          startIcon={<PlayArrowIcon />} // Or a document icon
        >
          View documentation
        </Button>
      </Box>

      {/* Terminal Illustration */}
      <Box
        sx={{
          backgroundColor: '#2D3E4F',
          borderRadius: 2,
          p: 3,
          maxWidth: 700,
          mx: 'auto',
          textAlign: 'left',
          fontFamily: 'monospace',
          fontSize: '0.9rem',
          boxShadow: '0px 8px 20px rgba(0,0,0,0.4)',
        }}
      >
        <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
          <Box sx={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#FF5F56' }} />
          <Box sx={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#FFBD2E' }} />
          <Box sx={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#27C93F' }} />
        </Box>
        <Typography sx={{ color: '#00D1A3' }}>$</Typography>
        <Typography sx={{ color: 'white' }}>hostify deploy production</Typography>
        <Typography sx={{ color: '#B0B0B0' }}>✓ Initializing deployment</Typography>
        <Typography sx={{ color: '#B0B0B0' }}>✓ Project initiated</Typography>
        <Typography sx={{ color: '#B0B0B0' }}>✓ Files uploaded (378 files)</Typography>
        <Typography sx={{ color: '#B0B0B0' }}>✓ Build completed</Typography>
        <Typography sx={{ color: '#B0B0B0' }}>✓ Deployment successful!</Typography>
        <Box sx={{ mt: 3, display: 'flex', alignItems: 'center' }}>
          <Typography sx={{ color: '#B0B0B0', mr: 1 }}>Production URL:</Typography>
          <Typography sx={{ color: '#00D1A3' }}>https://your-app.hostify.app</Typography>
        </Box>
      </Box>

      {/* Trusted by companies */}
      <Box sx={{ mt: { xs: 8, md: 12 }, pt: { xs: 4, md: 6 }, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
        <Typography variant="body2" sx={{ color: '#B0B0B0', mb: 3 }}>
          Trusted by thousands of developers and companies
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: { xs: 4, md: 8 } }}>
          {['acme', 'TechCorp', 'devflow', 'Innovation.io', 'NextLevel'].map((company, index) => (
            <Typography key={index} variant="h6" sx={{ fontWeight: 'bold', color: '#B0B0B0', opacity: 0.7 }}>
              {company}
            </Typography>
          ))}
        </Box>
      </Box>
    </Container>
  );
}

export default HeroSection;
import React from 'react';
import { Box, Button, Container, Typography, Paper } from '@mui/material';

const Hero = () => {
  return (
    <Box
      sx={{
        pt: 12,
        pb: 8,
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h2"
          component="h1"
          sx={{
            fontWeight: 800,
            mb: 3,
            background: 'linear-gradient(90deg, #60a5fa, #a78bfa)',
            backgroundClip: 'text',
            textFillColor: 'transparent',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Deploy Anything, Scale Effortlessly
        </Typography>
        <Typography variant="h5" color="text.secondary" sx={{ mb: 4, maxWidth: '800px', mx: 'auto' }}>
          Host frontend, backend, databases, or full-stack applications with ease.
        </Typography>
        <Button
          variant="contained"
          size="large"
          color="primary"
          sx={{
            py: 1.5,
            px: 4,
            borderRadius: 2,
            fontSize: '1.1rem',
            textTransform: 'none',
            boxShadow: '0 4px 14px 0 rgba(96, 165, 250, 0.4)',
          }}
        >
          Get Started for Free
        </Button>

        {/* Hero Visual */}
        <Box sx={{ mt: 8, position: 'relative' }}>
          <Paper
            elevation={8}
            sx={{
              borderRadius: 4,
              overflow: 'hidden',
              maxWidth: '900px',
              mx: 'auto',
              background: 'rgba(30, 41, 59, 0.5)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              p: 2,
            }}
          >
            <Box
              component="pre"
              sx={{
                p: 3,
                borderRadius: 2,
                overflow: 'auto',
                backgroundColor: 'rgba(15, 23, 42, 0.7)',
                color: '#e2e8f0',
                fontSize: '0.9rem',
                fontFamily: 'monospace',
              }}
            >
              {`$ git push origin main

> Deploying to Hostify...
> Building application...
> Running tests...
> All tests passed!
> Optimizing assets...
> Deploying to global edge network...

✓ Deployment complete! Your app is live at:
  https://your-app.Hostify.app

Performance Score: 98/100
Time to First Byte: 45ms
Global Availability: 99.99%`}
            </Box>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
};

export default Hero;

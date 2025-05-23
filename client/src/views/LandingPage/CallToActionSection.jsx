import React from 'react';
import { Box, Typography, Container, Button } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

function CallToActionSection() {
  return (
    <Container maxWidth="md" sx={{ py: { xs: 8, md: 12 }, textAlign: 'center' }}>
      <Box
        sx={{
          backgroundColor: '#2D3E4F',
          p: { xs: 4, md: 6 },
          borderRadius: 2,
          border: '1px solid rgba(255,255,255,0.05)',
          boxShadow: '0px 8px 20px rgba(0,0,0,0.4)',
        }}
      >
        <Typography
          variant="h4"
          component="h2"
          sx={{
            fontWeight: 'bold',
            mb: 3,
            fontSize: { xs: '1.8rem', md: '2.5rem' },
            color: 'white',
          }}
        >
          Ready to <span style={{ color: '#00D1A3' }}>deploy</span> your next big idea?
        </Typography>
        <Typography variant="h6" sx={{ mb: 4, color: '#B0B0B0' }}>
          Join thousands of developers and companies who trust Hostify with their hosting needs. Get started for free, no credit card required.
        </Typography>
        <Button
          variant="contained"
          endIcon={<ArrowForwardIcon />}
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
          Start deploying now
        </Button>
        <Box sx={{ mt: 3 }}>
          <Typography variant="body2" sx={{ color: '#B0B0B0' }}>
            Need help? Talk to our{' '}
            <span style={{ color: '#00D1A3', cursor: 'pointer', textDecoration: 'underline' }}>
              sales team
            </span>{' '}
            or check our{' '}
            <span style={{ color: '#00D1A3', cursor: 'pointer', textDecoration: 'underline' }}>
              documentation.
            </span>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}

export default CallToActionSection;
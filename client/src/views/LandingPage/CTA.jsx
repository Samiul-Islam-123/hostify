import React from 'react';
import { Box, Container, Typography, Button, Stack } from '@mui/material';

const CTA = () => {
  return (
    <Box sx={{ py: 12, textAlign: 'center' }}>
      <Container maxWidth="md">
        <Typography variant="h3" component="h2" sx={{ mb: 3, fontWeight: 700 }}>
          Ready to get started?
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
          Join thousands of developers building and deploying on our platform
        </Typography>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
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
            }}
          >
            Create Free Account
          </Button>
        </Stack>
      </Container>
    </Box>
  );
};

export default CTA;

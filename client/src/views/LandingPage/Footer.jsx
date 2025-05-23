import React from 'react';
import { Box, Typography, Container, Link, Grid , List, ListItem} from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';

function Footer() {
  return (
    <Box sx={{ backgroundColor: '#1C2733', py: { xs: 6, md: 8 }, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 4, md: 8 }}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, color: 'white' }}>
              Hostify
            </Typography>
            <Typography variant="body2" sx={{ color: '#B0B0B0', mb: 2 }}>
              Modern hosting for developers. Deploy, scale, and manage applications with ease on our reliable and flexible platform.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Link href="#" color="inherit" sx={{ color: '#B0B0B0', '&:hover': { color: '#00D1A3' } }}>
                <TwitterIcon />
              </Link>
              <Link href="#" color="inherit" sx={{ color: '#B0B0B0', '&:hover': { color: '#00D1A3' } }}>
                <LinkedInIcon />
              </Link>
            </Box>
          </Grid>

          <Grid item xs={6} md={2}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 2, color: 'white' }}>
              Product
            </Typography>
            <List disablePadding>
              {['Features', 'Pricing', 'Enterprise', 'Case Studies', 'Security'].map((item, index) => (
                <ListItem key={index} disablePadding sx={{ mb: 1 }}>
                  <Link href="#" color="inherit" underline="none" sx={{ color: '#B0B0B0', '&:hover': { color: '#00D1A3' } }}>
                    <Typography variant="body2">{item}</Typography>
                  </Link>
                </ListItem>
              ))}
            </List>
          </Grid>

          <Grid item xs={6} md={2}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 2, color: 'white' }}>
              Resources
            </Typography>
            <List disablePadding>
              {['Documentation', 'Guides', 'API Reference', 'Blog', 'Community'].map((item, index) => (
                <ListItem key={index} disablePadding sx={{ mb: 1 }}>
                  <Link href="#" color="inherit" underline="none" sx={{ color: '#B0B0B0', '&:hover': { color: '#00D1A3' } }}>
                    <Typography variant="body2">{item}</Typography>
                  </Link>
                </ListItem>
              ))}
            </List>
          </Grid>

          <Grid item xs={6} md={2}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 2, color: 'white' }}>
              Company
            </Typography>
            <List disablePadding>
              {['About', 'Careers', 'Contact', 'Partners', 'Legal'].map((item, index) => (
                <ListItem key={index} disablePadding sx={{ mb: 1 }}>
                  <Link href="#" color="inherit" underline="none" sx={{ color: '#B0B0B0', '&:hover': { color: '#00D1A3' } }}>
                    <Typography variant="body2">{item}</Typography>
                  </Link>
                </ListItem>
              ))}
            </List>
          </Grid>
        </Grid>

        <Box sx={{ borderTop: '1px solid rgba(255,255,255,0.05)', mt: { xs: 4, md: 8 }, pt: { xs: 3, md: 4 }, textAlign: 'center' }}>
          <Typography variant="body2" sx={{ color: '#B0B0B0' }}>
            © 2025 Hostify. All rights reserved.
          </Typography>
          <Box sx={{ mt: 1, display: 'flex', justifyContent: 'center', gap: 3 }}>
            <Link href="#" color="inherit" underline="hover" sx={{ color: '#B0B0B0' }}>Terms</Link>
            <Link href="#" color="inherit" underline="hover" sx={{ color: '#B0B0B0' }}>Privacy</Link>
            <Link href="#" color="inherit" underline="hover" sx={{ color: '#B0B0B0' }}>Cookies</Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;
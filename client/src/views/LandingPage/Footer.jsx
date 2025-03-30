import React from 'react';
import { Box, Container, Grid, Typography, IconButton, Stack, Button, Divider, TextField } from '@mui/material';
import TwitterIcon from '@mui/icons-material/Twitter';
import GitHubIcon from '@mui/icons-material/GitHub';

const Footer = () => {
  return (
    <Box sx={{ py: 6, backgroundColor: 'rgba(15, 23, 42, 0.9)', color: 'white' }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Brand Section */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
              CloudDeploy
            </Typography>
            <Typography variant="body2" color="gray" sx={{ mb: 2 }}>
              The modern platform for deploying and scaling web applications.
            </Typography>
            <Stack direction="row" spacing={1}>
              <IconButton color="inherit">
                <TwitterIcon />
              </IconButton>
              <IconButton color="inherit">
                <GitHubIcon />
              </IconButton>
            </Stack>
          </Grid>
          {/* Links Sections */}
          {[
            { title: 'Product', links: ['Features', 'Pricing', 'Integrations', 'Changelog', 'Roadmap'] },
            { title: 'Resources', links: ['Documentation', 'Guides', 'API Reference', 'Blog', 'Community'] },
            { title: 'Company', links: ['About', 'Careers', 'Contact', 'Privacy', 'Terms'] },
            { title: 'Support', links: ['Help Center', 'Status', 'FAQ', 'Contact Support'] },
          ].map((section, index) => (
            <Grid item xs={6} sm={3} md={2} key={index}>
              <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
                {section.title}
              </Typography>
              <Stack spacing={1}>
                {section.links.map((link) => (
                  <Button key={link} color="inherit" sx={{ justifyContent: 'flex-start', p: 0 }}>
                    {link}
                  </Button>
                ))}
              </Stack>
            </Grid>
          ))}
        </Grid>

        <Divider sx={{ my: 4, backgroundColor: 'gray' }} />

        {/* Feedback Form */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            Give Us Your Feedback
          </Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
            <TextField
              variant="outlined"
              placeholder="Your feedback..."
              sx={{ borderRadius: 1, flexGrow: 1 }}
            />
            <Button variant="contained" color="primary">Submit</Button>
          </Stack>
        </Box>

        <Typography variant="body2" color="gray" align="center">
          © {new Date().getFullYear()} CloudDeploy. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;

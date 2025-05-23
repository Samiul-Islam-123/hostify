import React, { useState } from 'react';
import { Box, Typography, Container, Tabs, Tab, List, ListItem, ListItemIcon, ListItemText, Grid } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'; // Checkmark icon

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ pt: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function HowItWorksSection() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const terminalStyle = {
    backgroundColor: '#2D3E4F',
    borderRadius: 2,
    p: 3,
    minHeight: 180, // To maintain consistent height
    textAlign: 'left',
    fontFamily: 'monospace',
    fontSize: '0.9rem',
    boxShadow: '0px 4px 10px rgba(0,0,0,0.3)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  };

  const bulletPoint = {
    color: '#B0B0B0',
    display: 'flex',
    alignItems: 'center',
    mb: 1,
  };

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 }, textAlign: 'center' }}>
      <Typography
        variant="h4"
        component="h2"
        sx={{
          fontWeight: 'bold',
          mb: 2,
          fontSize: { xs: '2rem', md: '3rem' },
          color: 'white',
        }}
      >
        One platform, <span style={{ color: '#00D1A3' }}>endless possibilities</span>
      </Typography>
      <Typography variant="h6" sx={{ mb: { xs: 6, md: 8 }, maxWidth: 700, mx: 'auto', color: '#B0B0B0' }}>
        Whatever you're building, Hostify has the platform and tools to help you deploy with confidence.
      </Typography>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="platform features tabs"
          centered
          indicatorColor="primary"
          sx={{
            '.MuiTab-root': {
              color: '#B0B0B0',
              fontWeight: 'bold',
              textTransform: 'none',
              fontSize: '1rem',
              '&.Mui-selected': {
                color: '#00D1A3',
              },
            },
            '.MuiTabs-indicator': {
              backgroundColor: '#00D1A3',
            },
          }}
        >
          <Tab label="Static Sites" {...a11yProps(0)} />
          <Tab label="Frontend Apps" {...a11yProps(1)} />
          <Tab label="Backend APIs" {...a11yProps(2)} />
          <Tab label="Databases" {...a11yProps(3)} />
          <Tab label="Full Stack" {...a11yProps(4)} />
        </Tabs>
      </Box>

      <TabPanel value={value} index={0}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6} textAlign="left">
            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2, color: 'white' }}>
              Static Sites
            </Typography>
            <Typography variant="body1" sx={{ mb: 3, color: '#B0B0B0' }}>
              Deploy static websites with global CDN distribution
            </Typography>
            <List disablePadding>
              {['Global edge caching', 'Custom domains with SSL', 'Continuous deployment', 'Unlimited bandwidth', 'Performance monitoring'].map((item, index) => (
                <ListItem key={index} disablePadding sx={{ mb: 1 }}>
                  <ListItemIcon sx={{ minWidth: 'auto', mr: 1, color: '#00D1A3' }}>
                    <CheckCircleOutlineIcon />
                  </ListItemIcon>
                  <ListItemText primary={item} sx={{ '.MuiListItemText-primary': { color: '#B0B0B0' } }} />
                </ListItem>
              ))}
            </List>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={terminalStyle}>
              <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                <Box sx={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#FF5F56' }} />
                <Box sx={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#FFBD2E' }} />
                <Box sx={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#27C93F' }} />
              </Box>
              <Box>
                <Typography sx={{ color: '#00D1A3' }}>$</Typography>
                <Typography sx={{ color: 'white' }}>hostify deploy ./my-site</Typography>
                <Typography sx={{ color: '#B0B0B0' }}>✓ Uploaded 42 files</Typography>
                <Typography sx={{ color: '#B0B0B0' }}>✓ Deployment complete</Typography>
                <Typography sx={{ color: '#B0B0B0' }}>✓ Site available at <span style={{ color: '#00D1A3' }}>https://your-site.hostify.app</span></Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </TabPanel>

      {/* Placeholder for other tabs - you'd fill these similarly */}
      <TabPanel value={value} index={1}>
        <Typography variant="h6" sx={{ color: '#B0B0B0' }}>Content for Frontend Apps...</Typography>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Typography variant="h6" sx={{ color: '#B0B0B0' }}>Content for Backend APIs...</Typography>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <Typography variant="h6" sx={{ color: '#B0B0B0' }}>Content for Databases...</Typography>
      </TabPanel>
      <TabPanel value={value} index={4}>
        <Typography variant="h6" sx={{ color: '#B0B0B0' }}>Content for Full Stack...</Typography>
      </TabPanel>
    </Container>
  );
}

export default HowItWorksSection;
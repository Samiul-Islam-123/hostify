import React from 'react';
import { Box, Typography, Container, Grid, Paper } from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';       // For Frontend Hosting
import CloudIcon from '@mui/icons-material/Cloud';             // For Backend Services
import StorageIcon from '@mui/icons-material/Storage';         // For Database Solutions
import CodeIcon from '@mui/icons-material/Code';               // For Full-Stack Apps
import SettingsIcon from '@mui/icons-material/Settings';       // For Developer Tools
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch'; // For One-Click Deploy

/**
 * Reusable component for displaying a single feature card.
 */
function FeatureCard({ icon, title, description }) {
  return (
    <Paper
      elevation={0} // No shadow for a flat, modern look
      sx={{
        backgroundColor: '#2D3E4F', // Darker background for the card
        p: 3, // Padding inside the card
        textAlign: 'left',
        borderRadius: 2, // Rounded corners
        height: '100%', // Ensure cards take up full height in their grid slot
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        border: '1px solid rgba(255,255,255,0.05)', // Subtle border
      }}
    >
      <Box sx={{ color: '#00D1A3', mb: 2 }}> {/* Icon styling */}
        {React.cloneElement(icon, { sx: { fontSize: 40 } })} {/* Make icon larger */}
      </Box>
      <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1, color: 'white' }}>
        {title}
      </Typography>
      <Typography variant="body2" sx={{ color: '#B0B0B0' }}> {/* Muted text color */}
        {description}
      </Typography>
    </Paper>
  );
}

/**
 * The main Features Section component.
 * Displays various hosting capabilities in a grid layout.
 */
function FeaturesSection() {
  const features = [
    {
      icon: <LanguageIcon />,
      title: 'Frontend Hosting',
      description: 'Deploy static sites and SPAs with global CDN distribution for lightning fast performance.',
    },
    {
      icon: <CloudIcon />,
      title: 'Backend Services',
      description: 'Host APIs and server applications with auto-scaling to handle any amount of traffic.',
    },
    {
      icon: <StorageIcon />,
      title: 'Database Solutions',
      description: 'Fully managed SQL and NoSQL databases with automated backups and scaling.',
    },
    {
      icon: <CodeIcon />,
      title: 'Full-Stack Apps',
      description: 'Deploy complete applications with frontend, backend, and database all in one place.',
    },
    {
      icon: <SettingsIcon />,
      title: 'Developer Tools',
      description: 'Git integration, CI/CD pipelines, and preview environments for every pull request.',
    },
    {
      icon: <RocketLaunchIcon />,
      title: 'One-Click Deploy',
      description: 'Deploy directly from GitHub, GitLab, or Bitbucket with zero configuration.',
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 }, textAlign: 'center' }}>
      {/* Section Title */}
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
        Everything you need to deploy <span style={{ color: '#00D1A3' }}>anything</span>
      </Typography>
      {/* Section Description */}
      <Typography variant="h6" sx={{ mb: { xs: 6, md: 8 }, maxWidth: 700, mx: 'auto', color: '#B0B0B0' }}>
        From simple static sites to complex full-stack applications, Hostify provides all the tools you need.
      </Typography>

      {/* Feature Cards Grid for simple two columns */}
      <Grid container spacing={4} justifyContent="center">
        {features.map((feature, index) => (
          <Grid item xs={12} sm={6} md={6} key={index}> {/* xs=12 (full width on small), sm=6 (two columns on larger phones/tablets), md=6 (two columns on desktops) */}
            <FeatureCard {...feature} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default FeaturesSection;
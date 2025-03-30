import React from 'react';
import { Box, Container, Grid, Typography, Chip } from '@mui/material';
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import PublicIcon from "@mui/icons-material/Public";
import StorageIcon from "@mui/icons-material/Storage";
import HttpsIcon from "@mui/icons-material/Https";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";

const Features = () => {
  const features = [
    {
      title: "One-Click Deployments",
      description: "Push to Git and we handle the rest with automated CI/CD pipelines.",
      highlights: ["Git integration", "Automatic builds", "Preview deployments"],
      icon: <RocketLaunchIcon fontSize="large" />,
    },
    {
      title: "Global Edge Network",
      description: "Serve your content from locations closest to your users for lightning-fast performance.",
      highlights: ["Global CDN", "Edge caching", "Low latency"],
      icon: <PublicIcon fontSize="large" />,
    },
    {
      title: "Scalable Databases",
      description: "Fully managed database solutions that scale with your application needs.",
      highlights: ["Auto-scaling", "Backups", "High availability"],
      icon: <StorageIcon fontSize="large" />,
    },
    {
      title: "Custom Domains & SSL",
      description: "Secure your applications with free SSL certificates and custom domain support.",
      highlights: ["Free SSL", "Custom domains", "DNS management"],
      icon: <HttpsIcon fontSize="large" />,
    },
    {
      title: "Real-Time Monitoring",
      description: "Comprehensive logs and analytics to keep your applications running smoothly.",
      highlights: ["Real-time logs", "Performance metrics", "Alerts"],
      icon: <MonitorHeartIcon fontSize="large" />,
    },
    {
      title: "Flexible Pricing",
      description: "Only pay for what you use with our transparent, usage-based pricing model.",
      highlights: ["Pay-as-you-go", "Usage-based", "No hidden fees"],
      icon: <AccountBalanceWalletIcon fontSize="large" />,
    },
  ];

  return (
    <Box sx={{ py: 10, backgroundColor: 'rgba(15, 23, 42, 0.7)' }}>
      <Container maxWidth="lg">
        <Typography variant="h3" component="h2" align="center" sx={{ mb: 2, fontWeight: 700 }}>
          Platform Features
        </Typography>
        <Typography variant="h6" color="text.secondary" align="center" sx={{ mb: 8 }}>
          Everything you need to build, deploy, and scale your applications
        </Typography>

        <Box sx={{ position: 'relative' }}>
          {features.map((feature, index) => (
            <Box key={index} sx={{ mb: 6, position: 'relative', '&:last-child': { mb: 0 } }}>
              <Grid container spacing={4} alignItems="center" direction={index % 2 === 0 ? 'row' : 'row-reverse'}>
                <Grid item xs={12} md={5} sx={{ position: 'relative' }}>
                  <Box
                    sx={{
                      backgroundColor: 'rgba(30, 41, 59, 0.7)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: 4,
                      p: 4,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      height: '100%',
                      minHeight: 220,
                      position: 'relative',
                      overflow: 'hidden',
                      transition: 'transform 0.3s, box-shadow 0.3s',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: '0 15px 30px rgba(0, 0, 0, 0.3)',
                      },
                    }}
                  >
                    <Box sx={{ color: 'primary.main', mb: 3, fontSize: '3rem', position: 'relative', zIndex: 1 }}>
                      {feature.icon}
                    </Box>
                    <Typography variant="h5" component="h3" align="center" sx={{ fontWeight: 600, position: 'relative', zIndex: 1 }}>
                      {feature.title}
                    </Typography>
                  </Box>
                </Grid>

                <Grid item xs={12} md={7}>
                  <Box sx={{ p: { xs: 2, md: 4 } }}>
                    <Typography variant="h4" component="h3" sx={{ mb: 2, fontWeight: 600 }}>
                      {feature.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 3, fontSize: '1.1rem' }}>
                      {feature.description}
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: 3 }}>
                      {feature.highlights.map((highlight, i) => (
                        <Chip
                          key={i}
                          label={highlight}
                          size="small"
                          sx={{
                            backgroundColor: 'rgba(96, 165, 250, 0.1)',
                            borderRadius: '16px',
                            '& .MuiChip-label': { px: 2 },
                          }}
                        />
                      ))}
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default Features;

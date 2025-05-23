import React from 'react';
import { Box, Typography, Container, Grid, Paper, Button, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';

/**
 * Reusable component for displaying a single pricing card.
 */
function PricingCard({ plan, price, description, features, buttonText, isPopular = false, buttonVariant = "contained", buttonColor = "primary" }) {
  return (
    <Paper
      elevation={isPopular ? 6 : 0} // Elevate the popular card more
      sx={{
        backgroundColor: '#2D3E4F', // Card background color
        p: 4, // Padding inside the card
        textAlign: 'center',
        borderRadius: 2, // Rounded corners
        height: '100%', // Ensure all cards have the same height in a row
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        border: isPopular ? '2px solid #00D1A3' : '1px solid rgba(255,255,255,0.05)', // Border for popular card
        boxShadow: isPopular ? '0px 0px 30px rgba(0,209,163,0.3)' : 'none', // Glow for popular card
        position: 'relative', // Needed for the "Most Popular" badge
      }}
    >
      {isPopular && (
        <Box
          sx={{
            position: 'absolute',
            top: -15, // Position above the card
            left: '50%',
            transform: 'translateX(-50%)', // Center horizontally
            backgroundColor: '#00D1A3', // Green badge background
            color: 'black', // Black text for the badge
            px: 2, // Horizontal padding
            py: 0.5, // Vertical padding
            borderRadius: 2,
            fontSize: '0.8rem',
            fontWeight: 'bold',
            textTransform: 'uppercase',
          }}
        >
          Most Popular
        </Box>
      )}
      <Box mb={3}>
        <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1, color: 'white' }}>
          {plan}
        </Typography>
        <Typography variant="body2" sx={{ color: '#B0B0B0', minHeight: 40 }}> {/* Added minHeight for consistency */}
          {description}
        </Typography>
        {price && (
          <Typography variant="h3" sx={{ fontWeight: 'bold', mt: 2, color: 'white' }}>
            {price}
            <Typography component="span" variant="h6" sx={{ color: '#B0B0B0', ml: 1 }}>/month</Typography>
          </Typography>
        )}
      </Box>
      <List disablePadding sx={{ flexGrow: 1, mb: 4 }}> {/* flexGrow to push button to bottom */}
        {features.map((feature, index) => (
          <ListItem key={index} disablePadding sx={{ mb: 1 }}>
            <ListItemIcon sx={{ minWidth: 'auto', mr: 1, color: '#00D1A3' }}>
              <CheckIcon />
            </ListItemIcon>
            <ListItemText primary={feature} sx={{ '.MuiListItemText-primary': { color: '#B0B0B0' } }} />
          </ListItem>
        ))}
      </List>
      <Button
        variant={buttonVariant}
        sx={{
          backgroundColor: buttonColor === 'primary' ? '#00D1A3' : 'transparent',
          color: buttonColor === 'primary' ? 'black' : '#00D1A3',
          borderColor: buttonColor === 'primary' ? 'transparent' : '#00D1A3',
          border: buttonColor === 'primary' ? 'none' : '1px solid', // Add border for outlined variant
          textTransform: 'none',
          fontSize: '1rem',
          px: 4,
          py: 1.5,
          '&:hover': {
            backgroundColor: buttonColor === 'primary' ? '#00B89C' : 'rgba(0, 209, 163, 0.1)',
            borderColor: buttonColor === 'primary' ? 'transparent' : '#00B89C',
          },
        }}
        fullWidth // Button takes full width of the card
      >
        {buttonText}
      </Button>
    </Paper>
  );
}

/**
 * The main Pricing Section component.
 * Displays various pricing plans in a responsive grid.
 */
function PricingSection() {
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
        Simple, transparent <span style={{ color: '#00D1A3' }}>pricing</span>
      </Typography>
      {/* Section Description */}
      <Typography variant="h6" sx={{ mb: { xs: 6, md: 8 }, maxWidth: 700, mx: 'auto', color: '#B0B0B0' }}>
        Choose the plan that's right for you and start building today.
      </Typography>

      {/* Pricing Cards Grid */}
      <Grid container spacing={4} justifyContent="center" alignItems="stretch">
  <Grid item xs={12} sm={6} md={4}>
    <PricingCard
      plan="Hobby"
      price="Free"
      description="Perfect for side projects and small personal sites."
      features={[
        '3 projects',
        'Static site hosting',
        'Automated deployments',
        'HTTPS & custom domains',
        'Community support',
      ]}
      buttonText="Start for free"
    />
  </Grid>
  <Grid item xs={12} sm={6} md={4}>
    <PricingCard
      plan="Pro"
      price="$19"
      description="For professional developers and growing applications."
      features={[
        'Unlimited projects',
        'Frontend & backend hosting',
        'Database hosting (1GB)',
        'Team collaboration (5 seats)',
        'Priority support',
        'Build minutes (1000/month)',
        'Advanced analytics',
      ]}
      buttonText="Start 14-day trial"
      isPopular
    />
  </Grid>
  <Grid item xs={12} sm={6} md={4}>
    <PricingCard
      plan="Enterprise"
      price="Custom"
      description="For large teams and mission-critical applications."
      features={[
        'Everything in Pro',
        'Unlimited team members',
        'Enterprise SLA',
        'Dedicated support',
        'SAML SSO',
        'Advanced security features',
        'Custom integrations',
        'On-premise deployment option',
      ]}
      buttonText="Contact sales"
      buttonVariant="outlined"
      buttonColor="secondary"
    />
  </Grid>
</Grid>

    </Container>
  );
}

export default PricingSection;
import React from 'react';
import { Box, Container, Grid, Card, CardContent, Typography, Button, Divider, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const Pricing = ({ pricingTiers }) => {
  return (
    <Box sx={{ py: 10, backgroundColor: 'rgba(15, 23, 42, 0.7)' }}>
      <Container maxWidth="lg">
        <Typography variant="h3" component="h2" align="center" sx={{ mb: 2, fontWeight: 700 }}>
          Simple, Transparent Pricing
        </Typography>
        <Typography variant="h6" color="text.secondary" align="center" sx={{ mb: 8 }}>
          Start for free, upgrade as you grow
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          {pricingTiers.map((tier, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  backgroundColor: index === 1 ? 'rgba(96, 165, 250, 0.1)' : 'rgba(30, 41, 59, 0.5)',
                  backdropFilter: 'blur(10px)',
                  border: index === 1 ? '1px solid rgba(96, 165, 250, 0.3)' : '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: 3,
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {index === 1 && (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      backgroundColor: 'primary.main',
                      color: 'primary.contrastText',
                      px: 2,
                      py: 0.5,
                      borderBottomLeftRadius: 8,
                    }}
                  >
                    Popular
                  </Box>
                )}
                <CardContent sx={{ p: 4, flexGrow: 1 }}>
                  <Typography variant="h5" component="h3" sx={{ mb: 1, fontWeight: 600 }}>
                    {tier.title}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'baseline', mb: 2 }}>
                    <Typography variant="h3" component="span" sx={{ fontWeight: 700 }}>
                      {tier.price}
                    </Typography>
                    {tier.price !== 'Custom' && (
                      <Typography variant="subtitle1" component="span" sx={{ ml: 1 }}>
                        /month
                      </Typography>
                    )}
                  </Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
                    {tier.description}
                  </Typography>
                  <Divider sx={{ my: 2 }} />
                  <List disablePadding>
                    {tier.features.map((feature, featureIndex) => (
                      <ListItem key={featureIndex} disablePadding sx={{ py: 1 }}>
                        <ListItemIcon sx={{ minWidth: 36 }}>
                          <CheckCircleOutlineIcon color="primary" fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary={feature} />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
                <Box sx={{ p: 3, pt: 0 }}>
                  <Button
                    fullWidth
                    variant={index === 1 ? 'contained' : 'outlined'}
                    color="primary"
                    size="large"
                    sx={{ borderRadius: 2, py: 1.5 }}
                  >
                    {index === 2 ? 'Contact Sales' : 'Get Started'}
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Pricing;

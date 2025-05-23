import React from 'react';
import { Box, Typography, Container, Grid, Paper, Avatar } from '@mui/material';

function TestimonialCard({ quote, name, title, avatarLetter }) {
  return (
    <Paper
      elevation={0}
      sx={{
        backgroundColor: '#2D3E4F',
        p: 4,
        textAlign: 'left',
        borderRadius: 2,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        border: '1px solid rgba(255,255,255,0.05)',
      }}
    >
      <Typography variant="h5" sx={{ fontStyle: 'italic', mb: 3, color: 'white' }}>
        “{quote}”
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar sx={{ bgcolor: '#00D1A3', color: 'black', mr: 2 }}>{avatarLetter}</Avatar>
        <Box>
          <Typography variant="body1" sx={{ fontWeight: 'bold', color: 'white' }}>
            {name}
          </Typography>
          <Typography variant="body2" sx={{ color: '#B0B0B0' }}>
            {title}
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
}

function TestimonialsSection() {
  const testimonials = [
    {
      quote: "Hostify completely changed how we deploy applications. Our deployment time went from hours to minutes.",
      name: "Sarah Johnson",
      title: "CTO, NextStart",
      avatarLetter: "S",
    },
    {
      quote: "The ease of use and reliability of Hostify has allowed our small team to deploy complex applications with confidence.",
      name: "Michael Chen",
      title: "Lead Developer, DevWorks",
      avatarLetter: "M",
    },
    {
      quote: "We migrated our entire infrastructure to Hostify and haven't looked back. The support team is exceptional.",
      name: "Alex Rodriguez",
      title: "Engineering Manager, ScaleUp Inc",
      avatarLetter: "A",
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 }, textAlign: 'center' }}>
      <Typography
        variant="h4"
        component="h2"
        sx={{
          fontWeight: 'bold',
          mb: { xs: 6, md: 8 },
          fontSize: { xs: '2rem', md: '3rem' },
          color: 'white',
        }}
      >
        Loved by <span style={{ color: '#00D1A3' }}>developers</span>
      </Typography>
      <Typography variant="h6" sx={{ mb: { xs: 6, md: 8 }, maxWidth: 700, mx: 'auto', color: '#B0B0B0' }}>
        Don't just take our word for it. See what our customers have to say.
      </Typography>

      <Grid container spacing={4}>
        {testimonials.map((testimonial, index) => (
          <Grid item xs={12} md={4} key={index}>
            <TestimonialCard {...testimonial} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default TestimonialsSection;
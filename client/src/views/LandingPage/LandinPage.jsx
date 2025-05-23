import React from 'react';
import { Box } from '@mui/material';
import Header from './Header';
import HeroSection from './HeroSection';
import HowItWorksSection from './HowItWorksSection';
import TestimonialsSection from './TestimonialsSection';
import PricingSection from './PricingSection';
import FAQSection from './FAQSection';
import CallToActionSection from './CallToActionSection';
import Footer from './Footer';
import FeaturesSection from './FeatureSection';

function LandingPage() {
  return (
    <Box sx={{ backgroundColor: '#1C2733', minHeight: '100vh', color: 'white' }}>
      <Header />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <PricingSection />
      <FAQSection />
      <CallToActionSection />
      <Footer />
    </Box>
  );
}

export default LandingPage;
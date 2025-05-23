import React from 'react';
import { Box, Typography, Container, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function FAQItem({ question, answer }) {
  return (
    <Accordion
      sx={{
        backgroundColor: '#2D3E4F',
        mb: 2,
        borderRadius: 2,
        '&.MuiAccordion-root:before': {
          display: 'none', // Remove the default Material-UI line
        },
        border: '1px solid rgba(255,255,255,0.05)',
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon sx={{ color: '#00D1A3' }} />}
        aria-controls="panel1a-content"
        id="panel1a-header"
        sx={{
          py: 1,
          '& .MuiAccordionSummary-content': {
            m: '12px 0',
          },
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'white' }}>
          {question}
        </Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ pt: 0, pb: 2 }}>
        <Typography sx={{ color: '#B0B0B0' }}>
          {answer}
        </Typography>
      </AccordionDetails>
    </Accordion>
  );
}

function FAQSection() {
  const faqs = [
    {
      question: "What types of applications can I host on Hostify?",
      answer: "Hostify supports a wide range of applications, including static sites, single-page applications (SPAs), server-side rendered (SSR) apps, APIs, and full-stack applications with integrated databases. Our platform is designed to handle everything from small personal projects to large-scale enterprise solutions."
    },
    {
      question: "How does pricing work?",
      answer: "Our pricing is transparent and designed to scale with your needs. We offer a free 'Hobby' tier for personal projects, a 'Pro' tier for professional developers and growing apps, and a 'Custom Enterprise' plan for large organizations requiring dedicated resources and support. You can find detailed information on our pricing page."
    },
    {
      question: "Can I connect my own domain name?",
      answer: "Yes, absolutely! Hostify makes it easy to connect your custom domain names to your deployed applications. We provide automatic SSL certificates and global CDN integration to ensure your site is fast and secure."
    },
    {
      question: "How do deployments work?",
      answer: "Deployments on Hostify are seamless. You can connect your Git repository (GitHub, GitLab, Bitbucket), and we'll automatically detect new commits, build your application, and deploy it to our global infrastructure. We also offer a CLI for manual deployments and advanced CI/CD pipelines for complex workflows."
    },
    {
      question: "What kind of support does Hostify provide?",
      answer: "We offer various support options to meet your needs. All users have access to our community forum. Pro users receive priority email support, and Enterprise clients benefit from dedicated support engineers and Service Level Agreements (SLAs)."
    },
  ];

  return (
    <Container maxWidth="md" sx={{ py: { xs: 8, md: 12 }, textAlign: 'center' }}>
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
        Frequently asked <span style={{ color: '#00D1A3' }}>questions</span>
      </Typography>
      <Box>
        {faqs.map((faq, index) => (
          <FAQItem key={index} question={faq.question} answer={faq.answer} />
        ))}
      </Box>
    </Container>
  );
}

export default FAQSection;
"use client"
import React from 'react';
import Navigation from './Navigation';
import Hero from './Hero';
import Features from './Features';
import Pricing from './Pricing';
import CTA from './CTA';
import Footer from './Footer';
import { Box , Container, Typography, Button, Paper, Grid, Chip, Card, CardContent, Divider, List, ListItem, ListItemIcon, ListItemText, Stack, IconButton, TextField, } from '@mui/material';


// Icons
import MenuIcon from "@mui/icons-material/Menu"
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline"
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch"
import PublicIcon from "@mui/icons-material/Public"
import StorageIcon from "@mui/icons-material/Storage"
import HttpsIcon from "@mui/icons-material/Https"
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart"
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet"
import TwitterIcon from "@mui/icons-material/Twitter"
import GitHubIcon from "@mui/icons-material/GitHub"
// import DiscordIcon from "@mui/icons-material/Discord"

function LandingPage() {
  const features = [
    {
      title: "One-Click Deployments",
      description: "Push to Git and we handle the rest with automated CI/CD pipelines.",
      icon: <RocketLaunchIcon fontSize="large" />,
    },
    {
      title: "Global Edge Network",
      description: "Serve your content from locations closest to your users for lightning-fast performance.",
      icon: <PublicIcon fontSize="large" />,
    },
    {
      title: "Scalable Databases",
      description: "Fully managed database solutions that scale with your application needs.",
      icon: <StorageIcon fontSize="large" />,
    },
    {
      title: "Custom Domains & SSL",
      description: "Secure your applications with free SSL certificates and custom domain support.",
      icon: <HttpsIcon fontSize="large" />,
    },
    {
      title: "Real-Time Monitoring",
      description: "Comprehensive logs and analytics to keep your applications running smoothly.",
      icon: <MonitorHeartIcon fontSize="large" />,
    },
    {
      title: "Flexible Pricing",
      description: "Only pay for what you use with our transparent, usage-based pricing model.",
      icon: <AccountBalanceWalletIcon fontSize="large" />,
    },
  ]

  const pricingTiers = [
    {
      title: "Free",
      price: "$0",
      description: "Perfect for personal projects and experiments",
      features: ["Up to 3 projects", "Shared compute resources", "Automated HTTPS", "Community support"],
    },
    {
      title: "Pro",
      price: "$19",
      description: "For professionals and growing teams",
      features: [
        "Unlimited projects",
        "Dedicated resources",
        "Custom domains",
        "Priority support",
        "Advanced analytics",
      ],
    },
    {
      title: "Enterprise",
      price: "Custom",
      description: "For large-scale applications and businesses",
      features: [
        "Custom resource allocation",
        "SLA guarantees",
        "Dedicated account manager",
        "SSO & team management",
        "Advanced security features",
      ],
    },
  ]

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "CTO at TechStart",
      quote: "Switching to this platform cut our deployment time by 80% and simplified our entire workflow.",
    },
    {
      name: "Michael Chen",
      role: "Lead Developer at ScaleUp",
      quote: "The global edge network has dramatically improved our app performance for users worldwide.",
    },
    {
      name: "Emma Rodriguez",
      role: "Founder at DevStudio",
      quote: "As a startup, the flexible pricing model allowed us to scale our infrastructure with our business.",
    },
  ]


  return (
    <Box
      sx={{
        bgcolor: "background.default",
        color: "text.primary",
        background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
        minHeight: "100vh",
      }}
    >
      <Navigation />
      <Hero />
      <Features />

      <Pricing pricingTiers={pricingTiers} />
      <CTA />
      <Footer />


      

    </Box>
  )
}

export default LandingPage

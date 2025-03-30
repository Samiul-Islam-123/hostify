import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Paper, 
  Table, 
  TableBody,
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Drawer,
  Divider,
  IconButton,
  useMediaQuery
} from '@mui/material';
import { 
  Dashboard as DashboardIcon, 
  Layers as LayersIcon, 
  Language as LanguageIcon,
  Payment as PaymentIcon,
  Settings as SettingsIcon,
  PlayArrow as PlayArrowIcon,
  Help as HelpIcon,
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import DashboardRouter from './DashboardRouter';
import NewResourceButton from '../../components/NewResourceButton'; // Import the new component

// Create styled components to match the dark theme in the image
const StyledDrawer = styled(Drawer)(({ theme, open, isMobile }) => ({
  width: open ? 240 : 72,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: open ? 240 : 72,
    boxSizing: 'border-box',
    backgroundColor: '#121212',
    color: 'white',
    borderRight: 'none',
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    ...(isMobile && {
      width: 240,
    }),
  },
}));

const StyledListItem = styled(ListItem)(({ open }) => ({
  borderRadius: '8px',
  margin: '4px 8px',
  padding: open ? '8px 16px' : '8px 24px',
  '&.active': {
    backgroundColor: 'rgba(255, 255, 255, 0.08)'
  },
}));

const StatusDot = styled(Box)({
  width: 8,
  height: 8,
  borderRadius: '50%',
  backgroundColor: '#4caf50',
  marginRight: 8,
  display: 'inline-block'
});

const LogBox = styled(Box)({
  fontFamily: 'monospace',
  color: '#adbac7'
});

function DashboardFrame() {
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const isMobile = useMediaQuery('(max-width:900px)');
  const [mobileOpen, setMobileOpen] = useState(false);
  
  // Determine active route based on current path
  const getActiveRoute = () => {
    const path = location.pathname;
    if (path === '/dashboard/' || path === '/dashboard') {
      return 'dashboard';
    } else if (path.includes('/dashboard/deployments')) {
      return 'deployments';
    } else if (path.includes('/dashboard/domains')) {
      return 'domains';
    } else if (path.includes('/dashboard/billing')) {
      return 'billing';
    } else if (path.includes('/dashboard/settings')) {
      return 'settings';
    }
    return 'dashboard'; // default
  };

  // Create an activeRoute state based on the current path
  const [activeRoute, setActiveRoute] = useState(getActiveRoute());
  
  // Update activeRoute whenever location changes
  useEffect(() => {
    setActiveRoute(getActiveRoute());
  }, [location]);

  // Close drawer on mobile when route changes
  useEffect(() => {
    if (isMobile && mobileOpen) {
      setMobileOpen(false);
    }
  }, [location, isMobile]);

  // Set initial drawer state based on screen size
  useEffect(() => {
    setOpen(!isMobile);
  }, [isMobile]);

  const handleDrawerToggle = () => {
    if (isMobile) {
      setMobileOpen(!mobileOpen);
    } else {
      setOpen(!open);
    }
  };

  const handleNewResourceSelect = (option) => {
    // Handle the selected option here
    console.log(`Selected option: ${option}`);
    // You might want to navigate to a creation page based on the option
    // navigate(`/dashboard/create/${option}`);
  };

  // Mock deployment data
  const deployments = [
    { name: 'frontend', type: 'Frontend', status: 'Running' },
    { name: 'backend', type: 'Backend', status: 'Running' },
    { name: 'full-stack-app', type: 'Full Stack', status: 'Running' }
  ];

  // Mock logs
  const logs = [
    { time: '10:12:34', message: 'Starting deployment...' },
    { time: '10:12:36', message: 'Building project...' },
    { time: '10:12:47', message: 'Deployment successful.' },
    { time: '10:12:47', message: 'Server started on port 3000' }
  ];

  // Navigation items
  const navItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, route: '/dashboard/', value: 'dashboard' },
    { text: 'Deployments', icon: <LayersIcon />, route: '/dashboard/deployments', value: 'deployments' },
    { text: 'Domains', icon: <LanguageIcon />, route: '/dashboard/domains', value: 'domains' },
    { text: 'Billing', icon: <PaymentIcon />, route: '/dashboard/billing', value: 'billing' },
    { text: 'Settings', icon: <SettingsIcon />, route: '/dashboard/settings', value: 'settings' }
  ];

  return (
    <Box sx={{ display: 'flex', backgroundColor: '#121212', color: 'white', height: '100vh', width: '100vw' }}>
      {/* New Resource Button - Fixed positioning at extreme right */}
      <Box sx={{ 
        position: 'fixed',
        top: 16,
        right: 24,
        zIndex: 1300
      }}>
        <NewResourceButton onOptionSelect={handleNewResourceSelect} />
      </Box>

      {/* Mobile Drawer */}
      {isMobile && (
        <>
          <IconButton
            sx={{ 
              position: 'fixed', 
              top: 10, 
              left: 10, 
              zIndex: 1300, 
              color: 'white',
              backgroundColor: 'rgba(0,0,0,0.3)',
              '&:hover': {
                backgroundColor: 'rgba(0,0,0,0.5)'
              }
            }}
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
          <StyledDrawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            isMobile={true}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile
            }}
          >
            {/* Drawer content */}
            <Box sx={{ 
              p: 2, 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between'
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <PlayArrowIcon sx={{ color: '#8957ff' }} />
                <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                  Hostify
                </Typography>
              </Box>
            </Box>
            <Divider sx={{ backgroundColor: '#30363d', my: 1 }} />
            <List style={{ cursor: "pointer" }}>
              {navItems.map((item) => (
                <StyledListItem 
                  key={item.text}
                  button
                  onClick={() => {
                    navigate(item.route);
                    setActiveRoute(item.value);
                  }}
                  className={activeRoute === item.value ? 'active' : ''}
                  open={true}
                >
                  <ListItemIcon sx={{ minWidth: 40, color: 'white' }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.text} />
                </StyledListItem>
              ))}
            </List>
            <Box sx={{ 
              position: 'absolute', 
              bottom: 16, 
              left: 16
            }}>
              <IconButton sx={{ color: 'white' }}>
                <HelpIcon />
              </IconButton>
            </Box>
          </StyledDrawer>
        </>
      )}

      {/* Desktop Drawer */}
      {!isMobile && (
        <StyledDrawer variant="permanent" open={open} isMobile={false}>
          <Box sx={{ 
            p: 2, 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between'
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <PlayArrowIcon sx={{ color: '#8957ff' }} />
              {open && (
                <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                  Hostify
                </Typography>
              )}
            </Box>
            <IconButton 
              onClick={handleDrawerToggle} 
              sx={{ color: 'white' }}
            >
              {open ? <ChevronLeftIcon /> : <MenuIcon />}
            </IconButton>
          </Box>
          <Divider sx={{ backgroundColor: '#30363d', my: 1 }} />
          <List style={{ cursor: "pointer" }}>
            {navItems.map((item) => (
              <StyledListItem 
                key={item.text}
                button
                onClick={() => {
                  navigate(item.route);
                  setActiveRoute(item.value);
                }}
                className={activeRoute === item.value ? 'active' : ''}
                open={open}
              >
                <ListItemIcon sx={{ minWidth: open ? 40 : 0, color: 'white' }}>
                  {item.icon}
                </ListItemIcon>
                {open && <ListItemText primary={item.text} />}
              </StyledListItem>
            ))}
          </List>
          <Box sx={{ 
            position: 'absolute', 
            bottom: 16, 
            left: open ? 16 : '50%', 
            transform: open ? 'none' : 'translateX(-50%)' 
          }}>
            <IconButton sx={{ color: 'white' }}>
              <HelpIcon />
            </IconButton>
          </Box>
        </StyledDrawer>
      )}

      {/* Main content */}
      <Box sx={{ marginTop: "24px", width: '100%', backgroundColor: '#121212', minHeight: '97vh' }}>
        <DashboardRouter />
      </Box>
    </Box>
  );
}

export default DashboardFrame;
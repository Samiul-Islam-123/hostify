import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Tabs,
  Tab,
  useMediaQuery
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  Help as HelpIcon,
  PlayArrow as PlayArrowIcon
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { useLocation, useNavigate } from 'react-router-dom';
import NewResourceButton from '../../components/NewResourceButton';
import ProjectRouteManager from './ProjectRouteManager';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: '#121212',
  color: 'white',
  boxShadow: 'none',
  borderBottom: '1px solid rgba(255, 255, 255, 0.12)'
}));

const StyledTabs = styled(Tabs)({
  minHeight: '64px',
  '& .MuiTabs-indicator': {
    backgroundColor: '#8957ff'
  }
});

const StyledTab = styled(Tab)({
  minHeight: '64px',
  textTransform: 'none',
  fontSize: '0.875rem',
  '&.Mui-selected': {
    color: '#8957ff'
  }
});

function ProjectManagerFrame() {
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width:900px)');
  const [activeRoute, setActiveRoute] = useState('history');

  const navItems = [
    { label: 'History', value: 'history' },
    { label: 'Logs', value: 'logs' },
    { label: 'Environment', value: 'environment' },
    { label: 'Analytics', value: 'analytics' },
    { label: 'Settings', value: 'settings' }
  ];

  const getActiveRoute = () => {
    const path = location.pathname;
    if (path.includes('/project/history')) return 'history';
    if (path.includes('/project/logs')) return 'logs';
    if (path.includes('/project/environment')) return 'environment';
    if (path.includes('/project/analytics')) return 'analytics';
    if (path.includes('/project/settings')) return 'settings';
    return 'history'; // Default fallback
  };

  useEffect(() => {
    setActiveRoute(getActiveRoute());
  }, [location]);

  const handleNewResourceSelect = (option) => {
    console.log(`Selected option: ${option}`);
    navigate(`/create/${option}`);
  };

  return (
    <Box sx={{ backgroundColor: '#121212', minHeight: '100vh' }}>
      <StyledAppBar position="fixed">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => navigate('/dashboard')}
            sx={{ mr: 2 }}
          >
            <ArrowBackIcon />
          </IconButton>

          <PlayArrowIcon sx={{ color: '#8957ff', mr: 1 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Project Name
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <NewResourceButton onOptionSelect={handleNewResourceSelect} />
            <IconButton color="inherit">
              <HelpIcon />
            </IconButton>
          </Box>
        </Toolbar>

        <StyledTabs
          value={activeRoute}
          onChange={(e, newValue) => navigate(`/project/${newValue}`)}
          variant={isMobile ? 'scrollable' : 'standard'}
          scrollButtons="auto"
        >
          {navItems.map((item) => (
            <StyledTab
              key={item.value}
              label={item.label}
              value={item.value}
            />
          ))}
        </StyledTabs>
      </StyledAppBar>

      <Box
        component="main"
        sx={{
          pt: '112px',
          px: 3,
          minHeight: 'calc(100vh - 112px)',
          marginTop : "40px"
        }}
      >
        <ProjectRouteManager />
      </Box>
    </Box>
  );
}

export default ProjectManagerFrame;

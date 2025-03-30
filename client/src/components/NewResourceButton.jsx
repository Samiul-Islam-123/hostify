import React, { useState } from 'react';
import {
  Button,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import {
  Add as AddIcon,
  Language as WebsiteIcon,
  Code as BackendIcon,
  Storage as DatabaseIcon,
  Layers as FullstackIcon
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const NewButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#8957ff',
  color: 'white',
  borderRadius: '4px',
  padding: '4px 12px',
  minWidth: 'auto',
  textTransform: 'none',
  '&:hover': {
    backgroundColor: '#7243d9',
  },
}));

const NewResourceButton = ({ onOptionSelect }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOptionSelect = (option) => {
    if (onOptionSelect) {
      onOptionSelect(option);
    }
    handleClose();
  };

  const options = [
    { id: 'static-website', label: 'Static Website', icon: <WebsiteIcon fontSize="small" /> },
    { id: 'backend-service', label: 'Backend Service', icon: <BackendIcon fontSize="small" /> },
    { id: 'database', label: 'Database', icon: <DatabaseIcon fontSize="small" /> },
    { id: 'fullstack-application', label: 'Fullstack Application', icon: <FullstackIcon fontSize="small" /> }
  ];

  return (
    <>
      <NewButton
        variant="contained"
        size="small"
        startIcon={<AddIcon />}
        onClick={handleClick}
        aria-controls={open ? 'new-resource-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
      >
        New
      </NewButton>
      <Menu
        id="new-resource-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'new-resource-button',
        }}
        PaperProps={{
          sx: {
            backgroundColor: '#1e1e1e',
            color: 'white',
            border: '1px solid #30363d',
            borderRadius: '6px',
            mt: 0.5,
            width: 200
          }
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        {options.map(option => (
          <MenuItem 
            key={option.id} 
            onClick={() => handleOptionSelect(option.id)}
            sx={{ 
              '&:hover': { 
                backgroundColor: 'rgba(255, 255, 255, 0.08)' 
              } 
            }}
          >
            <ListItemIcon sx={{ color: 'white', minWidth: '36px' }}>
              {option.icon}
            </ListItemIcon>
            <ListItemText primary={option.label} />
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default NewResourceButton;
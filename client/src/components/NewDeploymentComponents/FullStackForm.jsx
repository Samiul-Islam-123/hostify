import React, { useState, useRef } from 'react';
import {
  Box,
  Button,
  Container,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Stack,
  TextField,
  Typography,
  InputAdornment,
  Paper,
  Card,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import GitHubIcon from '@mui/icons-material/GitHub';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import FolderIcon from '@mui/icons-material/Folder';
import { useNavigate } from 'react-router-dom';
import StaticSiteForm from './StaticSiteForm';
import BackendServiceForm from './BackendServiceForm';

function FullStackForm() {


  const navigate = useNavigate();


  return (
    <>
    <Container maxWidth="lg" sx={{ minHeight: "100vh", pt: 3, pb: 5, bgcolor: '#121212', color: 'white' }}>
    <Button
        onClick={() => navigate('/dashboard')}
        variant="contained"
        color="primary"
        sx={{
          minWidth: 0,
          width: 40,
          height: 40,
          borderRadius: '50%',
          padding: 0,
          mb: 2
        }}
      >
        <KeyboardBackspaceIcon />
      </Button>
        <Typography variant='h1'>
          Comming soon
        </Typography>
    </Container>
    </>

  );
}

export default FullStackForm;
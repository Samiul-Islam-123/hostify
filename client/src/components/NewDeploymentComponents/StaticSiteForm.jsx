import React, { useState, useRef, useCallback } from 'react';
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
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  Chip
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import GitHubIcon from '@mui/icons-material/GitHub';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import FolderIcon from '@mui/icons-material/Folder';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import ImageIcon from '@mui/icons-material/Image';
import CodeIcon from '@mui/icons-material/Code';
import DescriptionIcon from '@mui/icons-material/Description';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import { useEffect } from 'react';
import { useSocket } from '../../context/SocketContext';


function StaticSiteForm() {
  const [deployMethod, setDeployMethod] = useState('git');
  const [serviceName, setServiceName] = useState('');
  const [githubRepo, setGithubRepo] = useState('');
  const [branch, setBranch] = useState('master');
  const [region, setRegion] = useState('Oregon');
  const [rootDirectory, setRootDirectory] = useState('');
  const [buildCommand, setBuildCommand] = useState('$ npm run build');
  const [outputDirectory, setOutputDirectory] = useState('build');
  const [envVars, setEnvVars] = useState([{ name: '', value: '' }]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [errors, setErrors] = useState({});
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);
  const folderInputRef = useRef(null);
  const dropZoneRef = useRef(null);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredRepos, setFilteredRepos] = useState([]);
  const {socket} = useSocket();

  const handleDeployMethodChange = (event) => {
    setDeployMethod(event.target.value);
  };

  const addEnvVar = () => {
    setEnvVars([...envVars, { name: '', value: '' }]);
  };

  const removeEnvVar = (index) => {
    const updatedVars = [...envVars];
    updatedVars.splice(index, 1);
    setEnvVars(updatedVars);
  };

  const updateEnvVar = (index, field, value) => {
    const updatedVars = [...envVars];
    updatedVars[index][field] = value;
    setEnvVars(updatedVars);
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    if (files.length > 0) {
      setSelectedFiles(prevFiles => [...prevFiles, ...files]);
    }
  };

  const handleFolderSelect = () => {
    folderInputRef.current.click();
  };

  const handleFileSelect = () => {
    fileInputRef.current.click();
  };

  const handleDragEnter = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragging) {
      setIsDragging(true);
    }
  }, [isDragging]);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      setSelectedFiles(prevFiles => [...prevFiles, ...files]);
    }
  }, []);

  const removeFile = (indexToRemove) => {
    setSelectedFiles(prevFiles =>
      prevFiles.filter((_, index) => index !== indexToRemove)
    );
  };

  const getFileIcon = (file) => {
    const fileType = file.type;
    if (fileType.startsWith('image/')) {
      return <ImageIcon />;
    } else if (fileType.includes('javascript') || fileType.includes('css') || fileType.includes('html')) {
      return <CodeIcon />;
    } else {
      return <InsertDriveFileIcon />;
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useUser();

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        if (!user) {
          setLoading(false);
          return;
        }

        // Get GitHub username from the authenticated user
        const githubAccount = user.externalAccounts?.find(
          account => account.provider === 'github'
        );

        if (!githubAccount) {
          setError('No GitHub account connected');
          setLoading(false);
          return;
        }

        const username = githubAccount.username;

        // Use the public GitHub API to fetch public repositories with sorting and pagination
        const response = await fetch(
          `https://api.github.com/users/${username}/repos?sort=updated&per_page=20&page=1`
        );

        if (!response.ok) {
          throw new Error(`GitHub API error: ${response.status}`);
        }

        const data = await response.json();
        // Sort by updated_at date (newest first) and take first 20
        const sortedRepos = data
          .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
          .slice(0, 20);

        console.log('GitHub Repositories:', sortedRepos);
        setRepos(sortedRepos);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching repos:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchRepos();
  }, [user]);

  useEffect(() => {
    if (!repos) return;

    const filtered = repos.filter(repo =>
      repo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      repo.full_name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredRepos(filtered);
  }, [searchQuery, repos]);

  useEffect(() => {
    if(socket){
      socket.on('mushi', data => {
        console.log(data)
      })
    }
  },[socket])

  const validateForm = () => {
    const newErrors = {};

    // Validate service name
    if (!serviceName.trim()) {
      newErrors.serviceName = 'Service name is required';
    } else if (!/^[a-z0-9-]+$/.test(serviceName)) {
      newErrors.serviceName = 'Service name can only contain lowercase letters, numbers, and hyphens';
    }

    // Validate based on deploy method
    if (deployMethod === 'git') {
      if (!githubRepo) {
        newErrors.githubRepo = 'Please select a repository';
      }
      if (!buildCommand.trim()) {
        newErrors.buildCommand = 'Build command is required';
      }
      if (!outputDirectory.trim()) {
        newErrors.outputDirectory = 'Output directory is required';
      }
    } else if (deployMethod === 'upload') {
      if (selectedFiles.length === 0) {
        newErrors.files = 'Please select at least one file or folder';
      }
    }

    // Validate environment variables
    const invalidEnvVars = envVars.some(({ name, value }) =>
      (name.trim() && !value.trim()) || (!name.trim() && value.trim())
    );
    if (invalidEnvVars) {
      newErrors.envVars = 'Environment variables must have both name and value';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      console.log('Form validation failed:', errors);
      return;
    }

    // Prepare form data
    const formData = {
      deployMethod,
      serviceName,
      region,
      envVars: envVars.filter(({ name, value }) => name.trim() && value.trim()),
      ...(deployMethod === 'git' ? {
        githubRepo,
        branch,
        rootDirectory: rootDirectory.trim() || undefined,
        buildCommand,
        outputDirectory
      } : {
        files: selectedFiles.map(file => ({
          name: file.name,
          size: file.size,
          type: file.type
        }))
      })
    };

    console.log('Form data ready to send:', formData);
    socket.emit('test-data', formData);
  };

  return (
    <Container maxWidth="lg" sx={{ minHeight: "100vh", pt: 3, pb: 5, bgcolor: '#121212', color: 'white' }}>
      <form onSubmit={handleSubmit}>
        <Box>
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

          <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'medium', mb: 4 }}>
            Let's deploy a Static Site 🌐
          </Typography>

          <Stack spacing={4}>
            {/* Deployment Method Selection */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="body1" component="p" sx={{ fontWeight: 'medium', mb: 1 }}>
                Source Code
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, mb: 4 }}>
                <Button
                  variant={deployMethod === 'git' ? "contained" : "outlined"}
                  onClick={() => setDeployMethod('git')}
                  sx={{
                    bgcolor: deployMethod === 'git' ? '#4B0082' : 'transparent',
                    '&:hover': { bgcolor: deployMethod === 'git' ? '#5B0092' : 'rgba(75, 0, 130, 0.1)' },
                    color: deployMethod === 'git' ? 'white' : '#888',
                    borderColor: '#333'
                  }}
                >
                  Git Provider
                </Button>
                <Button
                  variant={deployMethod === 'upload' ? "contained" : "outlined"}
                  onClick={() => setDeployMethod('upload')}
                  sx={{
                    bgcolor: deployMethod === 'upload' ? '#4B0082' : 'transparent',
                    '&:hover': { bgcolor: deployMethod === 'upload' ? '#5B0092' : 'rgba(75, 0, 130, 0.1)' },
                    color: deployMethod === 'upload' ? 'white' : '#888',
                    borderColor: '#333'
                  }}
                >
                  Direct Upload
                </Button>
              </Box>

              {/* Service Name */}
              <Box>
                <Typography variant="body1" component="p" sx={{ fontWeight: 'medium', mb: 1 }}>
                  Name
                </Typography>
                <Typography variant="caption" sx={{ display: 'block', color: '#888', mb: 1 }}>
                  A unique name for your static site.
                </Typography>
                <TextField
                  fullWidth
                  value={serviceName}
                  onChange={(e) => setServiceName(e.target.value)}
                  placeholder="my-static-site"
                  error={!!errors.serviceName}
                  helperText={errors.serviceName}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      bgcolor: '#1E1E1E',
                      '& fieldset': { borderColor: '#333' },
                      '&:hover fieldset': { borderColor: '#444' },
                    },
                    '& .MuiInputBase-input': { color: 'white' },
                    '& .MuiFormHelperText-root': { color: '#ff4444' }
                  }}
                />
              </Box>

              {deployMethod === 'git' && (
                <>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body1" component="p" sx={{ fontWeight: 'medium', mb: 1 }}>
                      Repository
                    </Typography>
                    <Typography variant="caption" sx={{ display: 'block', color: '#888', mb: 1 }}>
                      Select a repository to deploy
                    </Typography>
                    <TextField
                      fullWidth
                      value={githubRepo || searchQuery}
                      onChange={(e) => {
                        setSearchQuery(e.target.value);
                        if (!e.target.value) {
                          setGithubRepo('');
                        }
                      }}
                      placeholder="Search repositories..."
                      error={!!errors.githubRepo}
                      helperText={errors.githubRepo}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Box component="span" sx={{ color: 'grey.500' }}>⌕</Box>
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        mb: 2,
                        '& .MuiOutlinedInput-root': {
                          bgcolor: '#1E1E1E',
                          '& fieldset': { borderColor: '#333' },
                          '&:hover fieldset': { borderColor: '#444' },
                        },
                        '& .MuiInputBase-input': { color: 'white' },
                        '& .MuiFormHelperText-root': { color: '#ff4444' }
                      }}
                    />
                  </Box>

                  {!githubRepo && (
                    <Paper
                      variant="outlined"
                      sx={{
                        bgcolor: '#1E1E1E',
                        borderColor: '#333',
                        p: 0,
                        maxHeight: 200,
                        overflow: 'auto',
                        mb: 4,
                        display: githubRepo ? 'none' : 'block'
                      }}
                    >
                      {loading ? (
                        <Box sx={{ p: 2, textAlign: 'center', color: '#888' }}>
                          Loading repositories...
                        </Box>
                      ) : error ? (
                        <Box sx={{ p: 2, textAlign: 'center', color: '#ff4444' }}>
                          {error}
                        </Box>
                      ) : filteredRepos.length === 0 ? (
                        <Box sx={{ p: 2, textAlign: 'center', color: '#888' }}>
                          {searchQuery ? 'No repositories found' : 'No repositories available'}
                        </Box>
                      ) : (
                        <>
                          <Box sx={{ p: 2, borderBottom: '1px solid #333', bgcolor: '#1A1A1A' }}>
                            <Typography variant="caption" sx={{ color: '#888' }}>
                              Showing newest 20 repositories
                            </Typography>
                          </Box>
                          {filteredRepos.map((repo, index) => (
                            <Box
                              key={repo.id}
                              sx={{
                                display: 'flex',
                                alignItems: 'center',
                                p: 2,
                                borderBottom: index < filteredRepos.length - 1 ? '1px solid #333' : 'none',
                                '&:hover': { bgcolor: '#2A2A2A' },
                                cursor: 'pointer'
                              }}
                              onClick={() => {
                                setGithubRepo(repo.full_name);
                                setSearchQuery('');
                              }}
                            >
                              <GitHubIcon sx={{ mr: 2, color: 'white' }} />
                              <Box sx={{ flex: 1 }}>
                                <Typography sx={{ color: 'white' }}>
                                  {repo.full_name}
                                </Typography>
                                <Typography variant="caption" sx={{ color: '#888', display: 'block' }}>
                                  {repo.description || 'No description'}
                                </Typography>
                                <Typography variant="caption" sx={{ color: '#666', display: 'block', mt: 0.5 }}>
                                  Last updated: {new Date(repo.updated_at).toLocaleDateString()}
                                </Typography>
                              </Box>
                            </Box>
                          ))}
                        </>
                      )}
                    </Paper>
                  )}

                  {githubRepo && (
                    <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Button
                        size="small"
                        onClick={() => setGithubRepo('')}
                        sx={{ color: '#888' }}
                      >
                        Change Repository
                      </Button>
                      <Typography variant="body2" sx={{ color: '#888' }}>
                        Selected: {githubRepo}
                      </Typography>
                    </Box>
                  )}

                  {/* Branch */}
                  <Box>
                    <Typography variant="body1" component="p" sx={{ fontWeight: 'medium', mb: 1 }}>
                      Branch
                    </Typography>
                    <Typography variant="caption" sx={{ display: 'block', color: '#888', mb: 1 }}>
                      The Git branch to build and deploy.
                    </Typography>
                    <Select
                      fullWidth
                      value={branch}
                      onChange={(e) => setBranch(e.target.value)}
                      sx={{
                        bgcolor: '#1E1E1E',
                        color: 'white',
                        '& .MuiOutlinedInput-notchedOutline': { borderColor: '#333' },
                        '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#444' },
                        '& .MuiSvgIcon-root': { color: 'white' }
                      }}
                    >
                      <MenuItem value="master">master</MenuItem>
                      <MenuItem value="main">main</MenuItem>
                      <MenuItem value="develop">develop</MenuItem>
                    </Select>
                  </Box>

                  {/* Root Directory */}
                  <Box>
                    <Typography variant="body1" component="p" sx={{ fontWeight: 'medium', mb: 1 }}>
                      Root Directory
                    </Typography>
                    <Typography variant="caption" sx={{ display: 'block', color: '#888', mb: 1 }}>
                      If set, commands will run from this directory instead of
                      the repository root. Most commonly used with a <Box component="span" sx={{ color: '#6B46C1' }}>monorepo</Box>.
                    </Typography>
                    <TextField
                      fullWidth
                      value={rootDirectory}
                      onChange={(e) => setRootDirectory(e.target.value)}
                      placeholder="e.g. frontend"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          bgcolor: '#1E1E1E',
                          '& fieldset': { borderColor: '#333' },
                          '&:hover fieldset': { borderColor: '#444' },
                        },
                        '& .MuiInputBase-input': { color: 'white' }
                      }}
                    />
                  </Box>

                  {/* Build Command */}
                  <Box>
                    <Typography variant="body1" component="p" sx={{ fontWeight: 'medium', mb: 1 }}>
                      Build Command
                    </Typography>
                    <Typography variant="caption" sx={{ display: 'block', color: '#888', mb: 1 }}>
                      Command to build your static site.
                    </Typography>
                    <TextField
                      fullWidth
                      value={buildCommand}
                      onChange={(e) => setBuildCommand(e.target.value)}
                      error={!!errors.buildCommand}
                      helperText={errors.buildCommand}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          bgcolor: '#1E1E1E',
                          '& fieldset': { borderColor: '#333' },
                          '&:hover fieldset': { borderColor: '#444' },
                        },
                        '& .MuiInputBase-input': { color: 'white' },
                        '& .MuiFormHelperText-root': { color: '#ff4444' }
                      }}
                    />
                  </Box>

                  {/* Output Directory */}
                  <Box>
                    <Typography variant="body1" component="p" sx={{ fontWeight: 'medium', mb: 1 }}>
                      Output Directory
                    </Typography>
                    <Typography variant="caption" sx={{ display: 'block', color: '#888', mb: 1 }}>
                      Directory where your built static files are located.
                    </Typography>
                    <TextField
                      fullWidth
                      value={outputDirectory}
                      onChange={(e) => setOutputDirectory(e.target.value)}
                      error={!!errors.outputDirectory}
                      helperText={errors.outputDirectory}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          bgcolor: '#1E1E1E',
                          '& fieldset': { borderColor: '#333' },
                          '&:hover fieldset': { borderColor: '#444' },
                        },
                        '& .MuiInputBase-input': { color: 'white' },
                        '& .MuiFormHelperText-root': { color: '#ff4444' }
                      }}
                    />
                  </Box>

                  {/* Environment Variables */}
                  <Box>
                    <Typography variant="body1" component="p" sx={{ fontWeight: 'medium', mb: 1 }}>
                      Environment Variables
                    </Typography>
                    <Typography variant="caption" sx={{ display: 'block', color: '#888', mb: 2 }}>
                      Set environment-specific config and secrets (such as API keys), then read those
                      values from your code. <Box component="span" sx={{ color: '#6B46C1' }}>Learn more</Box>.
                    </Typography>

                    <Stack spacing={2} sx={{ mb: 2 }}>
                      {envVars.map((variable, index) => (
                        <Box
                          key={index}
                          sx={{
                            display: 'flex',
                            flexDirection: { xs: 'column', sm: 'row' },
                            gap: 2
                          }}
                        >
                          <TextField
                            fullWidth
                            value={variable.name}
                            onChange={(e) => updateEnvVar(index, 'name', e.target.value)}
                            placeholder="NAME_OF_VARIABLE"
                            sx={{
                              flex: 2,
                              '& .MuiOutlinedInput-root': {
                                bgcolor: '#1E1E1E',
                                '& fieldset': { borderColor: '#333' },
                                '&:hover fieldset': { borderColor: '#444' },
                              },
                              '& .MuiInputBase-input': { color: 'white' }
                            }}
                          />
                          <TextField
                            fullWidth
                            value={variable.value}
                            onChange={(e) => updateEnvVar(index, 'value', e.target.value)}
                            placeholder="value"
                            sx={{
                              flex: 2,
                              '& .MuiOutlinedInput-root': {
                                bgcolor: '#1E1E1E',
                                '& fieldset': { borderColor: '#333' },
                                '&:hover fieldset': { borderColor: '#444' },
                              },
                              '& .MuiInputBase-input': { color: 'white' }
                            }}
                          />
                          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', justifyContent: { xs: 'flex-end', sm: 'flex-start' } }}>
                            <Button
                              sx={{ color: '#6B46C1' }}
                            >
                              Generate
                            </Button>
                            <IconButton
                              onClick={() => removeEnvVar(index)}
                              sx={{ color: '#888' }}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Box>
                        </Box>
                      ))}
                    </Stack>

                    <Box sx={{ display: 'flex', gap: 2 }}>
                      <Button
                        variant="outlined"
                        startIcon={<AddIcon />}
                        onClick={addEnvVar}
                        sx={{ color: 'white', borderColor: '#444' }}
                      >
                        Add Environment Variable
                      </Button>
                      <Button
                        variant="outlined"
                        sx={{ color: 'white', borderColor: '#444' }}
                      >
                        Add from .env
                      </Button>
                    </Box>
                  </Box>

                </>
              )}

              {deployMethod === 'upload' && (
                <>
                  {errors.files && (
                    <Typography color="error" sx={{ mt: 1, mb: 2 }}>
                      {errors.files}
                    </Typography>
                  )}

                  <Box sx={{ mb: 4 }}>
                    <Typography variant="body1" component="p" sx={{ fontWeight: 'medium', mb: 1 }}>
                      Upload Static Files
                    </Typography>
                    <Typography variant="caption" sx={{ display: 'block', color: '#888', mb: 2 }}>
                      Drag and drop your static files or folders here. Only static files like HTML, CSS, JavaScript, images, etc. are supported.
                    </Typography>

                    {/* Drag and Drop Area */}
                    <Box
                      ref={dropZoneRef}
                      onDragEnter={handleDragEnter}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                      sx={{
                        border: '2px dashed',
                        borderColor: isDragging ? '#8957ff' : '#333',
                        borderRadius: 2,
                        p: 4,
                        textAlign: 'center',
                        bgcolor: isDragging ? 'rgba(137, 87, 255, 0.05)' : '#1E1E1E',
                        transition: 'all 0.2s ease',
                        cursor: 'pointer',
                        mb: 2
                      }}
                      onClick={handleFileSelect}
                    >
                      <input
                        type="file"
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                        onChange={handleFileChange}
                        multiple
                      />
                      <input
                        type="file"
                        ref={folderInputRef}
                        style={{ display: 'none' }}
                        onChange={handleFileChange}
                        webkitdirectory="true"
                        directory="true"
                      />

                      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                        <InsertDriveFileIcon sx={{ fontSize: 48, color: '#8957ff' }} />
                        <Typography variant="h6" sx={{ color: 'white' }}>
                          {isDragging ? 'Drop files here' : 'Drag & drop files here'}
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#888' }}>
                          or
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 2 }}>
                          <Button
                            variant="outlined"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleFileSelect();
                            }}
                            sx={{ color: 'white', borderColor: '#444' }}
                          >
                            Select Files
                          </Button>
                          <Button
                            variant="outlined"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleFolderSelect();
                            }}
                            sx={{ color: 'white', borderColor: '#444' }}
                          >
                            Select Folder
                          </Button>
                        </Box>
                      </Box>
                    </Box>

                    {/* File List */}
                    {selectedFiles.length > 0 && (
                      <Box sx={{ mt: 3 }}>
                        <Typography variant="body1" component="p" sx={{ fontWeight: 'medium', mb: 2 }}>
                          Selected Files ({selectedFiles.length})
                        </Typography>
                        <Paper
                          variant="outlined"
                          sx={{
                            bgcolor: '#1E1E1E',
                            borderColor: '#333',
                            maxHeight: '300px',
                            overflow: 'auto'
                          }}
                        >
                          <List sx={{ p: 0 }}>
                            {selectedFiles.map((file, index) => (
                              <ListItem
                                key={`${file.name}-${index}`}
                                sx={{
                                  borderBottom: index < selectedFiles.length - 1 ? '1px solid #333' : 'none',
                                  py: 1
                                }}
                              >
                                <ListItemIcon sx={{ minWidth: 40, color: 'white' }}>
                                  {getFileIcon(file)}
                                </ListItemIcon>
                                <ListItemText
                                  primary={
                                    <Typography sx={{ color: 'white', wordBreak: 'break-all' }}>
                                      {file.name}
                                    </Typography>
                                  }
                                  secondary={
                                    <Typography variant="caption" sx={{ color: '#888' }}>
                                      {formatFileSize(file.size)}
                                    </Typography>
                                  }
                                />
                                <IconButton
                                  edge="end"
                                  onClick={() => removeFile(index)}
                                  sx={{ color: '#888' }}
                                >
                                  <DeleteIcon />
                                </IconButton>
                              </ListItem>
                            ))}
                          </List>
                        </Paper>
                      </Box>
                    )}
                  </Box>
                </>
              )}

              {/* Environment Variables */}
              {errors.envVars && (
                <Typography color="error" sx={{ mt: 1, mb: 2 }}>
                  {errors.envVars}
                </Typography>
              )}

              {/* Region */}
              {/* <Box>
                <Typography variant="body1" component="p" sx={{ fontWeight: 'medium', mb: 1 }}>
                  Region
                </Typography>
                <Typography variant="caption" sx={{ display: 'block', color: '#888', mb: 1 }}>
                  Where your static site will be deployed.
                </Typography>

                <Paper variant="outlined" sx={{ bgcolor: '#1E1E1E', borderColor: '#333', overflow: 'hidden' }}>
                  <RadioGroup value={region} onChange={(e) => setRegion(e.target.value)}>
                    <FormControlLabel
                      value="Oregon"
                      control={
                        <Radio
                          sx={{
                            color: '#6B46C1',
                            '&.Mui-checked': { color: '#8B5CF6' },
                            ml: 1
                          }}
                        />
                      }
                      label={
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', py: 2 }}>
                          <Typography sx={{ color: 'white' }}>Oregon (US West)</Typography>
                          <Typography sx={{ color: '#888', mr: 2 }}>13 existing services</Typography>
                        </Box>
                      }
                      sx={{
                        m: 0,
                        width: '100%',
                        borderBottom: '1px solid #333',
                        bgcolor: region === 'Oregon' ? 'rgba(107, 70, 193, 0.1)' : 'transparent',
                      }}
                    />
                    <FormControlLabel
                      value="Singapore"
                      control={
                        <Radio
                          sx={{
                            color: '#6B46C1',
                            '&.Mui-checked': { color: '#8B5CF6' },
                            ml: 1
                          }}
                        />
                      }
                      label={
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', py: 2 }}>
                          <Typography sx={{ color: 'white' }}>Singapore (Southeast Asia)</Typography>
                          <Typography sx={{ color: '#888', mr: 2 }}>4 existing services</Typography>
                        </Box>
                      }
                      sx={{
                        m: 0,
                        width: '100%',
                        bgcolor: region === 'Singapore' ? 'rgba(107, 70, 193, 0.1)' : 'transparent',
                      }}
                    />
                  </RadioGroup>
                </Paper>

                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
                  <Button
                    endIcon={<AddIcon />}
                    sx={{ color: 'white', textTransform: 'none' }}
                  >
                    Deploy in a new region
                  </Button>
                </Box>
              </Box> */}



              {/* Advanced Section */}
              {/* <Box
                sx={{
                  border: '1px solid #333',
                  borderRadius: 1,
                  p: 2
                }}
              >
                <Button
                  endIcon={<ExpandMoreIcon />}
                  sx={{ color: 'white', p: 0 }}
                >
                  Advanced
                </Button>
              </Box> */}

            </Box>

            {/* Deploy Button */}
            <Box sx={{ mt: 4 }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                sx={{
                  bgcolor: '#FFF',
                  color: '#000',
                  '&:hover': { bgcolor: '#E0E0E0' },
                  px: 4,
                  py: 1
                }}
              >
                Deploy Static Site
              </Button>
            </Box>
          </Stack>
        </Box>
      </form>
    </Container>
  );
}

export default StaticSiteForm;
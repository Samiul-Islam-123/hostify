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
  Paper
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
import { useAuth } from '@clerk/clerk-react';
import { useEffect } from 'react';

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
  const fileInputRef = useRef(null);
  const folderInputRef = useRef(null);
  const navigate = useNavigate();

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
    setSelectedFiles(Array.from(event.target.files));
  };

  const handleFolderSelect = () => {
    folderInputRef.current.click();
  };

  const handleFileSelect = () => {
    fileInputRef.current.click();
  };

  const { getToken } = useAuth();
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const authToken = await getToken();
        console.log(authToken);
        
        const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/repos`, {
          headers: {
            Authorization: `Bearer ${authToken}`
          }
        });

        if (!response.ok) throw new Error('Failed to fetch');
        
        setRepos(await response.json());
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchRepos();
  }, [getToken]);

  useEffect(() => {
    console.log(repos);
  },[repos])


  return (
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

      <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'medium', mb: 4 }}>
        Let's deploy a Static Site 🌐
      </Typography>

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

        {deployMethod === 'git' && (
          <>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search"
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
                '& .MuiInputBase-input': { color: 'white' }
              }}
            />

            <Paper
              variant="outlined"
              sx={{
                bgcolor: '#1E1E1E',
                borderColor: '#333',
                p: 0,
                maxHeight: 200,
                overflow: 'auto',
                mb: 4
              }}
            >
              {/* GitHub Repositories List */}
              {['processing_sim', 'hostify', 'adamitras', 'RepoDocs', 'music-platform', 'hoster'].map((repo, index) => (
                <Box
                  key={index}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    p: 2,
                    borderBottom: index < 5 ? '1px solid #333' : 'none',
                    '&:hover': { bgcolor: '#2A2A2A' },
                    cursor: 'pointer'
                  }}
                  onClick={() => setGithubRepo(`Samiul-Islam-123/${repo}`)}
                >
                  <GitHubIcon sx={{ mr: 2, color: 'white' }} />
                  <Typography sx={{ color: 'white' }}>
                    Samiul-Islam-123 / {repo}
                  </Typography>
                  <Typography sx={{ ml: 'auto', color: '#888' }}>
                    {index + 1}d ago
                  </Typography>
                </Box>
              ))}
            </Paper>
          </>
        )}

        {deployMethod === 'upload' && (
          <Paper
            variant="outlined"
            sx={{
              bgcolor: '#1E1E1E',
              borderColor: '#333',
              p: 4,
              mb: 4,
              textAlign: 'center',
              borderStyle: 'dashed'
            }}
          >
            <input
              type="file"
              multiple
              style={{ display: 'none' }}
              ref={fileInputRef}
              onChange={handleFileChange}
            />
            <input
              type="file"
              webkitdirectory="true"
              directory="true"
              style={{ display: 'none' }}
              ref={folderInputRef}
              onChange={handleFileChange}
            />

            <Box sx={{ mb: 3 }}>
              <CloudUploadIcon sx={{ fontSize: 48, color: '#6B46C1', mb: 2 }} />
              <Typography variant="h6" component="p" sx={{ mb: 1 }}>
                Drag and drop your files here
              </Typography>
              <Typography variant="body2" sx={{ color: '#888', mb: 3 }}>
                or select files using one of the options below
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
              <Button
                variant="outlined"
                startIcon={<UploadFileIcon />}
                onClick={handleFileSelect}
                sx={{ color: 'white', borderColor: '#444' }}
              >
                Select Files
              </Button>
              <Button
                variant="outlined"
                startIcon={<FolderIcon />}
                onClick={handleFolderSelect}
                sx={{ color: 'white', borderColor: '#444' }}
              >
                Select Folder
              </Button>
            </Box>

            {selectedFiles.length > 0 && (
              <Box sx={{ mt: 3, textAlign: 'left' }}>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  Selected ({selectedFiles.length} {selectedFiles.length === 1 ? 'file' : 'files'}):
                </Typography>
                <Box sx={{ maxHeight: 100, overflow: 'auto', bgcolor: '#0A0A0A', p: 1, borderRadius: 1 }}>
                  {Array.from(selectedFiles).slice(0, 5).map((file, idx) => (
                    <Typography key={idx} variant="caption" component="div" sx={{ color: '#CCC' }}>
                      {file.name}
                    </Typography>
                  ))}
                  {selectedFiles.length > 5 && (
                    <Typography variant="caption" component="div" sx={{ color: '#888' }}>
                      ...and {selectedFiles.length - 5} more files
                    </Typography>
                  )}
                </Box>
              </Box>
            )}
          </Paper>
        )}
      </Box>

      {/* Main Form */}
      <Stack spacing={4}>
        {/* Site Name */}
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

        {/* Project Section */}
        {/* <Box>
          <Typography variant="body1" component="p" sx={{ fontWeight: 'medium', mb: 1 }}>
            Project <Box component="span" sx={{ color: '#888', fontWeight: 'normal' }}>Optional</Box>
          </Typography>
          <Typography variant="caption" sx={{ display: 'block', color: '#888', mb: 1 }}>
            Add this static site to a project once it's created.
          </Typography>
          <Paper
            variant="outlined"
            sx={{
              bgcolor: '#1E1E1E',
              borderColor: '#333',
              p: 4,
              textAlign: 'center'
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
              <Box sx={{ width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                ⚙️
              </Box>
            </Box>
            <Typography variant="body1" component="p" sx={{ mb: 1 }}>
              Create a new project to add this to?
            </Typography>
            <Typography variant="body2" sx={{ color: '#888', mb: 2 }}>
              You don't have any projects in this workspace. Projects allow you to group
              resources into environments so you can better manage related resources.
            </Typography>
            <Button 
              variant="outlined" 
              startIcon={<AddIcon />}
              sx={{ color: 'white', borderColor: '#444' }}
            >
              Create a project
            </Button>
          </Paper>
        </Box> */}

        {deployMethod === 'git' && (
          <>
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
                Root Directory <Box component="span" sx={{ color: '#888', fontWeight: 'normal' }}>Optional</Box>
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

        {/* Deploy Button */}
        <Box sx={{ mt: 4 }}>
          <Button
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
    </Container>
  );
}

export default StaticSiteForm;
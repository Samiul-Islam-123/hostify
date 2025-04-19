import React, { useState } from 'react';
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
import { useNavigate } from 'react-router-dom';

function BackendServiceForm() {
  const [serviceName, setServiceName] = useState('');
  const [githubRepo, setGithubRepo] = useState('');
  const [language, setLanguage] = useState('Node');
  const [branch, setBranch] = useState('master');
  const [region, setRegion] = useState('Oregon');
  const [rootDirectory, setRootDirectory] = useState('');
  const [buildCommand, setBuildCommand] = useState('$ yarn');
  const [startCommand, setStartCommand] = useState('$ yarn start');
  const [envVars, setEnvVars] = useState([{ name: '', value: '' }]);
  const navigate = useNavigate();

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
      Let's deploy a Web service 🖥️
      </Typography>

      {/* Source Code Section */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" component="p" sx={{ fontWeight: 'medium', mb: 1 }}>
          Source Code
        </Typography>
        {/* <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
          <Button variant="contained" sx={{ bgcolor: '#4B0082', '&:hover': { bgcolor: '#5B0092' } }}>
            Git Provider
          </Button>
          <Button variant="outlined" sx={{ color: '#888', borderColor: '#333' }}>
            Public Git Repository
          </Button>
          <Button variant="outlined" sx={{ color: '#888', borderColor: '#333' }}>
            Existing Image
          </Button>
        </Box> */}

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
                '&:hover': { bgcolor: '#2A2A2A' }
              }}
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
      </Box>

      {/* Main Form */}
      <Stack spacing={4}>
        {/* Service Name */}
        <Box>
          <Typography variant="body1" component="p" sx={{ fontWeight: 'medium', mb: 1 }}>
            Name
          </Typography>
          <Typography variant="caption" sx={{ display: 'block', color: '#888', mb: 1 }}>
            A unique name for your web service.
          </Typography>
          <TextField
            fullWidth
            value={serviceName}
            onChange={(e) => setServiceName(e.target.value)}
            placeholder="music-platform"
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

        {/* Project Section
        <Box>
          <Typography variant="body1" component="p" sx={{ fontWeight: 'medium', mb: 1 }}>
            Project <Box component="span" sx={{ color: '#888', fontWeight: 'normal' }}>Optional</Box>
          </Typography>
          <Typography variant="caption" sx={{ display: 'block', color: '#888', mb: 1 }}>
            Add this web service to a project once it's created.
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

        {/* Language Selection */}
        <Box>
          <Typography variant="body1" component="p" sx={{ fontWeight: 'medium', mb: 1 }}>
            Language
          </Typography>
          <Select
            fullWidth
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            sx={{
              bgcolor: '#1E1E1E',
              color: 'white',
              '& .MuiOutlinedInput-notchedOutline': { borderColor: '#333' },
              '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#444' },
              '& .MuiSvgIcon-root': { color: 'white' }
            }}
          >
            <MenuItem value="Node">Node</MenuItem>
            <MenuItem value="Python">Python</MenuItem>
            <MenuItem value="Ruby">Ruby</MenuItem>
            <MenuItem value="Go">Go</MenuItem>
          </Select>
        </Box>

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

        {/* Region */}
        {/* <Box>
          <Typography variant="body1" component="p" sx={{ fontWeight: 'medium', mb: 1 }}>
            Region
          </Typography>
          <Typography variant="caption" sx={{ display: 'block', color: '#888', mb: 1 }}>
            Your services in the same region can communicate over a
            private network. You currently have services running in
            <Box component="span" sx={{ color: 'white' }}> Oregon</Box> and
            <Box component="span" sx={{ color: 'white' }}> Singapore</Box>.
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

        {/* Root Directory */}
        <Box>
          <Typography variant="body1" component="p" sx={{ fontWeight: 'medium', mb: 1 }}>
            Root Directory <Box component="span" sx={{ color: '#888', fontWeight: 'normal' }}>Optional</Box>
          </Typography>
          <Typography variant="caption" sx={{ display: 'block', color: '#888', mb: 1 }}>
            If set, Render runs commands from this directory instead of
            the repository root. Additionally, code changes outside of this
            directory do not trigger an auto-deploy. Most commonly
            used with a <Box component="span" sx={{ color: '#6B46C1' }}>monorepo</Box>.
          </Typography>
          <TextField
            fullWidth
            value={rootDirectory}
            onChange={(e) => setRootDirectory(e.target.value)}
            placeholder="e.g. src"
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
            Render runs this command to build your app before each
            deploy.
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

        {/* Start Command */}
        <Box>
          <Typography variant="body1" component="p" sx={{ fontWeight: 'medium', mb: 1 }}>
            Start Command
          </Typography>
          <Typography variant="caption" sx={{ display: 'block', color: '#888', mb: 1 }}>
            Render runs this command to start your app with each
            deploy.
          </Typography>
          <TextField
            fullWidth
            value={startCommand}
            onChange={(e) => setStartCommand(e.target.value)}
            required
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
            
          </Box>
        </Box>

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
            // sx={{
            //   bgcolor: '#FFF',
            //   color: 'primary',
            //   '&:hover': { bgcolor: '#E0E0E0' },
            //   px: 4,
            //   py: 1
            // }}
          >
            Deploy Web Service
          </Button>
        </Box>
      </Stack>
    </Container>
  );
}

export default BackendServiceForm;
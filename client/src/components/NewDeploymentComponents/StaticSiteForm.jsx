import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
  CircularProgress
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import GitHubIcon from '@mui/icons-material/GitHub';
import UploadFileIcon from '@mui/icons-material/UploadFile';

function StaticSiteForm() {
  const [deployMethod, setDeployMethod] = useState('github');
  const [githubUrl, setGithubUrl] = useState('');
  const [buildCommand, setBuildCommand] = useState('npm run build');
  const [outputDirectory, setOutputDirectory] = useState('build');
  const [branchName, setBranchName] = useState('main');
  const [siteName, setSiteName] = useState('');
  const [isDeploying, setIsDeploying] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleDeployMethodChange = (event) => {
    setDeployMethod(event.target.value);
  };

  const handleFileChange = (event) => {
    setSelectedFiles(Array.from(event.target.files));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsDeploying(true);
    
    // Simulate deployment process
    setTimeout(() => {
      setIsDeploying(false);
      alert(`Site deployment initiated! Method: ${deployMethod}`);
    }, 2000);
  };

  return (
    <Container maxWidth="md" style={{
        height : "100vh"
    }}>
      <Card sx={{ pt: 0, mb: 0 }}>
        <CardContent>
          <Typography variant="h4" component="h1" gutterBottom align="center">
            Deploy Your Static Site
          </Typography>
          
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4 }}>
            <FormControl component="fieldset" sx={{ mb: 4, width: '100%' }}>
              <FormLabel component="legend">Deployment Method</FormLabel>
              <RadioGroup
                row
                name="deployMethod"
                value={deployMethod}
                onChange={handleDeployMethodChange}
              >
                <FormControlLabel 
                  value="github" 
                  control={<Radio />} 
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <GitHubIcon sx={{ mr: 1 }} />
                      <Typography>GitHub Repository</Typography>
                    </Box>
                  } 
                />
                <FormControlLabel 
                  value="upload" 
                  control={<Radio />} 
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <UploadFileIcon sx={{ mr: 1 }} />
                      <Typography>Upload Files</Typography>
                    </Box>
                  } 
                />
              </RadioGroup>
            </FormControl>

            <Divider sx={{ mb: 4 }} />

            {deployMethod === 'github' ? (
              <Stack spacing={3}>
                <TextField
                  required
                  fullWidth
                  label="Site Name"
                  variant="outlined"
                  value={siteName}
                  onChange={(e) => setSiteName(e.target.value)}
                  placeholder="my-awesome-site"
                />
                <TextField
                  required
                  fullWidth
                  label="GitHub Repository URL"
                  variant="outlined"
                  value={githubUrl}
                  onChange={(e) => setGithubUrl(e.target.value)}
                  placeholder="https://github.com/username/repo"
                />
                <Grid container spacing={2}>
                  <Grid item xs={12} md={4}>
                    <TextField
                      fullWidth
                      label="Branch"
                      variant="outlined"
                      value={branchName}
                      onChange={(e) => setBranchName(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField
                      fullWidth
                      label="Build Command"
                      variant="outlined"
                      value={buildCommand}
                      onChange={(e) => setBuildCommand(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField
                      fullWidth
                      label="Output Directory"
                      variant="outlined"
                      value={outputDirectory}
                      onChange={(e) => setOutputDirectory(e.target.value)}
                    />
                  </Grid>
                </Grid>
              </Stack>
            ) : (
              <Stack spacing={3}>
                <TextField
                  required
                  fullWidth
                  label="Site Name"
                  variant="outlined"
                  value={siteName}
                  onChange={(e) => setSiteName(e.target.value)}
                  placeholder="my-awesome-site"
                />
                <Box sx={{ textAlign: 'center', py: 4, border: '2px dashed #ccc', borderRadius: 2 }}>
                  <input
                    accept=".html,.css,.js,.zip,.tar.gz"
                    style={{ display: 'none' }}
                    id="file-upload"
                    type="file"
                    multiple
                    onChange={handleFileChange}
                  />
                  <label htmlFor="file-upload">
                    <Button
                      variant="contained"
                      component="span"
                      startIcon={<CloudUploadIcon />}
                    >
                      Select Files
                    </Button>
                  </label>
                  <Typography variant="body2" sx={{ mt: 2 }}>
                    {selectedFiles.length > 0
                      ? `${selectedFiles.length} file(s) selected`
                      : 'Upload HTML, CSS, JS files or a ZIP archive'}
                  </Typography>
                </Box>
              </Stack>
            )}

            <Box sx={{ mt: 4, textAlign: 'center' }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                disabled={isDeploying}
                startIcon={isDeploying ? <CircularProgress size={24} /> : <CloudUploadIcon />}
              >
                {isDeploying ? 'Deploying...' : 'Deploy Site'}
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}

export default StaticSiteForm;
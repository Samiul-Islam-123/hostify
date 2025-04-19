import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  FormControl,
  IconButton,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
  InputAdornment,
  Paper,
  Slider,
  Switch,
  FormControlLabel,
  Tooltip
} from '@mui/material';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import StorageIcon from '@mui/icons-material/Storage';
import { useNavigate } from 'react-router-dom';

function DatabaseForm() {
  const navigate = useNavigate();
  const [databaseName, setDatabaseName] = useState('');
  const [databaseType, setDatabaseType] = useState('PostgreSQL');
  const [version, setVersion] = useState('14');
  const [region, setRegion] = useState('Oregon');
  const [tier, setTier] = useState('Standard');
  const [storage, setStorage] = useState(10);
  const [backupEnabled, setBackupEnabled] = useState(true);
  const [backupRetention, setBackupRetention] = useState(7);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [allowedIPs, setAllowedIPs] = useState([{ value: '0.0.0.0/0' }]);

  // Version options based on database type
  const versionOptions = {
    PostgreSQL: ['14', '13', '12', '11', '10'],
    MySQL: ['8.0', '5.7', '5.6'],
    MongoDB: ['6.0', '5.0', '4.4'],
    Redis: ['7.0', '6.2', '6.0', '5.0']
  };

  const addAllowedIP = () => {
    setAllowedIPs([...allowedIPs, { value: '' }]);
  };

  const removeAllowedIP = (index) => {
    const updatedIPs = [...allowedIPs];
    updatedIPs.splice(index, 1);
    setAllowedIPs(updatedIPs);
  };

  const updateAllowedIP = (index, value) => {
    const updatedIPs = [...allowedIPs];
    updatedIPs[index].value = value;
    setAllowedIPs(updatedIPs);
  };

  const handleDatabaseTypeChange = (event) => {
    const newType = event.target.value;
    setDatabaseType(newType);
    // Set default version when database type changes
    setVersion(versionOptions[newType][0]);
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
        Let's deploy a Database 🗄️
      </Typography>

      {/* Main Form */}
      <Stack spacing={4}>
        {/* Database Name */}
        <Box>
          <Typography variant="body1" component="p" sx={{ fontWeight: 'medium', mb: 1 }}>
            Database Name
          </Typography>
          <Typography variant="caption" sx={{ display: 'block', color: '#888', mb: 1 }}>
            A unique name for your database instance.
          </Typography>
          <TextField
            fullWidth
            value={databaseName}
            onChange={(e) => setDatabaseName(e.target.value)}
            placeholder="my-production-db"
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

        {/* Database Type */}
        <Box>
          <Typography variant="body1" component="p" sx={{ fontWeight: 'medium', mb: 1 }}>
            Database Type
          </Typography>
          <Typography variant="caption" sx={{ display: 'block', color: '#888', mb: 1 }}>
            Select the type of database you want to deploy.
          </Typography>
          <Select
            fullWidth
            value={databaseType}
            onChange={handleDatabaseTypeChange}
            sx={{
              bgcolor: '#1E1E1E',
              color: 'white',
              '& .MuiOutlinedInput-notchedOutline': { borderColor: '#333' },
              '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#444' },
              '& .MuiSvgIcon-root': { color: 'white' }
            }}
            startAdornment={
              <InputAdornment position="start">
                <StorageIcon sx={{ color: '#6B46C1' }} />
              </InputAdornment>
            }
          >
            <MenuItem value="PostgreSQL">PostgreSQL</MenuItem>
            <MenuItem value="MySQL">MySQL</MenuItem>
            <MenuItem value="MongoDB">MongoDB</MenuItem>
            <MenuItem value="Redis">Redis</MenuItem>
          </Select>
        </Box>

        {/* Version */}
        <Box>
          <Typography variant="body1" component="p" sx={{ fontWeight: 'medium', mb: 1 }}>
            Version
          </Typography>
          <Typography variant="caption" sx={{ display: 'block', color: '#888', mb: 1 }}>
            Select the version of {databaseType} to deploy.
          </Typography>
          <Select
            fullWidth
            value={version}
            onChange={(e) => setVersion(e.target.value)}
            sx={{
              bgcolor: '#1E1E1E',
              color: 'white',
              '& .MuiOutlinedInput-notchedOutline': { borderColor: '#333' },
              '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#444' },
              '& .MuiSvgIcon-root': { color: 'white' }
            }}
          >
            {versionOptions[databaseType].map((v) => (
              <MenuItem key={v} value={v}>{v}</MenuItem>
            ))}
          </Select>
        </Box>

        {/* Region */}
        <Box>
          <Typography variant="body1" component="p" sx={{ fontWeight: 'medium', mb: 1 }}>
            Region
          </Typography>
          <Typography variant="caption" sx={{ display: 'block', color: '#888', mb: 1 }}>
            Choose the geographical region where your database will be hosted. For best performance, select a region close to your application servers.
          </Typography>
          <Select
            fullWidth
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            sx={{
              bgcolor: '#1E1E1E',
              color: 'white',
              '& .MuiOutlinedInput-notchedOutline': { borderColor: '#333' },
              '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#444' },
              '& .MuiSvgIcon-root': { color: 'white' }
            }}
          >
            <MenuItem value="Oregon">Oregon (US West)</MenuItem>
            <MenuItem value="Virginia">Virginia (US East)</MenuItem>
            <MenuItem value="Frankfurt">Frankfurt (EU Central)</MenuItem>
            <MenuItem value="Singapore">Singapore (Southeast Asia)</MenuItem>
            <MenuItem value="Sydney">Sydney (Australia)</MenuItem>
          </Select>
        </Box>

        {/* Database Tier */}
        <Box>
          <Typography variant="body1" component="p" sx={{ fontWeight: 'medium', mb: 1 }}>
            Database Tier
          </Typography>
          <Typography variant="caption" sx={{ display: 'block', color: '#888', mb: 1 }}>
            Select the performance tier based on your workload requirements.
          </Typography>
          <Select
            fullWidth
            value={tier}
            onChange={(e) => setTier(e.target.value)}
            sx={{
              bgcolor: '#1E1E1E',
              color: 'white',
              '& .MuiOutlinedInput-notchedOutline': { borderColor: '#333' },
              '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#444' },
              '& .MuiSvgIcon-root': { color: 'white' }
            }}
          >
            <MenuItem value="Starter">Starter - 1 vCPU, 2GB RAM ($15/month)</MenuItem>
            <MenuItem value="Standard">Standard - 2 vCPU, 4GB RAM ($30/month)</MenuItem>
            <MenuItem value="Professional">Professional - 4 vCPU, 8GB RAM ($60/month)</MenuItem>
            <MenuItem value="Business">Business - 8 vCPU, 16GB RAM ($120/month)</MenuItem>
          </Select>
        </Box>

        {/* Storage */}
        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="body1" component="p" sx={{ fontWeight: 'medium' }}>
              Storage (GB)
            </Typography>
            <Typography variant="body2" sx={{ color: 'white' }}>
              {storage} GB
            </Typography>
          </Box>
          <Typography variant="caption" sx={{ display: 'block', color: '#888', mb: 1 }}>
            Storage capacity for your database. You can increase this later if needed.
          </Typography>
          <Slider
            value={storage}
            onChange={(e, newValue) => setStorage(newValue)}
            min={5}
            max={100}
            step={5}
            sx={{
              color: '#6B46C1',
              '& .MuiSlider-thumb': {
                height: 24,
                width: 24,
              },
              '& .MuiSlider-valueLabel': {
                backgroundColor: '#6B46C1',
              },
            }}
            valueLabelDisplay="auto"
          />
        </Box>

        {/* Authentication */}
        <Box>
          <Typography variant="body1" component="p" sx={{ fontWeight: 'medium', mb: 2 }}>
            Authentication
          </Typography>
          
          <Stack spacing={2}>
            <Box>
              <Typography variant="caption" sx={{ display: 'block', color: '#888', mb: 1 }}>
                Admin Username
              </Typography>
              <TextField
                fullWidth
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="dbadmin"
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
            
            <Box>
              <Typography variant="caption" sx={{ display: 'block', color: '#888', mb: 1 }}>
                Password
              </Typography>
              <TextField
                fullWidth
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter a secure password"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    bgcolor: '#1E1E1E',
                    '& fieldset': { borderColor: '#333' },
                    '&:hover fieldset': { borderColor: '#444' },
                  },
                  '& .MuiInputBase-input': { color: 'white' }
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Button sx={{ color: '#6B46C1' }}>
                        Generate
                      </Button>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
          </Stack>
        </Box>

        {/* Backup Settings */}
        <Box>
          <Typography variant="body1" component="p" sx={{ fontWeight: 'medium', mb: 1 }}>
            Backup Settings
          </Typography>
          <Stack spacing={2}>
            <FormControlLabel
              control={
                <Switch 
                  checked={backupEnabled}
                  onChange={(e) => setBackupEnabled(e.target.checked)}
                  sx={{
                    '& .MuiSwitch-switchBase.Mui-checked': {
                      color: '#6B46C1',
                      '&:hover': {
                        backgroundColor: 'rgba(107, 70, 193, 0.08)',
                      },
                    },
                    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                      backgroundColor: '#6B46C1',
                    },
                  }}
                />
              }
              label="Enable Automated Backups"
            />
            
            {backupEnabled && (
              <Box>
                <Typography variant="caption" sx={{ display: 'block', color: '#888', mb: 1 }}>
                  Backup Retention Period (Days)
                </Typography>
                <Select
                  fullWidth
                  value={backupRetention}
                  onChange={(e) => setBackupRetention(e.target.value)}
                  sx={{
                    bgcolor: '#1E1E1E',
                    color: 'white',
                    '& .MuiOutlinedInput-notchedOutline': { borderColor: '#333' },
                    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#444' },
                    '& .MuiSvgIcon-root': { color: 'white' }
                  }}
                >
                  <MenuItem value={1}>1 day</MenuItem>
                  <MenuItem value={3}>3 days</MenuItem>
                  <MenuItem value={7}>7 days</MenuItem>
                  <MenuItem value={14}>14 days</MenuItem>
                  <MenuItem value={30}>30 days</MenuItem>
                </Select>
              </Box>
            )}
          </Stack>
        </Box>

        {/* Network Access */}
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            <Typography variant="body1" component="p" sx={{ fontWeight: 'medium' }}>
              Network Access
            </Typography>
            <Tooltip title="Specify IP addresses or CIDR ranges that are allowed to connect to your database. Use 0.0.0.0/0 to allow connections from anywhere (not recommended for production).">
              <HelpOutlineIcon sx={{ color: '#888', fontSize: 18 }} />
            </Tooltip>
          </Box>
          <Typography variant="caption" sx={{ display: 'block', color: '#888', mb: 2 }}>
            Control which IP addresses can connect to your database.
          </Typography>

          <Stack spacing={2} sx={{ mb: 2 }}>
            {allowedIPs.map((ip, index) => (
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
                  value={ip.value}
                  onChange={(e) => updateAllowedIP(index, e.target.value)}
                  placeholder="IP address or CIDR range (e.g., 192.168.1.0/24)"
                  sx={{
                    flex: 1,
                    '& .MuiOutlinedInput-root': {
                      bgcolor: '#1E1E1E',
                      '& fieldset': { borderColor: '#333' },
                      '&:hover fieldset': { borderColor: '#444' },
                    },
                    '& .MuiInputBase-input': { color: 'white' }
                  }}
                />
                <IconButton
                  onClick={() => removeAllowedIP(index)}
                  disabled={allowedIPs.length === 1}
                  sx={{ color: '#888' }}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            ))}
          </Stack>

          <Button
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={addAllowedIP}
            sx={{ color: 'white', borderColor: '#444' }}
          >
            Add IP Address
          </Button>
        </Box>

        {/* Connection Info Preview */}
        <Paper
          variant="outlined"
          sx={{
            bgcolor: '#1E1E1E',
            borderColor: '#333',
            p: 3,
            mt: 2
          }}
        >
          <Typography variant="body1" component="p" sx={{ fontWeight: 'medium', mb: 2 }}>
            Connection Details Preview
          </Typography>
          
          <Box sx={{ mb: 2 }}>
            <Typography variant="caption" sx={{ color: '#888' }}>
              Connection String:
            </Typography>
            <Typography variant="body2" sx={{ fontFamily: 'monospace', bgcolor: '#121212', p: 1, borderRadius: 1 }}>
              {databaseType === 'PostgreSQL' && `postgresql://${username || 'username'}:${password ? '********' : 'password'}@${databaseName || 'db-name'}.${region.toLowerCase()}.render.com:5432/postgres`}
              {databaseType === 'MySQL' && `mysql://${username || 'username'}:${password ? '********' : 'password'}@${databaseName || 'db-name'}.${region.toLowerCase()}.render.com:3306/mysql`}
              {databaseType === 'MongoDB' && `mongodb://${username || 'username'}:${password ? '********' : 'password'}@${databaseName || 'db-name'}.${region.toLowerCase()}.render.com:27017/admin`}
              {databaseType === 'Redis' && `redis://${username || 'username'}:${password ? '********' : 'password'}@${databaseName || 'db-name'}.${region.toLowerCase()}.render.com:6379`}
            </Typography>
          </Box>
          
          <Typography variant="caption" sx={{ color: '#888', display: 'block', mt: 1 }}>
            Connection details will be available after database creation.
          </Typography>
        </Paper>

        {/* Deploy Button */}
        <Box sx={{ mt: 4 }}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            sx={{
              px: 4,
              py: 1
            }}
          >
            Deploy Database
          </Button>
        </Box>
      </Stack>
    </Container>
  );
}

export default DatabaseForm;
import React from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Card,
  CardContent,
  CardActionArea,
  Avatar,
  Chip,
  Divider
} from '@mui/material';
import { 
  AccessTime as AccessTimeIcon,
  Public as PublicIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  HourglassEmpty as HourglassEmptyIcon
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { projectsData } from '../../../SampleData/ProjectData';

// Styled components
const ProjectCard = styled(Card)(({ theme, status }) => ({
  height: '100%',
  backgroundColor: '#1e1e1e',
  borderRadius: '12px',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 10px 20px rgba(0,0,0,0.25)'
  },
  border: status === 'inactive' ? '1px solid #30363d' : 'none',
  opacity: status === 'inactive' ? 0.7 : 1
}));

const StatusChip = styled(Chip)(({ status }) => {
  let color;
  switch (status) {
    case 'running':
      color = '#4caf50';
      break;
    case 'stopped':
      color = '#f44336';
      break;
    case 'deploying':
      color = '#ff9800';
      break;
    default:
      color = '#757575';
  }

  return {
    backgroundColor: `${color}33`,
    color: color,
    fontWeight: 'bold',
    borderRadius: '16px',
    fontSize: '0.75rem'
  };
});

const TechChip = styled(Chip)({
  backgroundColor: '#8957ff33',
  color: '#8957ff',
  height: '24px',
  fontSize: '0.7rem',
  margin: '0 4px 4px 0'
});

const ProjectThumbnail = styled(Avatar)(({ projecttype }) => {
  const colors = {
    ecommerce: '#ff9800',
    portfolio: '#8957ff',
    tasks: '#4caf50',
    weather: '#2196f3',
    blog: '#e91e63',
    chat: '#9c27b0'
  };

  return {
    width: '60px',
    height: '60px',
    backgroundColor: colors[projecttype] || '#8957ff',
    fontSize: '1.5rem',
    fontWeight: 'bold'
  };
});

function getStatusIcon(status) {
  switch (status) {
    case 'running':
      return <CheckCircleIcon sx={{ color: '#4caf50', fontSize: '1rem' }} />;
    case 'stopped':
      return <ErrorIcon sx={{ color: '#f44336', fontSize: '1rem' }} />;
    case 'deploying':
      return <HourglassEmptyIcon sx={{ color: '#ff9800', fontSize: '1rem' }} />;
    default:
      return null;
  }
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

function Projects() {
  const navigate = useNavigate();

  const handleProjectClick = (projectId) => {
    navigate(`/dashboard/project/${projectId}`);
  };

  return (
    <Box sx={{ p: 3, maxWidth: '1200px', margin: '0 auto' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', color: 'white' }}>
          My Projects
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {projectsData.map((project) => (
          <Grid item xs={12} sm={6} md={4} key={project.id} sx={{ display: 'flex' }}>
            <ProjectCard status={project.status}>
              <CardActionArea onClick={() => handleProjectClick(project.id)} sx={{ height: '100%' }}>
                <CardContent sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <ProjectThumbnail projecttype={project.thumbnail}>
                      {project.name.substring(0, 1)}
                    </ProjectThumbnail>
                    <StatusChip 
                      label={project.deployStatus.toUpperCase()} 
                      status={project.deployStatus}
                      icon={getStatusIcon(project.deployStatus)}
                    />
                  </Box>

                  <Box>
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        fontWeight: 'bold', 
                        color: 'white', 
                        mb: 1,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}
                    >
                      {project.name}
                    </Typography>

                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: '#adbac7', 
                        mb: 2,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        minHeight: '40px'
                      }}
                    >
                      {project.description}
                    </Typography>

                    <Box sx={{ mb: 2 }}>
                      {project.technology.slice(0, 3).map((tech, index) => (
                        <TechChip key={index} label={tech} size="small" />
                      ))}
                      {project.technology.length > 3 && (
                        <TechChip label={`+${project.technology.length - 3}`} size="small" />
                      )}
                    </Box>
                  </Box>

                  <Divider sx={{ backgroundColor: '#30363d', my: 2 }} />

                  <Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <PublicIcon sx={{ color: '#8957ff', mr: 1, fontSize: '1.2rem' }} />
                      <Typography variant="body2" sx={{ color: '#adbac7' }}>
                        {project.domains[0]}
                      </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <AccessTimeIcon sx={{ color: '#adbac7', mr: 1, fontSize: '1.2rem' }} />
                      <Typography variant="caption" sx={{ color: '#adbac7' }}>
                        Updated {formatDate(project.lastUpdated)}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </CardActionArea>
            </ProjectCard>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Projects;

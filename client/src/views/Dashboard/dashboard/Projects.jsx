import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { projectsData } from '../../../SampleData/ProjectData';
import ProjectCard from '../../../components/ui/ProjectCard';

function Projects() {
  const navigate = useNavigate();

  const handleProjectClick = (projectId) => {
    navigate(`/dashboard/project/${projectId}`);
  };

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        minHeight: '100%',
        backgroundColor: '#1e1e1e',
        color: 'white',
        p: 3,
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 4,
        }}
      >
        <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
          My Projects
        </Typography>
      </Box>

      <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>
        <Grid container spacing={2}>
          {projectsData.map((project) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              key={project.id}
              sx={{
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <Box
                sx={{
                  width: '100%',
                  maxWidth: '350px',
                  height: '200px', // fixed height
                  backgroundColor: '#2c2c2c',
                  borderRadius: 2,
                  overflow: 'hidden',
                }}
              >
                <ProjectCard project={project} onClick={handleProjectClick} />
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}

export default Projects;

import React from 'react';
import data from '../../../SampleData/DaploymentData';

function Deployment() {
  return (
    <div>
      <h2>Deployment Projects</h2>
      {data.projects.map((project, index) => (
        <div key={index}>
          <h3>{project.name}</h3>
          <p>{project.description}</p>
        </div>
      ))}
    </div>
  );
}

export default Deployment;

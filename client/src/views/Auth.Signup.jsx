import React from 'react';
import { SignUp } from '@clerk/clerk-react';

const Signup = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
        <h1 style={{ textAlign: 'center' }}>Sign Up</h1>
        <SignUp />
      </div>
    </div>
  );
};

export default Signup; 
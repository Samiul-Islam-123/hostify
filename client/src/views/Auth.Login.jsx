import React from 'react';
import { SignIn } from '@clerk/clerk-react';

const Login = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
        <h1 style={{ textAlign: 'center' }}>Login</h1>
        <SignIn />
      </div>
    </div>
  );
};

export default Login; 
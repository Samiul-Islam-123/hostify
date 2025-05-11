import React, { useEffect } from 'react'
import { Navigate, Outlet, Route, Routes } from 'react-router-dom'
import LandinPage from '../views/LandingPage/LandinPage'
import Login from '../views/Auth/Login'
import Signup from '../views/Auth/Signup'
import DashboardRouter from '../views/Dashboard/DashboardRouter'
import DashboardFrame from '../views/Dashboard/DashboardFrame'
import StaticSiteForm from '../components/NewDeploymentComponents/StaticSiteForm'
import BackendServiceForm from '../components/NewDeploymentComponents/BackendServiceForm'
import DatabaseForm from '../components/NewDeploymentComponents/DatabaseForm'
import FullStackForm from '../components/NewDeploymentComponents/FullStackForm'
import ProjectManagerFrame from '../views/Project/ProjectManagerFrame'
import { RedirectToSignIn, useAuth, useUser } from '@clerk/clerk-react'

// Protected Route Wrapper
const ProtectedRoute = () => {
  const { isSignedIn, isLoaded } = useAuth();
  
  if (!isLoaded) {
    // Optional: Show loading spinner
    return <div>Loading...</div>;
  }

  return isSignedIn ? <Outlet /> : <RedirectToSignIn />;
};

// Public-only Route Wrapper (for login/signup)
const PublicOnlyRoute = async () => {
  const { isSignedIn } = useAuth();
  

  return isSignedIn ? <Navigate to="/dashboard" /> : <Outlet />;
};

function RoutesManager() {

  const {isSignedIn} = useAuth();
  const {user} = useUser();

  const RegisterUser = async(payload) => {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/register`,payload);
    return response;
  }

  useEffect(() => {
    if(user)
    {
      //console.log(user)
      const email = user.primaryEmailAddress.emailAddress;
      const username = user.fullName;
      const avatarURL = user.imageUrl;
      const isVerified = user.emailAddresses[0].verification.status === "verified" ? true : false;

      //console.log(email, username, avatarURL, isVerified)
      if(!isSignedIn){
        const response = RegisterUser({username, email, isVerified, avatarURL});
        
      }
    }
  },[isSignedIn])

  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<PublicOnlyRoute />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Route>

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard/*" element={<DashboardFrame />} />
        <Route path="/project/*" element={<ProjectManagerFrame />} />
        <Route path="/create/static-website" element={<StaticSiteForm />} />
        <Route path="/create/backend-service" element={<BackendServiceForm />} />
        <Route path="/create/database" element={<DatabaseForm />} />
        <Route path="/create/fullstack-application" element={<FullStackForm />} />
      </Route>

      {/* Public Landing Page */}
      <Route path="/" element={<LandinPage />} />
      
      {/* Catch-all redirect */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default RoutesManager;
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LandinPage from '../views/LandingPage/LandinPage'
import Login from '../views/Auth/Login'
import Signup from '../views/Auth/Signup'
import DashboardRouter from '../views/Dashboard/DashboardRouter'
import DashboardFrame from '../views/Dashboard/DashboardFrame'
import StaticSiteForm from '../components/NewDeploymentComponents/StaticSiteForm'
import BackendServiceForm from '../components/NewDeploymentComponents/BackendServiceForm'
import DatabaseForm from '../components/NewDeploymentComponents/DatabaseForm'
import FullStackForm from '../components/NewDeploymentComponents/FullStackForm'

function RoutesManager() {
  return (
    <>
        <Routes>
            <Route exact path='/' element={<LandinPage />} />
            <Route exact path='/login' element ={<Login />} />
            <Route exact path='/signup' element ={<Signup />} />
            
            <Route exact path='/dashboard/*' element ={<DashboardFrame />} />

            <Route exact path='/create/static-website' element ={<StaticSiteForm />} />
            <Route exact path='/create/backend-service' element ={<BackendServiceForm />} />
            <Route exact path='/create/database' element ={<DatabaseForm />} />
            <Route exact path='/create/fullstack-application' element ={<FullStackForm />} />
            

        </Routes>
    </>
  )
}

export default RoutesManager
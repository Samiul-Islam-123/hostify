import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LandinPage from '../views/LandingPage/LandinPage'
import Login from '../views/Auth/Login'
import Signup from '../views/Auth/Signup'
import DashboardRouter from '../views/Dashboard/DashboardRouter'
import DashboardFrame from '../views/Dashboard/DashboardFrame'

function RoutesManager() {
  return (
    <>
        <Routes>
            <Route exact path='/' element={<LandinPage />} />
            <Route exact path='/login' element ={<Login />} />
            <Route exact path='/signup' element ={<Signup />} />
            
            <Route exact path='/dashboard/*' element ={<DashboardFrame />} />
        
        </Routes>
    </>
  )
}

export default RoutesManager
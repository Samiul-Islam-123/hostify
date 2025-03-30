import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Profile from './Settings/Settings'
import Deployment from './Deployment/Deployment'
import Settings from './Settings/Settings'
import Domains from './Domains/Domains'
import Billing from './Billing/Billing'
import DashboardFrame from './DashboardFrame'
import Dashboard from './dashboard/Dashboard'

function DashboardRouter() {
  return (
    <>
      <Routes>
        {/**kind of overview */}
        <Route exact path="/" element={<Dashboard />} />
        
        <Route exact path="/deployments" element={<Deployment />} />
        <Route exact path="/domains" element={<Domains />} />
        <Route exact path="/billing" element={<Billing />} />

        <Route exact path="/settings" element={<Settings />} />

      </Routes>
    </>
  )
}

export default DashboardRouter
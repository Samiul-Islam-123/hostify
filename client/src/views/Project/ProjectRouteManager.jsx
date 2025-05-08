import React from 'react'
import { Route, Routes } from 'react-router-dom'
import History from './History'
import Logs from './Logs'
import Environment from './Environment'
import Analytics from './Analytics'
import Settings from './Settings'

function ProjectRouteManager() {
  return (
    <>
      <Routes>
        <Route exact path='/' element={<History />}></Route>
        <Route exact path='/history' element={<History />}></Route>
        <Route exact path='/logs' element={<Logs />}></Route>
        <Route exact path='/environment' element={<Environment />}></Route>
        <Route exact path='/analytics' element={<Analytics />}></Route>
        <Route exact path='/settings' element={<Settings />}></Route>
        
      </Routes>
    </>
  )
}

export default ProjectRouteManager
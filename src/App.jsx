import React from 'react'
import './App.css'
import Nav from './components/Nav'
import Rodape from './components/rodape'

import { Outlet } from 'react-router-dom'

function App() {
  return (
    <>
    <Nav/>
    <Outlet/>
    <Rodape/>
    </>
  )
}

export default App

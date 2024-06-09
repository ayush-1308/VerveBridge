import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Signup from './components/Signup'
import Signin from './components/Signin'
import Dashboard from './components/Dashboard'
import CreateNote from './components/CreateNote'
import SearchResult from './components/SearchResult'
import EditNote from './components/EditNote'

function App() {
  return ( 
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Signup />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/create-note" element={<CreateNote />} />
      <Route path="/search" element={<SearchResult />} />
      <Route path="/edit-note" element={<EditNote />} />
    </Routes>
    </BrowserRouter>
  )
}

export default App

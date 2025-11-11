import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home/Home';
import { UserProvider } from './contexts/UserContext';
import { UserDetail } from './pages/UserDetail/UserDetail';
import './App.css'

function App() {

  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/user/:id" element={<UserDetail/>} />
        </Routes>
      </BrowserRouter>
    </UserProvider>    
  )
}

export default App

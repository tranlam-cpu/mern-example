import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './components/layout/Landing';
import Auth from './views/Auth';
import AuthContextProvider from './contexts/AuthContext'
import PostContextProvider from './contexts/PostContext'
import ScheduleContextProvider from './contexts/ScheduleContext'
import Dashboard from './views/Dashboard'
import About from './views/About'
import Schedule from './views/Schedule'
import FileManager from './views/FileManager'
import ProtectedRoute from './components/routing/ProtectedRoute'
import NavbarMenu from './components/layout/NavbarMenu'

function App() {
  return (
    <AuthContextProvider>
      <PostContextProvider>
        <ScheduleContextProvider>
          <BrowserRouter>
            <Routes>
              <Route exact path='/' element={<Landing/>} />
              <Route exact path='/login' element={<Auth authRoute='login'/>} />
              <Route exact path='/register' element={<Auth authRoute='register'/>} />
              <Route exact path='/forgotpassword' element={<Auth authRoute='forgotpassword'/>} />
              <Route exact path='/dashboard' element={
                <ProtectedRoute>
                  <NavbarMenu />
                  <Dashboard />
                </ProtectedRoute>
              } />
              <Route exact path='/schedule' element={
                <ProtectedRoute>
                  <NavbarMenu />
                  <Schedule />
                </ProtectedRoute>
              } />
              <Route exact path='/file' element={
                <ProtectedRoute>
                  <NavbarMenu />
                  <FileManager />
                </ProtectedRoute>
              } />
              <Route exact path='/About' element={
                <ProtectedRoute>
                  <NavbarMenu />
                  <About />
                </ProtectedRoute>
              } />
            </Routes>
          </BrowserRouter>
        </ScheduleContextProvider>
      </PostContextProvider>
    </AuthContextProvider>
    
  )
}

export default App

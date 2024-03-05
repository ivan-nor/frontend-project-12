/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  useLocation,
  useNavigate
} from 'react-router-dom'
import axios from 'axios'
import PropTypes from 'prop-types'

import { Button, Navbar, Nav } from 'react-bootstrap'
import useAuth from '../hooks/index.jsx'
import AuthContext from '../contexts/index.jsx'
import '../assets/App.css'
import LoginPage from './LoginPage'
import PublicPage from './PublicPage'
import ErrorPath from './ErrorPath'
import MainPage from './MainPage'
import ChatPage from './ChatPage'

const AuthProvider = ({ children }) => {
  const initialLogged = localStorage.getItem('userId') !== null
  const [loggedIn, setLoggedIn] = useState(initialLogged)

  const logIn = () => setLoggedIn(true)
  const logOut = () => {
    localStorage.removeItem('userId')
    // console.log('LOGOUT')
    setLoggedIn(false)
  }

  return (
    <AuthContext.Provider value={{ loggedIn, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  )
}

const PrivateRoute = ({ children }) => {
  const auth = useAuth()
  const location = useLocation()

  return (
    auth.loggedIn ? children : <Navigate to="/login" state={{ from: location }} />
  )
}

function App () {
  const AuthButton = () => {
    const auth = useAuth()
    const location = useLocation()
    // console.log('APPlocation', location, 'FROM', location.state)

    return (
      auth.loggedIn
        ? <Button onClick={auth.logOut}>Log out</Button>
        : <Button as={Link} to="/login" state={{ from: location }}>Log in</Button>
    )
  }

  return (
    <AuthProvider>
      <Router>
        <Navbar bg="light" expand="lg" className='p-2'>
          <Navbar.Brand as={Link} to="/">Hexlet chat</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Chat</Nav.Link>
          </Nav>
          <AuthButton />
        </Navbar>

        <div className="container p-3">
          <h1 className="text-center mt-5 mb-4">Welcome to the HEXLET chat</h1>
          <Routes>
            <Route
              path="/"
              element={(
                <PrivateRoute>
                  <ChatPage />
                </PrivateRoute>
              )}
            />
            <Route path="/login" element={<LoginPage />} />
            <Route path="*" element={<ErrorPath />} />
          </Routes>
        </div>

      </Router>
    </AuthProvider>
  )
}

AuthProvider.propTypes = {
  children: PropTypes.element.isRequired
}

PrivateRoute.propTypes = {
  children: PropTypes.element.isRequired
}

export default App

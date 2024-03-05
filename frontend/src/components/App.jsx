/* eslint-disable no-unused-vars */
import { useState } from 'react'
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

import LoginPage from './LoginPage'
import ErrorPage from './ErrorPage.jsx'
import ChatPage from './ChatPage'
import HeaderComponent from './ui/HeaderComponent.jsx'

const AuthProvider = ({ children }) => {
  const initialLogged = localStorage.getItem('userId') !== null
  const [loggedIn, setLoggedIn] = useState(initialLogged)

  const logIn = () => setLoggedIn(true)
  const logOut = () => {
    localStorage.removeItem('userId')
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

    return (
      auth.loggedIn
        ? <Button onClick={auth.logOut}>Log out</Button>
        : <Button as={Link} to="/login" state={{ from: location }}>Log in</Button>
    )
  }

  return (
    <AuthProvider>
      <Router>
        <HeaderComponent link={Link} route={'/'} >
          <AuthButton />
        </HeaderComponent>

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
            <Route path="*" element={<ErrorPage />} />
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

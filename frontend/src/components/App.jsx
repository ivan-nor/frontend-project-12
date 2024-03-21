/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  useLocation,
  useNavigate
} from 'react-router-dom'
import { Button, Navbar, Nav } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react'

import { logoutUser, setCurrentUser } from '../slices/usersSlice.js'
import useAuth from '../hooks/index.jsx'
import AuthContext from '../contexts/index.jsx'

import LoginPage from './pages/LoginPage.jsx'
import SignupPage from './pages/SignupPage.jsx'
import ErrorPage from './pages/ErrorPage.jsx'
import ChatPage from './pages/ChatPage.jsx'
import HeaderComponent from './ui/HeaderComponent.jsx'

const AuthProvider = ({ children }) => {
  const dispatch = useDispatch()
  const initialLogged = localStorage.getItem('userId') !== null
  const user = JSON.parse(localStorage.getItem('userId'))
  const [loggedIn, setLoggedIn] = useState(initialLogged)

  useEffect(() => {
    dispatch(setCurrentUser(user))
  }, [])

  const logIn = () => setLoggedIn(true)
  const logOut = () => {
    localStorage.removeItem('userId')
    dispatch(logoutUser())
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

const rollbarConfig = {
  accessToken: 'f4c2880dcaa84c9fa001ff2345974d9b',
  environment: 'testenv'
}

function App () {
  const AuthButton = () => {
    const { t } = useTranslation()
    const auth = useAuth()
    const location = useLocation()

    return (
      auth.loggedIn
        ? <Button onClick={auth.logOut}>
            {t('authButton.logout')}
          </Button>
        : <Button as={Link} to="/login" state={{ from: location }}>
            {t('authButton.login')}
          </Button>
    )
  }

  return (
    <RollbarProvider config={rollbarConfig} >
      <ErrorBoundary>
        <AuthProvider>
          <Router>
            <HeaderComponent link={Link} route={'/'} >
              <AuthButton />
            </HeaderComponent>

            <ToastContainer autoClose={2000} theme='colored' position='bottom-right' />

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
              <Route path="/signup" element={<SignupPage />} />
              <Route path="*" element={<ErrorPage />} />
            </Routes>
          </Router>
        </AuthProvider>
      </ErrorBoundary>
    </RollbarProvider>
  )
}

AuthProvider.propTypes = {
  children: PropTypes.element.isRequired
}

PrivateRoute.propTypes = {
  children: PropTypes.element.isRequired
}

export default App

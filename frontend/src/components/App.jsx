/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  useLocation
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
  const [loggedIn, setLoggedIn] = useState(false)

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
  // useEffect(() => {
  //   axios.post('/api/v1/login', { username: 'admin', password: 'admin' }).then((response) => {
  //     console.log(response) // => { token: ..., username: 'admin' }
  //     const token = response.data.token

  //     axios.get('/api/v1/data', {
  //       headers: {
  //         Authorization: `Bearer ${token}`
  //       }
  //     }).then((response) => {
  //       console.log(response.data) // => { channels: [...], currentChannelId: 1, messages: [] }
  //     }).catch(console.log)
  //   })
  // })

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
        <Navbar bg="light" expand="lg" className='p-2'>
          <Navbar.Brand as={Link} to="/">Secret Place</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/public">Public page</Nav.Link>
            <Nav.Link as={Link} to="/private">Private page</Nav.Link>
          </Nav>
          <AuthButton />
        </Navbar>

        <div className="container p-3">
          <h1 className="text-center mt-5 mb-4">Welcome to the secret place###</h1>
          <Routes>
            <Route path="/" element={null} />
            <Route path="/public" element={<PublicPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/private"
              element={(
                <PrivateRoute>
                  <ChatPage />
                </PrivateRoute>
              )}
            />
          </Routes>
        </div>

      </Router>
    </AuthProvider>
  )

  // return (
  //   <BrowserRouter>
  //     <Routes>
  //       <Route path="/" element={<MainPage />} >
  //         <Route index element={<div>No page is selected.</div> } />
  //         <Route path="login" element={<Login />} />
  //         <Route path="chat" element={<Chat />} />
  //         <Route path="*" element={<ErrorPath />} />
  //       </Route>
  //     </Routes>
  //   </BrowserRouter>
  // )
}

AuthProvider.propTypes = {
  children: PropTypes.element.isRequired
}

PrivateRoute.propTypes = {
  children: PropTypes.element.isRequired
}

export default App

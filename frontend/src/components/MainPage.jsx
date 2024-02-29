/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react'
import { Link, Outlet, Navigate, useLocation } from 'react-router-dom'

const MainPage = () => {
  const location = useLocation()

  useEffect(() => {
    console.log('location', location, localStorage)
    
  }, [])

  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/chat">Chat Component</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      </nav>
      <hr />
      <Outlet />
    </>
  )
}

export default MainPage

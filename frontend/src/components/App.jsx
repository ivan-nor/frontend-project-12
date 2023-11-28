import { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import axios from 'axios'
import '../assets/App.css'
import Login from './Login'
import ErrorPath from './ErrorPath'
import MainPage from './MainPage'
import Chat from './Chat'

function App () {
  useEffect(() => {
    axios.post('/api/v1/login', { username: 'admin', password: 'admin' }).then((response) => {
      console.log(response) // => { token: ..., username: 'admin' }
      const token = response.data.token

      axios.get('/api/v1/data', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((response) => {
        console.log(response.data) // => { channels: [...], currentChannelId: 1, messages: [] }
      }).catch(console.log)
    })
  })

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} >
          <Route index element={<div>No page is selected.</div> } />
          <Route path="login" element={<Login />} />
          <Route path="chat" element={<Chat />} />
          <Route path="*" element={<ErrorPath />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App

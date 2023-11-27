import { BrowserRouter, Routes, Route } from 'react-router-dom'
import '../assets/App.css'
import Login from './Login'
import ErrorPath from './ErrorPath'
import MainPage from './MainPage'
import Chat from './Chat'

function App () {
  console.log('App front')
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

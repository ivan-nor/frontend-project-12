import { useState, useEffect } from 'react'
// import { Link, Outlet, Navigate, useLocation, useNavigate } from 'react-router-dom'
// import useAuth from '../hooks'
import routes from '../../routes'
import axios from 'axios'

export default function ChatPage () {
  const [channels, setChannels] = useState([])
  // const location = useLocation()
  // const navigate = useNavigate()
  // const auth = useAuth()

  useEffect(() => { // загрузка каналов при старте
    // console.log('CHAT location', localStorage, location, location.state)
    const { token } = JSON.parse(localStorage.getItem('userId'))
    console.log(token)

    const fetchChannels = async () => {
      const res = await axios.get(routes.channelsPath(), {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      // console.log('CHAT', routes.channelsPath(), res.data)
      setChannels(res.data)
    }

    fetchChannels()
  }, [])

  const renderChannels = () => (<ul>
    {channels.map(({ id, name, removable }) => <li key={id}>{name}</li>)}
  </ul>)

  return channels.length > 0
    ? renderChannels()
    : null
}

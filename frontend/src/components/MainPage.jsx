import { Link, Outlet } from 'react-router-dom'

const MainPage = () => (
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

export default MainPage

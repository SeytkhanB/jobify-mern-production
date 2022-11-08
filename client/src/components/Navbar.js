
import {useState} from 'react';
import { FaAlignLeft, FaUserCircle, FaCaretDown } from 'react-icons/fa';
import { useAppContext } from '../context/appContext';
import Logo from './Logo';
import Wrapper from '../assets/wrappers/Navbar';

export default function Navbar() {
  const [showLogout, setShowLogout] = useState(false)
  const { user, logoutUser, toggleSidebar } = useAppContext()

  return (
    <Wrapper>
      <div className='nav-center'>
        <button
          className='toggle-btn'
          onClick={toggleSidebar}
        >
          <FaAlignLeft />
        </button>

        <div>
          <Logo />
          <h3 className='logo-text'>dashboard</h3>
        </div>

        <div className='btn-container'>
          <button 
            className='btn'
            onClick={() => setShowLogout(!showLogout)}
          >
            <FaUserCircle />
              {user?.name}
            <FaCaretDown />
          </button>

          <div 
            className={
              showLogout ? 'dropdown show-dropdown' : 'dropdown'
            }
          >
            <button
              onClick={logoutUser}
              className='dropdown-btn'
            >
              logout
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  )
}
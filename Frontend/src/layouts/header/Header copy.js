import React from 'react'
// import Logo from "../../logos/Cloud-manager.svg";
import { BiLogOut } from 'react-icons/bi';
import { BsCollectionFill } from 'react-icons/bs';
import { AiFillHome, AiFillInfoCircle } from 'react-icons/ai';
import { IoIosCreate } from 'react-icons/io';
import { FaSearch } from 'react-icons/fa';
import './Header.css';
import { Link } from 'react-router-dom';

const Header = () => {

  const logout = () => {
    window.localStorage.clear();
  }

  return (
    <div className='body'>
      <nav className='navhead'>
        <div className='titlelogo'>
          {/* <Link to='/landingpage' style={{ textDecoration: "none" }}>
          <img
            src={''}
            width="80"
            height="80"
            className="ml"
          />
          </Link> */}
        </div>
        <div>
          <Link to='/home' style={{ textDecoration: "none" }}>
            <div className='icon'>
              <AiFillHome className='lbltext' /><span className='lbltext'>Home</span>
            </div></Link>

          <Link to='/collections' style={{ textDecoration: "none" }}>
            <div className='icon'>
              <BsCollectionFill className='lbltext' /><span className='lbltext'>Collections</span>
            </div></Link>
            
          <Link to='/create' style={{ textDecoration: "none" }}>
            <div className='icon'>
              <IoIosCreate className='lbltext' /><span className='lbltext'>Create</span>
            </div></Link>

          <Link to='/about' style={{ textDecoration: "none" }} >
            <div className='icon'>
              <AiFillInfoCircle className='lbltext' /><span className='lbltext'>About Us</span>
            </div>
          </Link>

          <Link to='/login' onClick={logout} style={{ textDecoration: "none" }} >
            <div className='icon position-absolute bottom-50 mb-5'>
              <BiLogOut className='lbltext' /><span className='lbltext'>Logout</span>
            </div>
          </Link>

        </div>
      </nav>
    </div>
  )
}

export default Header;
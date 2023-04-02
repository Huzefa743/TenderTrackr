import React from 'react'
import { BiBell } from 'react-icons/bi';
import { MdOutlineAccountCircle } from 'react-icons/md';
import { Dropdown, DropdownButton } from "react-bootstrap";
// import Help from '../../components/help/Help';
import { GrUpdate } from 'react-icons/gr';
import { IoSettingsSharp } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { CgNotes } from 'react-icons/cg';
import { IoMdLogOut, IoMdHelpCircleOutline } from 'react-icons/io';
import { BsPersonCircle, BsClockHistory, BsGearWideConnected } from 'react-icons/bs';
import './Miniheader.css';

const Miniheader = () => {
  return (
    <div className="mini-body">
      <nav>
        <div className="row">
          <div className="btn-group btn-group-toggle d-flex justify-content-end mt-2">
            <BiBell className='bell mt-2' color="black" fontSize="1.3em" />
            <Dropdown className='drop' align="right-end" style={{ backgroundColor: "white" }} >
              <Dropdown.Toggle variant="light"
                style={{ color: "white", backgroundColor: "white", border: "0", boxShadow: "none" }}>
                <BsPersonCircle className='person' color="black" fontSize="1.3em" />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item as={Link} to="/resetpwd">
                      <GrUpdate /> Change Password
                </Dropdown.Item>
                <Dropdown.Item>
                  <Link to="/release-notes" style={{ textDecoration: "none" }}>
                    <div className='text-dark'>
                      <CgNotes /> {''} Release Notes
                    </div>
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item>
                    {/* <Help /> */}
                    </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item>Version v2.0</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <div className='mt-2 me-4'>
              <strong>
                Hello, {' '}
                {localStorage.getItem("username").charAt(0).toUpperCase() + localStorage.getItem("username").slice(1)}
              </strong>
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Miniheader;
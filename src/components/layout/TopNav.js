import React, { useState } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem } from 'reactstrap';

const TopNav = (props) => {
  const [collapsed, setCollapsed] = useState(true);

  const toggleNavbar = () => setCollapsed(!collapsed);
  
  return (
    <div>
      <Navbar className="navbar navbar-color" dark fixed="top">
        <NavbarBrand><NavLink className="nav-brand navbar-text" to='/'>TRAKR
        </NavLink></NavbarBrand>
        <NavbarToggler onClick={toggleNavbar} className="mr-2" />
        <Collapse isOpen={!collapsed} navbar>
          <Nav className="pl-3" navbar >
            <NavItem>
              <NavLink className="navbar-links" onClick={toggleNavbar} to='/'>Log Event</NavLink>
            </NavItem>
            <NavItem>
              <NavLink className="navbar-links" onClick={toggleNavbar} to='/analytics'>Analytics</NavLink>
            </NavItem>
            <NavItem>
              <NavLink className="navbar-links" onClick={toggleNavbar} to='/teams'>Manage Teams</NavLink>
            </NavItem>

            {/* FUTURE STATE -> NEED TO BE ABLE TO EDIT EVENTS
                WILL NEED TO ADD CREATED_AT TO EVENT MODEL ON BACKEND
            */}
            
            {/* <NavItem>
              <NavLink className="navbar-links" onClick={toggleNavbar} to='/events'>Manage Events</NavLink>
            </NavItem> */}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}


export default connect()(TopNav);
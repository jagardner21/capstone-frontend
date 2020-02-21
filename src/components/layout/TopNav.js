import React, { useState } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem } from 'reactstrap';

const TopNav = (props) => {
  const [collapsed, setCollapsed] = useState(true);

  const toggleNavbar = () => setCollapsed(!collapsed);
  
  return (
    <div>
      <Navbar light>
        <NavbarBrand><NavLink className="nav-brand" to='/'>TRAKR
        </NavLink></NavbarBrand>
        <NavbarToggler onClick={toggleNavbar} className="mr-2" />
        <Collapse isOpen={!collapsed} navbar>
          <Nav navbar>
            <NavItem>
              <NavLink onClick={toggleNavbar} to='/'>Log Event</NavLink>
            </NavItem>
            <NavItem>
              <NavLink onClick={toggleNavbar} to='/analytics'>Analytics</NavLink>
            </NavItem>
            <NavItem>
              <NavLink onClick={toggleNavbar} to='/teams'>Manage Teams</NavLink>
            </NavItem>
            <NavItem>
              <NavLink onClick={toggleNavbar} to='/users'>Manage Users</NavLink>
            </NavItem>
            <NavItem>
              <NavLink onClick={toggleNavbar} to='/events'>Manage Events</NavLink>
            </NavItem>
            {/* Friends list? -> or a list of users until figuring out how to only show friends and add functionality for searching users to add/remove friends */}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}


export default connect()(TopNav);
import React, { Component } from 'react';
import { Input, Menu, Container } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

class Navbar extends Component {
  state = { activeItem: 'home' };

  logout = e => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  render() {
    return (
      <Container>
        <div>
          <h1>iReporter</h1>
          <Menu secondary>
            <NavLink to="/">
              <Menu.Item name="home" />
            </NavLink>
            <NavLink to="/getredflags">
              <Menu.Item name="Redflags" />
            </NavLink>
            <NavLink to="/addredflag">
              <Menu.Item name="New Redflag" />
            </NavLink>
            <Menu.Menu position="right">
              <Menu.Item>
                <Input icon="search" placeholder="Search..." />
              </Menu.Item>
              <Menu.Item name="logout" onClick={this.logout} />
            </Menu.Menu>
          </Menu>
        </div>
      </Container>
    );
  }
}

export default Navbar;

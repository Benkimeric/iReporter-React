import React, { Component } from "react";
import { Input, Menu, Container } from "semantic-ui-react";

class Navbar extends Component {
  state = { activeItem: "home" };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  logout = e => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  render() {
    const { activeItem } = this.state;

    return (
      <Container>
        <div>
          <h1>iReporter</h1>
          <Menu secondary>
            <Menu.Item
              href="/"
              name="home"
              active={activeItem === "home"}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name="Redflags"
              active={activeItem === "Redflags"}
              onClick={this.handleItemClick}
              href="/getredflags"
            />
            <Menu.Item
              name="New Redflag"
              active={activeItem === "New Redflag"}
              onClick={this.handleItemClick}
              href="/addredflag"
            />
            <Menu.Menu position="right">
              <Menu.Item>
                <Input icon="search" placeholder="Search..." />
              </Menu.Item>
              <Menu.Item
                name="logout"
                active={activeItem === "logout"}
                onClick={this.logout}
              />
            </Menu.Menu>
          </Menu>
        </div>
      </Container>
    );
  }
}

export default Navbar;

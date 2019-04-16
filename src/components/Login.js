import React, { Component } from "react";
import { Button, Form, Container } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "../css/login.css";

class Login extends Component {
  state = {
    user_name: "",
    password: ""
  };

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    document.getElementById("submit_btn").innerHTML = "Loading...";

    let { user_name, password } = this.state;

    fetch("https://ireporter-drf-api-staging.herokuapp.com/api/auth/login/", {
      method: "POST",
      body: JSON.stringify({
        username: user_name,
        password: password
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then(response => response.json())
      .then(data => {
        localStorage.setItem("token", data.token);
        document.getElementById("submit_btn").innerHTML = "Login";
        data.token
          ? this.props.history.push("/getredflags")
          : toast.error(data.message, {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 3000,
              hideProgressBar: true,
              pauseOnHover: true
            });
      });
  };
  render() {
    return (
      <Container text>
        <br />
        <br />
        <br />

        <div className="loginForm">
          <Form onSubmit={this.handleSubmit}>
            <h1>Login</h1>

            <Form.Field>
              <label>Username</label>
              <input
                id="user_name"
                placeholder="username"
                onChange={this.handleChange}
                required
              />
            </Form.Field>
            <Form.Field>
              <label>Password</label>
              <input
                name="password"
                type="password"
                id="password"
                placeholder="password"
                onChange={this.handleChange}
                required
              />
            </Form.Field>
            <Button type="submit" id="submit_btn">
              Login
            </Button>
            <br />
            <br />
            <span>New user? </span>
            <Link to="/signup">Signup</Link>
            <br />
            <br />
          </Form>
        </div>
      </Container>
    );
  }
}

export default Login;

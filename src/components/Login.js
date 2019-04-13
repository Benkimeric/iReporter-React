import React, { Component } from "react";
import { Button, Form, Checkbox } from "semantic-ui-react";
import { Link } from "react-router-dom";
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
        // console.log(data)
        document.getElementById("submit_btn").innerHTML = "Submit";
        // console.log(this.props)
        data.token
          ? this.props.history.push("/getredflags")
          : (document.getElementById("login_error_label").innerHTML =
              data.message);
      });
  };
  render() {
    return (
      <div className="">
        <div id="topdecor">
          <div className="topnav">
            <h3>iReporter</h3>
          </div>
        </div>

        <Form onSubmit={this.handleSubmit}>
          <label id="login_error_label"> </label>

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
    );
  }
}

export default Login;

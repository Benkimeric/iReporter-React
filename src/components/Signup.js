import React, { Component } from "react";
import { Button, Form, Checkbox, Label } from "semantic-ui-react";
import { Link } from "react-router-dom";

import "../css/signup.css";

class Signup extends Component {
  state = {
    first_name: "",
    other_name: "",
    last_name: "",
    email: "",
    username: "",
    mobile_number: "",
    password: ""
  };

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    document.getElementById("signup_btn").innerHTML = "Loading...";

    var email_error = document.getElementById("email_error");
    email_error.style.display = "none";

    var username_error = document.getElementById("username_error");
    username_error.style.display = "none";

    var phone_error = document.getElementById("phone_error");
    phone_error.style.display = "none";

    var password_error = document.getElementById("password_error");
    password_error.style.display = "none";

    let {
      first_name,
      other_name,
      last_name,
      email,
      username,
      mobile_number,
      password
    } = this.state;

    fetch("https://ireporter-drf-api-staging.herokuapp.com/api/auth/signup/", {
      // fetch('http://127.0.0.1:8000/api/auth/signup/', {
      method: "POST",
      body: JSON.stringify({
        first_name: first_name,
        other_name: other_name,
        last_name: last_name,
        email: email,
        username: username,
        mobile_number: mobile_number,
        password: password
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then(response => response.json())
      .then(data => {
        document.getElementById("signup_btn").innerHTML = "Sign Up";
        if (data.token) {
          fetch(
            "https://ireporter-drf-api-staging.herokuapp.com/api/auth/activate/",
            {
              // fetch('http://127.0.0.1:8000/api/auth/signup/', {
              method: "POST",
              body: JSON.stringify({
                uid: data.id,
                token: data.token
              }),
              headers: {
                "Content-type": "application/json; charset=UTF-8"
              }
            }
          )
            .then(response => response.json())
            .then(data => {
              // console.log(data);
              this.props.history.push("/");
            });
        } else {
          if (data.email) {
            // console.log(data.email[0])
            // console.log("done")
            try {
              var error = document.getElementById("email_error");
              error.innerHTML = data.email[0];
              error.style.display = "block";
            } catch (e) {
              console.log(e);
            }
          } else if (data.username) {
            try {
              var error = document.getElementById("username_error");
              error.innerHTML = data.username[0];
              error.style.display = "block";
            } catch (e) {
              console.log(e);
            }
          } else if (data.mobile_number) {
            try {
              var error = document.getElementById("phone_error");
              error.innerHTML = data.mobile_number[0];
              error.style.display = "block";
            } catch (e) {
              console.log(e);
            }
          } else if (data.password) {
            try {
              var error = document.getElementById("password_error");
              error.innerHTML = data.password[0];
              error.style.display = "block";
            } catch (e) {
              console.log(e);
            }
          }
        }
      });
  };

  render() {
    return (
      <div className="">
        <div id="topdecor0">
          <div className="topnav">
            <h3>iReporter</h3>
          </div>
        </div>
        <div id="signup_box" className="center z-depth-1">
          <h2 id="login">Sign Up</h2>
          <Form className="signupform" onSubmit={this.handleSubmit}>
            <Form.Group widths={2}>
              <Form.Input
                id="first_name"
                label="First name"
                placeholder="first name"
                onChange={this.handleChange}
                required
              />
              <Form.Input
                id="last_name"
                label="Last name"
                placeholder="last name"
                onChange={this.handleChange}
                required
              />
            </Form.Group>
            <Form.Group widths={2}>
              <Form.Input
                id="other_name"
                label="Other names"
                placeholder="other names"
                onChange={this.handleChange}
                required
              />
              <Form.Field>
                <Form.Input
                  id="username"
                  label="Username"
                  placeholder="username"
                  onChange={this.handleChange}
                  required
                />
                <Label
                  className="signup_error"
                  id="username_error"
                  basic
                  color="red"
                  pointing
                />
              </Form.Field>
            </Form.Group>
            <Form.Group widths={2}>
              <Form.Field>
                <Form.Input
                  id="email"
                  label="Email"
                  placeholder="email"
                  onChange={this.handleChange}
                  required
                />
                <Label
                  className="signup_error"
                  id="email_error"
                  basic
                  color="red"
                  pointing
                />
              </Form.Field>
              <Form.Field>
                <Form.Input
                  id="mobile_number"
                  label="Phone"
                  placeholder="phone"
                  onChange={this.handleChange}
                  required
                />
                <Label
                  className="signup_error"
                  id="phone_error"
                  basic
                  color="red"
                  pointing
                />
              </Form.Field>
            </Form.Group>
            <Form.Group widths={2}>
              <Form.Field>
                <Form.Input
                  id="password"
                  label="Password"
                  placeholder="password"
                  type="password"
                  onChange={this.handleChange}
                  required
                />
                <Label
                  className="signup_error"
                  id="password_error"
                  basic
                  color="red"
                  pointing
                />
              </Form.Field>
            </Form.Group>
            <Button id="signup_btn" type="submit">
              Sign Up
            </Button>
          </Form>
        </div>
      </div>
    );
  }
}

export default Signup;

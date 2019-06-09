import React, { Component } from 'react';
import { toast } from 'react-toastify';
import '../css/login.css';
import '../css/signup.css';
import SignupForm from './containers/SignupForm';

class Signup extends Component {
  state = {
    first_name: '',
    other_name: '',
    last_name: '',
    email: '',
    username: '',
    mobile_number: '',
    password: ''
  };

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    document.getElementById('signup_btn').innerHTML = 'Loading...';

    var email_error = document.getElementById('email_error');
    email_error.style.display = 'none';

    var username_error = document.getElementById('username_error');
    username_error.style.display = 'none';

    var phone_error = document.getElementById('phone_error');
    phone_error.style.display = 'none';

    var password_error = document.getElementById('password_error');
    password_error.style.display = 'none';

    var first_name_error = document.getElementById('first_name_error');
    first_name_error.style.display = 'none';

    var other_name_error = document.getElementById('other_name_error');
    other_name_error.style.display = 'none';

    var last_name_error = document.getElementById('last_name_error');
    last_name_error.style.display = 'none';

    let {
      first_name,
      other_name,
      last_name,
      email,
      username,
      mobile_number,
      password
    } = this.state;

    fetch('https://ireporter-drf-api-staging.herokuapp.com/api/auth/signup/', {
      // fetch('http://127.0.0.1:8000/api/auth/signup/', {
      method: 'POST',
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
        'Content-type': 'application/json; charset=UTF-8'
      }
    })
      .then(response => response.json())
      .then(data => {
        document.getElementById('signup_btn').innerHTML = 'Sign Up';
        if (data.token) {
          //when account is created
          fetch(
            'https://ireporter-drf-api-staging.herokuapp.com/api/auth/activate/',
            {
              // fetch('http://127.0.0.1:8000/api/auth/signup/', {
              method: 'POST',
              body: JSON.stringify({
                uid: data.id,
                token: data.token
              }),
              headers: {
                'Content-type': 'application/json; charset=UTF-8'
              }
            }
          )
            .then(response => response.json())
            .then(data => {
              toast.success('Account created successfully, please login', {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 3000,
                hideProgressBar: true,
                pauseOnHover: true
              });
              this.props.history.push('/');
            });
        } else {
          //when error occurs
          if (data.first_name) {
            try {
              var error = document.getElementById('first_name_error');
              error.innerHTML = data.first_name[0];
              error.style.display = 'block';
            } catch (e) {
              console.log(e);
            }
          } else if (data.other_name) {
            try {
              var error = document.getElementById('other_name_error');
              error.innerHTML = data.other_name[0];
              error.style.display = 'block';
            } catch (e) {
              console.log(e);
            }
          } else if (data.last_name) {
            try {
              var error = document.getElementById('last_name_error');
              error.innerHTML = data.last_name[0];
              error.style.display = 'block';
            } catch (e) {
              console.log(e);
            }
          } else if (data.email) {
            try {
              var error = document.getElementById('email_error');
              error.innerHTML = data.email[0];
              error.style.display = 'block';
            } catch (e) {
              console.log(e);
            }
          } else if (data.username) {
            try {
              var error = document.getElementById('username_error');
              error.innerHTML = data.username[0];
              error.style.display = 'block';
            } catch (e) {
              console.log(e);
            }
          } else if (data.mobile_number) {
            try {
              var error = document.getElementById('phone_error');
              error.innerHTML = data.mobile_number[0];
              error.style.display = 'block';
            } catch (e) {
              console.log(e);
            }
          } else if (data.password) {
            try {
              var error = document.getElementById('password_error');
              error.innerHTML = data.password[0];
              error.style.display = 'block';
            } catch (e) {
              console.log(e);
            }
          }
        }
      });
  };

  render() {
    return (
      <SignupForm
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
      />
    );
  }
}

export default Signup;

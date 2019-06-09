import React, { Component } from 'react';
import { toast } from 'react-toastify';
import '../css/login.css';
import LoginForm from './containers/LoginForm';

class Login extends Component {
  state = {
    user_name: '',
    password: ''
  };

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    document.getElementById('submit_btn').innerHTML = 'Loading...';

    let { user_name, password } = this.state;

    fetch('https://ireporter-drf-api-staging.herokuapp.com/api/auth/login/', {
      method: 'POST',
      body: JSON.stringify({
        username: user_name,
        password: password
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    })
      .then(response => response.json())
      .then(data => {
        localStorage.setItem('token', data.token);
        document.getElementById('submit_btn').innerHTML = 'Login';
        data.token
          ? this.props.history.push('/getredflags')
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
      <LoginForm
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
      />
    );
  }
}

export default Login;

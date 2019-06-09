import React, { Component } from 'react';
import { toast } from 'react-toastify';
import '../css/login.css';
import AddRedFlagForm from './containers/AddRedFlagForm';

class AddRedflag extends Component {
  state = {
    title: '',
    comment: '',
    location: ''
  };

  displayMessage = message => {
    toast.error(message, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000,
      hideProgressBar: true,
      pauseOnHover: true
    });
  };

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    document.getElementById('submit_btn').innerHTML = 'Loading...';

    var title_error = document.getElementById('title_error');
    title_error.style.display = 'none';

    var comment_error = document.getElementById('comment_error');
    comment_error.style.display = 'none';

    var location_error = document.getElementById('location_error');
    location_error.style.display = 'none';

    let { title, comment, location } = this.state;

    fetch('https://ireporter-drf-api-staging.herokuapp.com/api/redflags/', {
      method: 'POST',
      body: JSON.stringify({
        title: title,
        comment: comment,
        location: location
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    })
      .then(response => response.json())
      .then(data => {
        document.getElementById('submit_btn').innerHTML = 'Submit';
        if (data.detail) {
          this.displayMessage('Please login again');
          this.props.history.push('/');
        } else if (data.status == 201) {
          toast.success('Redfalg record created successfully', {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000,
            hideProgressBar: true,
            pauseOnHover: true
          });
          document.getElementById('add_flag_form').reset();
        }
        if (data.title) {
          try {
            var error = document.getElementById('title_error');
            error.innerHTML = data.title[0];
            error.style.display = 'block';
          } catch (e) {
            console.log(e);
          }
        } else if (data.comment) {
          try {
            var error = document.getElementById('comment_error');
            error.innerHTML = data.comment[0];
            error.style.display = 'block';
          } catch (e) {
            console.log(e);
          }
        } else if (data.location) {
          try {
            var error = document.getElementById('location_error');
            error.innerHTML = data.location[0];
            error.style.display = 'block';
          } catch (e) {
            console.log(e);
          }
        } else if (data.status == 409) {
          try {
            this.displayMessage(data.message);
          } catch (e) {
            console.log(e);
          }
        } else {
          console.log(data);
        }
      });
  };
  render() {
    return (
      <AddRedFlagForm
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
      />
    );
  }
}

export default AddRedflag;

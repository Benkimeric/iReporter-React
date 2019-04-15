import React, { Component } from "react";
import { Button, Form, Label } from "semantic-ui-react";
import { Link } from "react-router-dom";
import "../css/login.css";

class AddRedflag extends Component {
  state = {
    title: "",
    comment: "",
    location: ""
  };

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    document.getElementById("submit_btn").innerHTML = "Loading...";

    var title_error = document.getElementById("title_error");
    title_error.style.display = "none";

    var comment_error = document.getElementById("comment_error");
    comment_error.style.display = "none";

    var location_error = document.getElementById("location_error");
    location_error.style.display = "none";

    var post_error = document.getElementById("post_error");
    post_error.style.display = "none";

    let { title, comment, location } = this.state;

    fetch("https://ireporter-drf-api-staging.herokuapp.com/api/redflags/", {
      method: "POST",
      body: JSON.stringify({
        title: title,
        comment: comment,
        location: location
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    })
      .then(response => response.json())
      .then(data => {
        document.getElementById("submit_btn").innerHTML = "Submit";
        if (data.detail) {
          console.log(data);
          this.props.history.push("/");
        } else if (data.status == 201) {
            alert("Redfalg record created successfully")
            document.getElementById('add_flag_form').reset()
          console.log(data);
        }
        if (data.title) {
          try {
            var error = document.getElementById("title_error");
            error.innerHTML = data.title[0];
            error.style.display = "block";
          } catch (e) {
            console.log(e);
          }
        } else if (data.comment) {
          try {
            var error = document.getElementById("comment_error");
            error.innerHTML = data.comment[0];
            error.style.display = "block";
          } catch (e) {
            console.log(e);
          }
        } else if (data.location) {
          try {
            var error = document.getElementById("location_error");
            error.innerHTML = data.location[0];
            error.style.display = "block";
          } catch (e) {
            console.log(e);
          }
        }else if (data.status == 409) {
          try {
            var error = document.getElementById("post_error");
            error.innerHTML = data.message;
            error.style.display = "block";
          } catch (e) {
            console.log(e);
          }
        }else{
          console.log(data)
        }
      });
  };
  render() {
    return (
      <div className="">
        <Form id="add_flag_form" onSubmit={this.handleSubmit}>
          {/* <label id="login_error_label"> </label> */}
          <Label basic color="red" id="post_error" />

          <Form.Field>
            <label>Title</label>
            <input
              id="title"
              placeholder="Redflag Title"
              onChange={this.handleChange}
              required
            />
            <Label id="title_error" basic color="red" pointing />
          </Form.Field>
          <Form.Field>
            <label>Comment</label>
            <input
              id="comment"
              placeholder="Redflag Comment"
              onChange={this.handleChange}
              required
            />
            <Label id="comment_error" basic color="red" pointing />
          </Form.Field>
          <Form.Field>
            <label>Location</label>
            <input
              id="location"
              placeholder="Redflag Location"
              onChange={this.handleChange}
              required
            />
            <Label id="location_error" basic color="red" pointing />
          </Form.Field>
          <Button type="submit" id="submit_btn">
            Post
          </Button>
        </Form>
      </div>
    );
  }
}

export default AddRedflag;

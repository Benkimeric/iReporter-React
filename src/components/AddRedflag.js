import React, { Component } from "react";
import { Button, Form, Label, TextArea } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "../css/login.css";

class AddRedflag extends Component {
  state = {
    title: "",
    comment: "",
    location: ""
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
    document.getElementById("submit_btn").innerHTML = "Loading...";

    var title_error = document.getElementById("title_error");
    title_error.style.display = "none";

    var comment_error = document.getElementById("comment_error");
    comment_error.style.display = "none";

    var location_error = document.getElementById("location_error");
    location_error.style.display = "none";

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
          // console.log(data);
          this.displayMessage("Please login again");
          this.props.history.push("/");
        } else if (data.status == 201) {
          toast.success("Redfalg record created successfully", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000,
            hideProgressBar: true,
            pauseOnHover: true
          });
          document.getElementById("add_flag_form").reset();
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
      <div className="">
        <Form id="add_flag_form" onSubmit={this.handleSubmit}>
          <Form.Group widths="equal">
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
              <label>Location</label>
              <input
                id="location"
                placeholder="Redflag Location"
                onChange={this.handleChange}
                required
              />
              <Label id="location_error" basic color="red" pointing />
            </Form.Field>
          </Form.Group>
          <Form.Field>
            <label>Comment</label>
            <TextArea
              id="comment"
              style={{ minHeight: 100 }}
              onChange={this.handleChange}
              placeholder="Redflag Comment"
            />
            <Label id="comment_error" basic color="red" pointing />
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

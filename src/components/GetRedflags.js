import React, { Component } from "react";
import Redflags from "./Redflags";
import { toast } from "react-toastify";
import { Container, Loader } from "semantic-ui-react";
class GetRedflags extends Component {
  state = {
    redflags: [],
    loaded: false,
    // id: "",
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

  componentDidMount() {
    fetch("https://ireporter-drf-api-staging.herokuapp.com/api/redflags/", {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.detail) {
          this.displayMessage("Please Login again");
          this.props.history.push("/");
        } else {
          this.setState({
            redflags: data,
            loaded: true
          });
        }
      });
  }

  handleEditChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  getId = e => {
    this.setState({
      id: e.target.id
    });
  };

  editRedflag = () => {
    document.getElementById("submit_btn").innerHTML = "Loading...";

    var title_error = document.getElementById("title_error");
    title_error.style.display = "none";

    var comment_error = document.getElementById("comment_error");
    comment_error.style.display = "none";

    var location_error = document.getElementById("location_error");
    location_error.style.display = "none";

    let { id, title, comment, location } = this.state;
    console.log(id);

    fetch(
      "https://ireporter-drf-api-staging.herokuapp.com/api/redflags/" +
        id +
        "/",
      {
        method: "PUT",
        body: JSON.stringify({
          title: title,
          comment: comment,
          location: location
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      }
    )
      .then(res => res.json())
      .then(data => {
        document.getElementById("submit_btn").innerHTML = "Submit";
        if (data.detail) {
          toast.error("Please Login again", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000,
            hideProgressBar: true,
            pauseOnHover: true
          });
          this.props.history.push("/");
        } else if (data.id == id) {
          toast.success("Redfalg record updated successfully", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000,
            hideProgressBar: true,
            pauseOnHover: true
          });
          document.getElementById("edit_flag_form").reset();
        } else if (data.title) {
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
        } else if (data.status == 403) {
          this.displayMessage(data.message);
        }
      });
  };

  openNextPage = newPage => {
    fetch(newPage, {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.detail) {
          toast.error("Please Login again", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000,
            hideProgressBar: true,
            pauseOnHover: true
          });
          this.props.history.push("/");
        } else {
          this.setState({
            redflags: data,
            loaded: true
          });
        }
      });
  };

  render() {
    let loaded = this.state.loaded;
    if (!loaded) {
      return (
        <div>
        <br/><br/><br/><br/><br/><br/><br/><br/>
          <Loader size="massive" active inline="centered" > Loading...</Loader>          
        </div>
      );
    } else {
      return (
        <Container>
          <br />
          <br />
          <br />
          <div className="center">
            <Redflags
              redflags={this.state.redflags}
              next={this.openNextPage}
              editRedflag={this.editRedflag}
              handleEditChange={this.handleEditChange}
              getId={this.getId}
            />
          </div>
        </Container>
      );
    }
  }
}

export default GetRedflags;

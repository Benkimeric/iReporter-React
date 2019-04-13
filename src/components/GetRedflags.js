import React, { Component } from "react";
import Redflags from "./Redflags";

class GetRedflags extends Component {
  state = {
    redflags: []
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
        // console.log(localStorage.getItem('token'))
        this.setState({
          redflags: data
        });
      });
  }

  render() {
    return (
      <div className="center">
        <Redflags redflags={this.state.redflags} />
      </div>
    );
  }
}

export default GetRedflags;

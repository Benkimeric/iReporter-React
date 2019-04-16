import React, { Component } from "react";
import Redflags from "./Redflags";
import { toast } from 'react-toastify';


class GetRedflags extends Component {
  state = {
    redflags: [],
    loaded: false
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
        if (data.detail){            
            toast.error( "Please Login again", {
              position: toast.POSITION.TOP_CENTER,
              autoClose:3000,
              hideProgressBar:true,
              pauseOnHover:true
            })
            this.props.history.push("/")
        }else{
            this.setState({
                redflags: data,
                loaded: true
              });
        }        
      });
  }

  openNextPage = (newPage) =>{
    fetch(newPage, {
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      })
        .then(res => res.json())
        .then(data => {
          if (data.detail){              
              toast.error( "Please Login again", {
                position: toast.POSITION.TOP_CENTER,
                autoClose:3000,
                hideProgressBar:true,
                pauseOnHover:true
              })
              this.props.history.push("/")
          }else{
              this.setState({
                  redflags: data,
                  loaded: true
                });            
          }        
        });
  }

  render() {
    let loaded = this.state.loaded;
    if (!loaded) {
      return <div className="center">Loading...</div>;
    } else {
      return (
        <div className="center">
          <Redflags redflags={ this.state.redflags } next={ this.openNextPage } />
        </div>
      );
    }
  }
}

export default GetRedflags;

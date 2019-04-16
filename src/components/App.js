import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import GetRedflags from "./GetRedflags";
import Navbar from "./Navbar";
import AddRedflag from "./AddRedflag";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class App extends Component {
  render() {
    return (
      <div>
      <ToastContainer />
        <BrowserRouter>
          <Navbar />
          <Route exact path="/" component={Login} />
          <Route path="/GetRedflags" component={GetRedflags} />
          <Route path="/signup" component={Signup} />
          <Route path="/addredflag" component={AddRedflag} />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;

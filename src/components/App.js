import React, { Component } from 'react'
import { BrowserRouter, Switch,  Route } from 'react-router-dom'
import Login from './Login'
import Signup from './Signup' 
import GetRedflags from './GetRedflags' 


class App extends Component{

    render(){
        return(
            <div>
            <BrowserRouter>
                
                    {/* <Login /> */}
                    <Route exact path='/' component = { Login } />
                    {/* <Route path='/Redflags' component = { Redflags } /> */}
                    <Route path='/GetRedflags' component = { GetRedflags } />
                    <Route path='/signup' component = { Signup } />                    
                
            </BrowserRouter>
            </div>
        )
    }
}

export default App;
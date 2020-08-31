import React, { Component } from 'react'
import { Button } from 'antd';
import jwt_decode from "jwt-decode"

class ClientInterface extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            
         }
    }
    
    SignOut=()=>{
        localStorage.removeItem("token")
       window.location.replace("/")
    }

    render() { 
        console.log(localStorage.getItem("tokne"))
        return ( <div className="container">
            <img className="logo" src="https://cdn1.iconfinder.com/data/icons/super-ice-cream/512/4-512.png" alt=""/>
            <h1 >{(localStorage.getItem("token"))?"Welcome "+jwt_decode(localStorage.getItem("token")).name:"Try to connect"}</h1>
            <Button className="btn" type="default" onClick={this.SignOut}>{localStorage.getItem("token")?"Sign OUT":"Sign In"}</Button>
        </div> );
    }
}
 
export default ClientInterface;
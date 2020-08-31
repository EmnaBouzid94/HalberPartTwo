import React, { Component } from 'react'
import ClientInterface from './ClientInterface';
import SignIn from './Signin';

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
        <div>{localStorage.getItem("token")?<ClientInterface/>:<SignIn/>}</div>
         );
    }
}
 
export default HomePage;
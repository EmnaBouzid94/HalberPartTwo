import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Link } from 'react-router-dom';
import {Input, Divider,Button} from 'antd';
import {MailOutlined, LockOutlined} from '@ant-design/icons';
import Axios from 'axios';


class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            email:"",
            password:"",
            token:"",
            userId:""
         }
    }
    HandleEmail=(e)=>{
        this.setState({email:e.target.value})
    }
    HandlePassword=(e)=>{
        this.setState({password:e.target.value})
    }
    Signin=()=>{
        Axios.post('http://localhost:3010/signin',{email:this.state.email,password:this.state.password}).then(res=> {this.setState({token:res.data.token,userId:res.data.userId}) 
        window.location.replace("/Profile")})
               
           .catch(err=>alert("Incorrect Email or Password"))
           
           
    }
    componentDidUpdate(){
        localStorage.setItem("token",this.state.token)
        
    }
    render() { 
        console.log(this.state)
        return ( <div className="container">
            <img className="logo" src="https://cdn1.iconfinder.com/data/icons/super-ice-cream/512/4-512.png" alt=""/>
            <h1>Welcome</h1>
            <Divider orientation="left">Email</Divider>
            <Input className="input" size="large" placeholder="Enter your email" prefix={<MailOutlined />} onChange={this.HandleEmail} type="email"/>
            <Divider orientation="left">Password</Divider>
            <Input className="input" size="large" placeholder="Enter your password" prefix={<LockOutlined />} onChange={this.HandlePassword} type="password"/>
            <Button className="btn" type="default" onClick={this.Signin}>SIGN-IN</Button>
            <p>Don't have an account? <Link to="/sign-up">Create a new account</Link> </p>
        </div> );
    }
}
 
export default SignIn;
import React, { Component } from 'react';
import 'antd/dist/antd.css';
import Axios from "axios"
import { Link } from 'react-router-dom';
import {Input, Divider,Button} from 'antd';
import {MailOutlined, LockOutlined,UserOutlined} from '@ant-design/icons';

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            User: {},
            confirmed_password:""
         }
    }
    HandleName=(e)=>{
        this.setState({User:{...this.state.User,name:e.target.value}})
    }
    HandleEmail=(e)=>{
        this.setState({User:{...this.state.User,email:e.target.value}})
    }
    HandlePassword=(e)=>{
        this.setState({User:{...this.state.User,password:e.target.value}})
    }
    HandleConfirmedPassword=(e)=>{
        this.setState({confirmed_password:e.target.value})
    }
    SignOut=()=>{
        localStorage.removeItem("token")
        window.location.reload()
    }
    
    CreaterUser=()=>{
        if ((!this.state.User.name) || (!this.state.User.password) || (!this.state.User.email)|| (!this.state.confirmed_password)) { alert('One of the inputs is empty') }
        if (this.state.User.password > 8) { alert('The password has less than 8 characters') }
        if (this.state.User.password!==this.state.confirmed_password){alert ('The password is not confirmed')}

        if ((this.state.User.name) && (this.state.User.password) && (this.state.User.email)&& (this.state.confirmed_password)&&(this.state.User.password < 8)&&(this.state.User.password===this.state.confirmed_password)){Axios.post('http://localhost:3010/signup',this.state.User).then(res=>window.location.replace("/sign-in")).catch(err=>alert(err)) }
    }
    render() { 
        console.log(this.state)
        return ( <div className="container">
            <img className="logo" src="https://cdn1.iconfinder.com/data/icons/super-ice-cream/512/4-512.png" alt=""/>
            {localStorage.getItem("token")?
            <div className="container">    
            <h1 className="title">YOU MUST LOG OUT TO SIGN UP</h1>
            <Button className="btn" type="default" onClick={this.SignOut}>Sign OUT</Button>
            </div>:
            <div>
            <h1>Create Account</h1>
            <Divider orientation="left">Name</Divider>
            <Input className="input"size="large" placeholder="Enter your name" prefix={<UserOutlined />} onChange={this.HandleName} />
            <Divider orientation="left">Email</Divider>
            <Input className="input" size="large" placeholder="Enter your email" prefix={<MailOutlined />} onChange={this.HandleEmail} type="email"/>
            <Divider orientation="left">Password</Divider>
            <Input className="input" size="large" placeholder="Enter your password" prefix={<LockOutlined />} onChange={this.HandlePassword} type="password" />
            <Divider orientation="left">Confirm Password</Divider>
            <Input className="input" size="large" placeholder="Renter your password" prefix={<LockOutlined />} onChange={this.HandleConfirmedPassword} type="password"/>
            <Button className="btn" type="default" onClick={this.CreaterUser}>Create Account</Button>
            <p>Already have an account? <Link to="/">Sing-in</Link> </p>
            </div>}
        </div>  );
    }
}
 
export default SignUp ;
import React, { Component } from 'react';
import Axios from 'axios';
import {Input, Divider,Button} from 'antd';
import {MailOutlined, LockOutlined,UserOutlined} from '@ant-design/icons';

class EditForm extends Component {
    constructor(props) {
        super(props);
        this.state = {}
         
    }
     
    
    HandleChange=(e)=>{
        this.setState({[e.target.name]:e.target.value})
    }
    Edit=()=>{
        Axios.put(`http://localhost:3010/${this.props.match.params.userId}`,this.state)
        window.location.replace("/User/Interface")
    }
    render() { 
        console.log(this.state)
        return ( <div className="container">
            <img className="logo" src="https://cdn1.iconfinder.com/data/icons/super-ice-cream/512/4-512.png" alt=""/>
            <h1 className="title">Update User</h1>
            <Divider orientation="left">Name</Divider>
            <Input className="input" size="large" placeholder="Enter your name" type="email" prefix={<UserOutlined />} onChange={this.HandleChange} name="name"/>
            <Divider orientation="left">Email</Divider>
            <Input className="input" size="large" placeholder="Enter your email" prefix={<MailOutlined />} onChange={this.HandleChange} name="email"/>
            <Divider orientation="left">Password</Divider>
            <Input className="input" size="large" placeholder="Enter your password" prefix={<LockOutlined />} type="password" onChange={this.HandleChange} name="password"/>
            <Button className="btn" type="default" onClick={this.Edit}>Update</Button>
        </div> );
    }
}
 
export default EditForm;
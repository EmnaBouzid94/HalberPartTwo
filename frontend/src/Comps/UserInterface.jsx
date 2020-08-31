import React, { Component } from 'react';
import Axios from 'axios'
import jwt_decode from 'jwt-decode';
import { Card, Avatar, Popconfirm, Button } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Meta } = Card;

class UserInterface extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userId:"a",
            Users:[]
          }
    }
    componentDidMount() {
        Axios.get('http://localhost:3010/users/')
        .then(res => this.setState({
            Users: [...res.data]
        })).catch(err => {
            console.log(err)
        })
        if (localStorage.getItem('token'))
        {let token=localStorage.getItem("token")
        let decodedToken=jwt_decode(token)
        let userId=decodedToken.userId
        this.setState({userId:userId})
   }
        
    }
    
    Confirm=(id) =>{
        
        Axios.delete(`http://localhost:3010/${id}`).then(res=>this.setState({Users:this.state.Users.filter(e=>e._id === id)})).catch(err=>console.log(err))
    }
    Cancel=() =>{
        console.log("Deleting cancelled");
    } 
    
    componentDidUpdate(PrevProps,PrevState){
        if (PrevState.Users.length !== this.state.Users.length)
        {
            Axios.get('http://localhost:3010/users').then(res=>this.setState({Users:res.data})).catch(err=>console.log(err))
        }

    }
    
    render() { 
        
        return ( <div >
            {((this.state.userId)&&(this.state.userId.startsWith("adminId")))?
            <div style={{display: "flex",flexDirection: "column", alignItems: "center",justifyContent:"center"}}>
            <img style={{width:"20%"}} src="https://cdn1.iconfinder.com/data/icons/super-ice-cream/512/4-512.png" alt=""/>
            <h1>The List of USERS</h1>
            <div className="container-reverse">
            
            {this.state.Users.map(e=>
            <Card className="card" key={e._id} style={{ width: 300 }} actions={[
            <Popconfirm title="Are you sure delete this user?"
                        onConfirm={()=>this.Confirm(e._id)}
                        onCancel={this.Cancel}
                        okText="Yes"
                        cancelText="No">
                <DeleteOutlined key="delete" />
            </Popconfirm>
            ,<Link to={'/update/'+e._id}>
            <EditOutlined key="edit" />
            </Link>,
        ]}>
        <Meta 
            avatar={<Avatar src="https://cdn0.iconfinder.com/data/icons/elegant-web-standard/200/2-512.png" />}
            title={e.name}
            description={"Email: "+ e.email}
        />
    </Card>)}
        
        
    </div>
    </div>
:<div className="container">
    <img className="logo" src="https://cdn1.iconfinder.com/data/icons/super-ice-cream/512/4-512.png" alt=""/>
    <h1 className="title container">THE ADMINISTRATOR MUST LOGIN</h1>
    <Button className="btn" type="default" onClick={()=>window.location.replace("/sign-in")}>SIGN-IN</Button>
    </div> }
    
    </div>);
    }
    
}
 
export default UserInterface;
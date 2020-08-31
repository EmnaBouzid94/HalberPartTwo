import React from 'react';
import 'antd/dist/antd.css';
import './App.css';
import SignIn from './Comps/Signin';
import {BrowserRouter as Router, Route} from "react-router-dom"
import SignUp from './Comps/Signup';
import ClientInterface from './Comps/ClientInterface';
import UserInterface from './Comps/UserInterface';
import EditForm from './Comps/EditForm';
import HomePage from './Comps/HomePage';

function App() {
  
  return (
    
    <Router>
      <Route exact path="/" component={HomePage}/>
      <Route exact path="/sign-in" component={SignIn}/>
      <Route exact path="/sign-up" component={SignUp}/>
      <Route exact path="/Profile" component={ClientInterface}/>
      <Route exact path="/User/Interface" component={UserInterface}/>
      <Route exact path="/update/:userId" component={EditForm}/>
    </Router>
  );
}

export default App;

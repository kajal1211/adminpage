import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
//import * as firebase from 'firebase';
import { render } from '@testing-library/react';
//import {firebaseApp} from './config'
import {mainListItems, secondaryListItems, thirdListItems} from './sidebar';
import Title from './Title';
//import History from './History';
import SignIn from './SignIn';
import Drawer from '@material-ui/core/Drawer'
import { AppBar, Toolbar, Typography, Divider } from '@material-ui/core';
import Routes from './Routes'
import {Router} from 'react-router-dom'

export class App extends Component  {
  state={
   
    data : '',
    mylist : [],
}
/* componentDidMount() {
 
  const data = firebaseApp.database().ref("Courses/CDS July 2018/Notifications")
  data
  .orderByChild('Date')
  .on('value', datasnap => {
    if(datasnap.val())
      {
      this.setState({mylist: Object.values(datasnap.val())}, function() {
        
        console.log("mylist: "+this.state.mylist);
      
      });
    }
    
  })
  }  */
  render() {
    
  return (
    <div className="App">
     <AppBar style={{backgroundColor: '#084d7b', height: '8%',}}>
          <Title>Admin profile</Title>
      </AppBar>
    
     {/*  <Drawer
        variant="permanent" 
      >
        <div style={{height: '8%',}}></div>
        <Divider/>
     {mainListItems}
     <Divider/>
     {secondaryListItems}
     <Divider/>
     {thirdListItems}
     <Divider/>
     </Drawer> */}
     <div style={{marginTop:'5%',}}>
     {/* <History/>  */}
     </div>
     {/*  <SignIn/> */}
    </div>
  );
}
}
//export default App;

function R() {
  return (
    <Router>
      <Routes />
    </Router>
  );
}
export default R;

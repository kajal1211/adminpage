
import React, { Component } from 'react';

import './App.css';
//import * as firebase from 'firebase';
import Title from './Title';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, Divider,Button, TextField } from '@material-ui/core';
import history from './History';
import Container from '@material-ui/core/Container'
import firebase from './config'
import {FormLabel, RadioGroup, FormControlLabel, Radio} from '@material-ui/core'
import DatePicker from 'react-date-picker'
class AddSuccessStories extends Component  {
    state={
      courseName:'',
      list:[],
      name: '',
      content:'',
      
    }
  handleInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }; 
  addSuccessStory=()=>{
     
      //alert(JSON.stringify(this.state.courseName))
      let sub = this.state.courseName;
      var name = this.state.name;
      var content = this.state.content; 
      var tempDate = new Date();
      console.log("temp: "+ tempDate)
      var date = tempDate.getDate()+'/'+(tempDate.getMonth()+1) + '/' +tempDate.getFullYear() ;
      
     
      var courseName = this.state.courseName;
      //console.log('course'+sub)
      
      if(sub === "" || content==="" || name==='')
        {
          alert("Your course info is empty")
        
        }
      else{
       
        /* data
        .on('value', datasnap => {
          if(datasnap.val())
            {
            this.setState({list: Object.values(datasnap.val())}, function() {
              
              console.log("notifications: "+this.state.list);
            
            });
          }
        }) */
        const data =  firebase.database().ref("Success Stories")

        data.push().set(
          {
            Name: name,
            Content: content,
            Time: date,
            Course: courseName,
          } )
          //console.log("Added")
          alert("Success story added successfully")
       }
  }

  render() {
    
    const classes = makeStyles((theme) => ({
        paper: {
          marginTop: '10%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        },
       
        /* form: {
          width: '100%',
         
        }, */
        submit: {
          marginTop: '10%',
        },
        image: {
          height: '30%',
          width: '30%',
        }
      }));

  return (
    <Container component="main" maxWidth="xs">
    
    <div className={classes.paper}>
        {/* <AppBar
              position="absolute"
              //className={classNames(classes.appBar, this.state.open && classes.appBarShift)}
            >
              <Toolbar>
                
                <Typography color="inherit" noWrap>
                  ADD COURSE
                </Typography>
                
              </Toolbar>
        </AppBar> */}
    
        <form >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="coursename"
            label="Course Name"
            name="courseName"
            //value={this.state.email}
            onChange={this.handleInputChange}
            
            autoFocus
            
          />

        <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="content"
            label="Write Story"
            name="content"
            //value={this.state.email}
            onChange={this.handleInputChange}
            
            
            
          />

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Your Name"
            name="name"
            //value={this.state.email}
            onChange={this.handleInputChange}
            
            
          />

            <Button
            
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={this.addSuccessStory}
          >
            ADD SUCCESS STORY
          </Button>
        </form>  
    </div>
   </Container>   
  );
}
}
export default AddSuccessStories;

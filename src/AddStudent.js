import React, { Component } from 'react';

import './App.css';
//import * as firebase from 'firebase';
import Title from './Title';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, Divider,Button, TextField } from '@material-ui/core';
import history from './History';
import Container from '@material-ui/core/Container';
import firebase from './config'
import {Select, InputLabel, MenuItem} from '@material-ui/core'

class AddStudent extends Component  {
  state={
    courseName:'',
    list:[],
    courseNameList: [],
    selectValue: 'CDS June 2019',
    studentName: '',
    studentEmail: '',
    studentPassword:'',
    studentContact: '',
    
  }
  componentDidMount() {
    
    this.state.data = firebase.database().ref("Courses")
    this.state.data
    .on('value', datasnap => {
      if(datasnap.val())
        {
        this.setState({courseNameList: Object.keys(datasnap.val())}, function() {
          
        
        });
      }
     
    })
    } 
  handleInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value },
      
    )
  }; 
  addStudent=()=>{
     
      //alert(JSON.stringify(this.state.courseName))
      let sub = this.state.selectValue;
      var Name = this.state.studentName
      var Email = this.state.studentEmail
      var Contact = this.state.studentContact
      var Password=this.state.studentPassword
     // var RandomId = JSON.stringify(Math.floor(Math.random() * 1000) + 1)
      //console.log('course'+sub)
      
      if(sub === "" || Name==="" || Email==="" || Contact==="" || Password==='')
        {
          alert("Fill all the details...")
        
        }
      else{
        const data =  firebase.database().ref("Courses/"+sub+"/Students")
        const Students = firebase.database().ref("Students")

       
        data.push().set(
          {
            Name: Name,
            Contact: Contact,
            Email: Email,
          } )
        if(window.confirm("Enrolling this student for the first time in this institute"))  
        {
         
         Students.push(
          



            Email


          
        )  
        }

        firebase.auth().createUserWithEmailAndPassword(Email,Password)
       .then((u)=>{
         console.log('Successfully Signed up!')
       })
       .catch((err)=>{
         console.log('Error'+err)
       })

       alert("Student Successfully Added!")

       }
  }
   handleChange=(e)=>{
      this.setState({selectValue:e.target.value});
    
  } 
  render() {
    var i = 0
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
          <InputLabel id="label">Course Names</InputLabel>
          <Select labelId="label" id="select" value={this.state.selectValue} 
            onChange={this.handleChange} >
          {this.state.courseNameList.map((e, i) => {
            return <MenuItem key={i++} value={e}>{e}</MenuItem>;
            })}
          </Select>

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="studentName"
            label="Student Name"
            name="studentName"
            //value={this.state.email}
            onChange={this.handleInputChange}
            autoComplete="studentName"
            autoFocus
            
          />

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth

            id="studentEmail"
            label="Student Email"
            name="studentEmail"
            //value={this.state.email}
            onChange={this.handleInputChange}
            autoComplete="studentEmail"
            autoFocus
            
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
           
            id="studentPassword"
            label="Student Password"
            name="studentPassword"
            //value={this.state.email}
            onChange={this.handleInputChange}
            
          type='password'
            autoFocus
            
          />


          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="studentContact"
            label="Student Contact"
            name="studentContact"
            //value={this.state.email}
            onChange={this.handleInputChange}
            autoComplete="studentContact"
            autoFocus
            
          />

            <Button
            
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={this.addStudent}
          >
            ADD STUDENT
          </Button>

          
        </form>  
    </div>
   </Container>   
  );
}
}
export default AddStudent;

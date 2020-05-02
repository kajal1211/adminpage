import React, { Component } from 'react';

import './App.css';
//import * as firebase from 'firebase';
import Title from './Title';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, Divider,Button, TextField } from '@material-ui/core';
import history from './History';
import Container from '@material-ui/core/Container';
import firebase from './config'

class DeleteStudent extends Component  {
    state={
      coursename:'',
      studentname:  '',
      list:[],
      studentlist: [],
      studentlistkeys: [],
      data: '',
    }
    componentDidMount() {
    
        this.state.data = firebase.database().ref("Students")
        this.state.data
        .on('value', datasnap => {
          if(datasnap.val())
            {
            this.setState({studentlist: Object.values(datasnap.val())}, function() {
              
              console.log("teacherlist: "+this.state.studentlist);
            
            });
  
            
  
            this.setState({studentlistkeys: Object.keys(datasnap.val())}, function() {
              
              console.log("Keys: "+this.state.studentlistkeys);
            
            });
          }
         
        })
        } 
      
  handleInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }; 
  deleteStudent=()=>{
     
    let activeState = 0;
    let i = 0;
    const studentname = this.state.studentname
    const coursename = this.state.coursename
    if(window.confirm("Are you sure you wanna delete this item?"))
    {      
          const ex = this.state.studentlist;
          //console.log("ex: "+ ex)
          ex.map((item,index) => {
             //console.log("item: "+item)
             //console.log("studentname: "+studentname)
            if(item.match(studentname)) {
                
              activeState=1;  
                //console.log("key: " +index)
              i=index;  
              //console.log("i: "+i)
                  }
                })
          if(activeState===0)
            {
                alert("This email is not found to delete!!!")
            }
          else{
              //console.log("i1: "+i)
              this.state.data.child(this.state.studentlistkeys[i]).remove()
              alert("Student Successfully Deleted!")
          }  
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
            id="studentname"
            label="Student Email"
            name="studentname"
            //value={this.state.email}
            onChange={this.handleInputChange}
            autoComplete="studentname"
            autoFocus
            
          />

        
            <Button
            
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={this.deleteStudent}
          >
            DELETE STUDENT
          </Button>

        </form>  
    </div>
   </Container>   
  );
}
}
export default DeleteStudent;

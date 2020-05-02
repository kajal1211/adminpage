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
class UpcomingCourses extends Component  {
    state={
      courseName:'',
      list:[],
      courseFees: '',
      startDate: new Date(),
      endDate: new Date(),
      courseDetail:'',
      
    }
  handleInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }; 
  addInfo=()=>{
     
      //alert(JSON.stringify(this.state.courseName))
      let sub = this.state.courseName;
      var courseFees = this.state.courseFees;
      var courseDetail = this.state.courseDetail; 
      var startDate = this.state.startDate;
      var endDate = this.state.endDate;
      //console.log('course'+sub)
      
      if(sub === "" || courseDetail==="" || courseFees==='')
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
        const data =  firebase.database().ref("Upcoming Courses/"+sub)

        data.update(
          {
            Name: courseDetail,
            End: endDate,
            Start: startDate,
            Fees: courseFees,
          } )
          alert("Upcoming Course Successfully Added!")
       }
  }
  onChangeStart = date => this.setState({ startDate: date },
    function(){console.log(date)})
  onChangeEnd = date => this.setState({ endDate: date })

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
            id="courseDetail"
            label="Course Details"
            name="courseDetail"
            //value={this.state.email}
            onChange={this.handleInputChange}
            
            
            
          />

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="courseFees"
            label="Course Fees"
            name="courseFees"
            //value={this.state.email}
            onChange={this.handleInputChange}
            
            
          />

        <div>
            <DatePicker
            onChange={this.onChangeStart}
            value={this.state.startDate}
            />
        </div>

        <div>
            <DatePicker
            onChange={this.onChangeEnd}
            value={this.state.endDate}
            />
        </div>

            <Button
            
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={this.addInfo}
          >
            ADD INFORMATION
          </Button>
        </form>  
    </div>
   </Container>   
  );
}
}
export default UpcomingCourses;

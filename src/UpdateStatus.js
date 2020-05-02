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
import {FormLabel, RadioGroup, FormControlLabel, Radio} from '@material-ui/core'

class UpdateStatus extends Component  {
  state={
    courseName:'',
    list:[],
    courseNameList: [],
    selectValue: 'CDS June 2019',
    studentName: '',
    studentEmail: '',
    studentContact: '',
    courseStatus: 'Inactive',
  }
  componentDidMount() {
    
    this.state.data = firebase.database().ref("Courses")
    this.state.data
    .on('value', datasnap => {
      if(datasnap.val())
        {
        this.setState({courseNameList: Object.keys(datasnap.val())}, function() {
          
          console.log("Keys: "+this.state.courseNameList);
        
        });
      }
     
    })
    } 
  handleInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value },
      
    )
  }; 
  
   handleChange=(e)=>{
      this.setState({selectValue:e.target.value});
    
  } 

  radioChange=(e)=>{
    //console.log("Status: "+e.target.value)
    this.setState({courseStatus:e.target.value});
  }
  changeStatus=()=>{
    var sub = this.state.selectValue
    var courseStatus = this.state.courseStatus
    const data = firebase.database().ref('Courses/'+sub)
    data.update(
        {
          ActiveStatus: courseStatus,
        } )

        return(
          <alert>Status changed </alert>
        )
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

          <FormLabel component="legend">Course Status </FormLabel>
            <RadioGroup defaultValue="Inactive" aria-label="status" name="customized-radios" onChange={this.radioChange}>
              <FormControlLabel value="Active" control={<Radio />} label="Active" />
              <FormControlLabel value="Inactive" control={<Radio />} label="Inactive" /> 
             
            </RadioGroup>

            <Button
            
            
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={this.changeStatus}
          >
            UPDATE STATUS
          </Button>

          
        </form>  
    </div>
   </Container>   
  );
}
}
export default UpdateStatus;

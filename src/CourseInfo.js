import React ,{Component} from 'react'
import { render } from '@testing-library/react';
import firebase from './config'
import {Button, Typography, TextField} from '@material-ui/core'
import {Card, View} from '@material-ui/core'
import {Select, InputLabel, MenuItem} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';


export default class DeleteUpcomingCourse extends Component{
    state={
        selectValue:'CDS June 2019',
        studentList:[],
        courseListKeys: [],
        data:'',
        array:[],
       
        courseList: [],
        
        courseInfo: [],
    }
    componentDidMount() {
        var sub = this.state.selectValue
        const data = firebase.database().ref("Courses/"+sub)
        const courseNames = firebase.database().ref("Courses")
        courseNames
        .on('value', datasnap => {
          if(datasnap.val())

            this.setState({courseListKeys: Object.keys(datasnap.val())}, function() {
              
              //console.log("List: "+this.state.courseListKeys);
             
            });
          })

          data
          .on('value', datasnap => {
          if(datasnap.val())

            this.setState({courseInfo: Object.values(datasnap.val())}, function() {
              
              //console.log("List1 : "+this.state.courseInfo);
             
            });
          })
         
        

    }
    handleChange=(e)=>{
      this.setState({selectValue:e.target.value},function(){
        let sub = this.state.selectValue
        var data = firebase.database().ref("Courses/"+sub)
        
        data
        .on('value', datasnap => {
          if(datasnap.val())
            {
            this.setState({courseInfo: Object.values(datasnap.val())}, function() {
              
              console.log("List1: "+this.state.courseInfo);
             
            });        
            
          }
          else{
            this.setState({courseInfo: ''}, function(){
              //console.log("notifications: "+this.state.notificationList)
            })
           
          }
        })
      
      });
    
  } 
  
    renderInfo=()=>{
      var i=0;
      
      //var length = this.state.courseInfo.length
      
      const card={
        margin: '5%',
      }
      //console.log('l:'+length)
      
      return(
   
        <Card key={i++} style={card}>
          {"Name: "}{this.state.selectValue}<br />
          {"Active Status: "}{this.state.courseInfo[0]}<br />
          {"Details: "}{this.state.courseInfo[1]}<br />
             
        </Card>

      )
      
    }



    teacherInfo=()=>{
     

      let sub = this.state.selectValue
      let data=firebase.database().ref("Courses/"+sub+"/Teacher/")
      let renderer=[]
     
      {
        
      data.on("value",datasnap=>{
        console.log(datasnap.val())
        if(datasnap.val())
        {
          let objs=datasnap.val()
          let keys=Object.keys(objs)
          for(let i=0;i<keys.length;i++){
            let key=keys[i]
            let todo=objs[key]
             renderer[i]=(
              <tr>
                <td>{i+1}</td>
                <td>{todo.Name}</td>
             <td>{todo.Email}</td>
             <td>{todo.Contact}</td>
              </tr>
               /*  <Card key={i} style={card}>
                  
             


                </Card> */
              
             )
          }
          
        }
        else  renderer=(
          <center>
          <b><i>>No Students Admitted Yet!</i></b></center>
        )
      })
      return renderer
      }



    }


    studentInfo=()=>{
      let sub = this.state.selectValue
      let data=firebase.database().ref("Courses/"+sub+"/Students/")
      let renderer=[]
     
    
      
      {
        
      data.on("value",datasnap=>{
        console.log(datasnap.val())
        if(datasnap.val())
        {
          let objs=datasnap.val()
          let keys=Object.keys(objs)
          for(let i=0;i<keys.length;i++){
            let key=keys[i]
            let todo=objs[key]
             renderer[i]=(
              <tr>
                <td>{i+1}</td>
                <td>{todo.Name}</td>
             <td>{todo.Email}</td>
             <td>{todo.Contact}</td>
              </tr>
               /*  <Card key={i} style={card}>
                  
             


                </Card> */
              
             )
          }
          
        }
        else  renderer=(
          <center>
          <b><i>>No Students Admitted Yet!</i></b></center>
        )
      })
      return renderer
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
        <div>
          <InputLabel id="label">Course Names</InputLabel>
          <Select labelId="label" id="select" value={this.state.selectValue} 
            onChange={this.handleChange} >
          {this.state.courseListKeys.map((e, i) => {
            return <MenuItem key={i++} value={e}>{e}</MenuItem>;
            })}
          </Select>
              
          {this.renderInfo()}    
<div style={{marginBottom:40}}></div>
<Card>
 <center>
   <b>Teacher Information:</b>
 <table  cellSpacing={10} title='Teacher Info' style={{border: '1px solid black'}}>
   <tr>
     <th>Id</th>
   <th>Name</th>
   <th>Email</th>
   <th>Contact</th>
   </tr>
  
   {this.teacherInfo()}
   
 </table>
 </center>
 </Card>

 <div style={{marginBottom:40}}></div>
<Card>
 <center>
   <b>Student Information:</b>
 <table  cellSpacing={10} title='Teacher Info' style={{border: '1px solid black'}}>
   <tr>
     <th>Id</th>
   <th>Name</th>
   <th>Email</th>
   <th>Contact</th>
   </tr>
  
   {this.studentInfo()}
   
 </table>
 </center>
 </Card>
          </div>
        );
      }
    }

import React ,{Component} from 'react'
import { render } from '@testing-library/react';
import firebase from './config'
import {Button, Typography, TextField} from '@material-ui/core'
import {Card, View} from '@material-ui/core'
import {Select, InputLabel, MenuItem} from '@material-ui/core'


export default class AddMarks extends Component{
    state={
        selectValue:'CDS June 2019',
        studentList:[],
        studentListKeys: [],
        data:'',
        array:[],
        englishMarks:'',
        gkMarks:'',
        mathsMarks:'',
        courseNameList: [],
        marks: '',
        gatMarks: '',

    }
    componentDidMount() {
        let sub = this.state.selectValue
        var data = firebase.database().ref("Courses/"+sub+"/Students")
        data
        .on('value', datasnap => {
          if(datasnap.val())
            {
            this.setState({studentList: Object.values(datasnap.val())}, function() {
              
              console.log("List: "+this.state.studentList);
             
            });

            this.setState({studentListKeys: Object.keys(datasnap.val())}, function() {
              
              console.log("List: "+this.state.studentListKeys);
             
            });
          }
         
        })

        var datalist = firebase.database().ref("Courses")
        datalist
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
      this.setState({selectValue:e.target.value},function(){
        let sub = this.state.selectValue
        var data = firebase.database().ref("Courses/"+sub+"/Students")
        
        data
        .on('value', datasnap => {
          if(datasnap.val())
            {
            this.setState({studentList: Object.values(datasnap.val())}, function() {
              
              console.log("List: "+this.state.studentList);
             
            });

            this.setState({studentListKeys: Object.keys(datasnap.val())}, function() {
              
              console.log("List: "+this.state.studentListKeys);
             
            });
          }
          else{
            this.setState({studentList: ''}, function(){
              //console.log("notifications: "+this.state.notificationList)
            })
            this.setState({studentListKeys: ''}, function(){
              //console.log("notifications: "+this.state.notificationList)
            })
          }
        })
      
      });
    
  } 
    addMarks = i => {
      var englishMarks = this.state.englishMarks
      var selectValue = this.state.selectValue
      var gkMarks = this.state.gkMarks
      var mathsMarks = this.state.mathsMarks
      var studentId = this.state.studentListKeys[i]
      var gatMarks = this.state.gatMarks
      var marks = this.state.marks
      console.log("id: "+studentId)
      var data = firebase.database().ref("Courses/"+selectValue+"/Students/"+studentId+'/Marks')
      if(selectValue.match('CDS'))
      {
      data.update(
        {
          English: englishMarks,
          GK: gkMarks,
          Mathematics: mathsMarks,
        } )
      }
      else if(selectValue.match('NDA'))
      {
        data.update(
          {
            English: englishMarks,
            GAT : gatMarks,

          } )
      }
      else{
        data.update(
          {
            Marks: marks,
            
          } )
      }
      //console.log("Marks: "+englishMarks)
    }

    renderStudent=()=>{
      var i=0;
      var sub = this.state.selectValue
      var length = this.state.studentList.length
      const textinput={
        width: '15%',
      }
      //console.log('l:'+length)
      
      return(
        <div>
        { length > 0
        ?<div>
        {sub.match('CDS')
        ?<ul>
          {this.state.studentList.map((listitem, index) => (
            <Card key={i++}>
              {listitem.Name}

              <TextField
                variant="outlined"
                onChange={this.handleInputChange}
                required
                id="englishMarks"
                label="English"
                name="englishMarks"
                style={textinput}
              />

              <TextField
                variant="outlined"
                onChange={this.handleInputChange}
                required
                id="gkMarks"
                label="GK"
                name="gkMarks"
                style={textinput}
              />

              <TextField
                variant="outlined"
                onChange={this.handleInputChange}
                required
                id="mathsMarks"
                label="Maths"
                name="mathsMarks"
                style={textinput}
              />

              <Button onClick={() => this.addMarks(index)}>ADD MARKS</Button>
            </Card>
                ))}
        </ul>
        : <div>
            {
              sub.match('NDA')
              ?<ul>
              {this.state.studentList.map((listitem, index) => (
                <Card key={i++}>
                  {listitem.Name}
    
                  <TextField
                    variant="outlined"
                    onChange={this.handleInputChange}
                    required
                    id="englishMarks"
                    label="English"
                    name="englishMarks"
                    style={textinput}
                  />
    
                  <TextField
                    variant="outlined"
                    onChange={this.handleInputChange}
                    required
                    id="gat"
                    label="GAT"
                    name="gat"
                    style={textinput}
                  />
    
                  <Button onClick={() => this.addMarks(index)}>ADD MARKS</Button>
                </Card>
                    ))}
            </ul>
            :<ul>
            {this.state.studentList.map((listitem, index) => (
              <Card key={i++}>
                {listitem.Name}
  
                <TextField
                  variant="outlined"
                  onChange={this.handleInputChange}
                  required
                  id="marks"
                  label="Marks"
                  name="marks"
                  style={textinput}
                />
  
                <Button onClick={() => this.addMarks(index)}>ADD MARKS</Button>
              </Card>
                  ))}
              </ul>
            }
          </div>
        }
        </div>
        :<h5>NO STUDENT FOUND</h5>
        }
        </div>
      )
      
    }
    render() {
      var i=0;
      
      //const listItems = this.state.studentList.map((d,i) => <li key={i++}>{d.Name}</li>);
      return (
        <div>
          <InputLabel id="label">Course Names</InputLabel>
          <Select labelId="label" id="select" value={this.state.selectValue} 
            onChange={this.handleChange} >
          {this.state.courseNameList.map((e, i) => {
            return <MenuItem key={i++} value={e}>{e}</MenuItem>;
            })}
          </Select>
            
          {/* <NumberList studentList={this.state.studentList}/>  */}
              
          {this.renderStudent()}    
        
      </div>      
          
        );
      }
    }

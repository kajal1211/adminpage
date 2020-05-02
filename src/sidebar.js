
import React, {Component} from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import AddCircleOutline from '@material-ui/icons/AddCircleOutline'
import AssignmentIcon from '@material-ui/icons/Assignment';
import DeleteOutline from '@material-ui/icons/DeleteOutline'
import Edit from '@material-ui/icons/Edit'
import { Link } from 'react-router-dom';
import history from './History';

import Drawer from '@material-ui/core/Drawer'
import { AppBar, Toolbar, Typography, Divider, MenuItem } from '@material-ui/core';

export default class Sidebar extends Component{
  render(){
    return(
      <Drawer variant="permanent">
        {mainListItems}
        {secondaryListItems}
        {thirdListItems}
      </Drawer>  
    )
  }
}


export const mainListItems = (
  <div>

  
    <ListItem button>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Admin Profile" />
      {/* <Link to={'/AddCourse'}>Add Course</Link> */} 
    </ListItem>


    <ListItem button onClick={()=>{history.push('/CourseInfo')}}>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Course Information" />
    </ListItem>

  </div>
);

export const secondaryListItems = (
  <div>
    
    <ListItem button onClick={()=>{history.push('/AddCourse')}}>
      <ListItemIcon>
        <AddCircleOutline/>
      </ListItemIcon>
      <ListItemText primary="Add Course" />
    </ListItem>
    <ListItem button onClick={()=>{history.push('/AddTeacher')}}>
      <ListItemIcon>
        <AddCircleOutline/> 
      </ListItemIcon>
      <ListItemText primary="Add Teacher" />
    </ListItem>
    <ListItem button onClick={()=>{history.push('/AddStudent')}}>
      <ListItemIcon>
        <AddCircleOutline/>
      </ListItemIcon>
      <ListItemText primary="Add Student" />
    </ListItem>
    <ListItem button onClick={()=>{history.push('/AddMarks')}}>
      <ListItemIcon>
        <AddCircleOutline/>
      </ListItemIcon>
      <ListItemText primary="Add Marks" />
    </ListItem>
    
    <ListItem button onClick={()=>{history.push('/AddSuccessStories')}}>
      <ListItemIcon>
        <AddCircleOutline/>
      </ListItemIcon>
      <ListItemText primary="Add Success Stories" />
    </ListItem>
    <ListItem button onClick={()=>{history.push('/UpcomingCourses')}}>
      <ListItemIcon>
        <AddCircleOutline/>
      </ListItemIcon>
      <ListItemText primary="Add Upcoming Courses" />
    </ListItem>
    <ListItem button onClick={()=>{history.push('/UpdateStatus')}}>
      <ListItemIcon>
        <Edit/>
      </ListItemIcon>
      <ListItemText primary="Update Status" />
    </ListItem>
  </div>
);

export const thirdListItems = (
  <div>
    
    <ListItem button onClick={()=>{history.push('/DeleteTeacher')}}>
      <ListItemIcon>
        <DeleteOutline/>
      </ListItemIcon>
      <ListItemText primary="Delete Teacher" />
    </ListItem>

    <ListItem button onClick={()=>{history.push('/DeleteStudent')}}>
      <ListItemIcon>
        <DeleteOutline/>
      </ListItemIcon>
      <ListItemText primary="Delete Student" />
    </ListItem>

    <ListItem button onClick={()=>{history.push('/DeleteUpcomingCourse')}}>
      <ListItemIcon>
        <DeleteOutline/>
      </ListItemIcon>
      <ListItemText primary="Delete Upcoming Course" />
    </ListItem>
    
  </div>
);



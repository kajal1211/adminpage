import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";

import SignIn from './SignIn'
import history from './History'
import AddCourse from './AddCourse';
import AddStudent from './AddStudent'
import AdminProfile from './AdminProfile'
import AddTeacher from './AddTeacher'
import DeleteTeacher from './DeleteTeacher'
import DeleteStudent from './DeleteStudent'
import AddMarks from './AddMarks'
import UpdateStatus from './UpdateStatus'
import UpcomingCourses from './UpcomingCourses'
import AddSuccessStories from './AddSuccessStories'
import DeleteUpcomingCourse from './DeleteUpcomingCourse'
import CourseInfo from './CourseInfo'
export default class Routes extends Component{
    render(){
        return(
            <Router history={history}>
                <Switch>
                    <Route path="/" exact component={SignIn} />
                    <Route path="/AddCourse" component={AddCourse} />
                    <Route path="/AddStudent" component={AddStudent} />
                    <Route path="/AdminProfile" component={AdminProfile} />
                    <Route path="/AddTeacher" component={AddTeacher} />
                    <Route path="/DeleteTeacher" component={DeleteTeacher} />
                    <Route path="/DeleteStudent" component={DeleteStudent} />
                    <Route path="/AddMarks" component={AddMarks} />
                    <Route path="/UpdateStatus" component={UpdateStatus} />
                    <Route path = '/UpcomingCourses' component= {UpcomingCourses} />
                    <Route path = '/AddSuccessStories' component= {AddSuccessStories} />
                    <Route path = '/DeleteUpcomingCourse' component= {DeleteUpcomingCourse} />
                    <Route path = '/CourseInfo' component= {CourseInfo} />
                </Switch>
            </Router>
        )
    }
}
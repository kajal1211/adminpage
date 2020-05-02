import React, {Component} from 'react'
import firebase from './config'
import Carousel from 'react-elastic-carousel';
import logo from './images/ApexLogo.jpg'
import CDSINAEligibility from './images/CDSINAEligibility.jpg'
import ApexAbout from './images/ApexAbout.jpg'
import HeroesArmy from './images/HeroesArmy.jpg'
import IndianArmy from './images/IndianArmy.jpg'
import apex_about from './images/apex_about.jpg'
import Airhist from './images/airhist.jpg'
import Faculty1 from './images/Faculty1.jpg'
import ArmyWarsDescription from './images/ArmyWarsDescription.jpg'
import { AppBar, Toolbar, Typography, Divider, Button, IconButton, Container} from '@material-ui/core';
import Sidebar from './sidebar'
export default class AdminProfile extends Component{
  state={
    children: [],
    activeItemIndex: 0,
    data : '',
    mylist : [],
    email: this.props.location.email,
  }
 
        render () {
          const carousel={
           marginLeft:'20%',
           width: '80%',
          }
          const image={
            backgroundColor:'blue',
            height: '40%',
            width: '40%',
            margin:'5%'
          }
          //console.log('email: '+email)
          const email = this.state.email
          return (
            <Container component="main" maxWidth="xl">
           {/*  <AppBar
              position="absolute"
              //className={classNames(classes.appBar, this.state.open && classes.appBarShift)}
            >
              <Toolbar disableGutters={!this.state.open}>
                
                <Typography color="inherit" noWrap>
                  ADMIN PROFILE
                </Typography>
                <Typography className='subtitle1'>
                  {JSON.stringify(email)}
                </Typography>
              </Toolbar>
            </AppBar> */}

          
              <Sidebar/>
             
                <Carousel style={carousel}>
                
                    <img src={logo} style={image} /> 
                    <img src={CDSINAEligibility} style={image} /> 
                    <img src={ApexAbout} style={image} />
                    <img src={HeroesArmy} style={image}/>
                    <img src={IndianArmy} style={image} />
                    <img src={apex_about} style={image}/>
                    <img src={Airhist} style={image} />
                    <img src={Faculty1} style={image}/>
                    <img src={ArmyWarsDescription} style={image}/>
                   
                </Carousel>
             
              
           
          </Container>
          )
        }
    
  } 
    

import React, {Component} from 'react';

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import logo from './images/ApexLogo.jpg';
import firebase from './config'

export default class SignIn extends Component {
  state={
    email:'',
    password: '',
    Students: [],
  }
  handleInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  };
  adminSignIn = (event) => {
     event.preventDefault();
   
          var adminEmail = "admin@apex.com"
          var email = this.state.email
          if(this.state.email === "" || this.state.password === "")
          {
            alert("Please...Enter the fields...")
          }
          else if(email.match(adminEmail))
          {
            firebase
            .auth()
            .signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(() => {
            
              this.props.history.push({
                pathname: '/AdminProfile',
                email: this.state.email});
            })
              .catch(function(error) {
                var errorCode = error.code;
                var errorMessage = error.message;
                alert(errorMessage);
              }) 
          }
          else{
            alert("Please enter email and password of admin")
          }
     
  };

  render(){
    const classes = makeStyles((theme) => ({
      paper: {
        marginTop: '10%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      },

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
      <CssBaseline />
      <div className={classes.paper}>
      
        <img src={logo} alt="Logo" className={classes.image} />

        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
           
            onChange={this.handleInputChange  }
            autoComplete="email"
            autoFocus
            
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
           
            onChange={this.handleInputChange  }
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={this.adminSignIn}
          >
            Sign In
          </Button>
         
             
  
        </form>
      </div>
      
    </Container>
  );
  }
}
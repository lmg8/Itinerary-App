import React from "react";
import { Link } from "react-router-dom";
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';

import "./styles.css";

/* Component for the Home page */
let preventDefault =(event)=>event.preventDefault(); 

class Login extends React.Component {
  render() {
    return (
        //Href in link will need to be updated to link to the signup page
      <Container component="main" maxWidth="xs">
          <div className="center">
            <Typography component="h1" variant="h5">
                  Sign in
            </Typography>
            <form>
                <TextField className="username-text" required id ="username-input" label = "Enter Username" autoComplete="username" fullWidth/>
                <TextField className="password-text" id="password-input" label="Enter Password" type="password" fullWidth/>
            </form>
            <Button className="submit-button" type="submit" fullWidth variant="contained" color="primary"> Submit </Button>
            <Link id="create-account" href="#" onClick={preventDefault}>No account? Create one now!</Link> 
          </div>
      </Container>
    );
    
  }
}

export default Login;

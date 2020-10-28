import React from "react";
import { Link } from "react-router-dom";
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import HomeIcon from '@material-ui/icons/Home';

import "./styles.css";

/* Component for the Home page */

class Login extends React.Component {
  render() {
    return (
        <div className="login-background">
             <AppBar color="primary" position="static">
                    <Toolbar variant={"dense"}>
                        <ButtonGroup size='small' variant="text">
                            <Link edge="start" to={"./../"}>
                                <Button><HomeIcon fontSize="large"/></Button>
                            </Link>
                        </ButtonGroup>
                    </Toolbar>
                </AppBar>
            <Container component="main" maxWidth="xs">
                <div className="center">
                    <Card className="login-card" elevation="24" variant = "elevated">
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <form>
                            <TextField variant="outlined" required id ="username-input" label = "Enter Username" autoComplete="username" fullWidth margin="normal"/>
                            <TextField variant="outlined" id="password-input" label="Enter Password" type="password" fullWidth margin="normal"/>
                        </form>
                        <Button className="submit-button" type="submit" fullWidth variant="contained" color="primary"> Submit </Button>
                        <Link id="create-account" to={"./../Signup"}>No account? Create one now!</Link> 
                    </Card>
                </div>
            </Container>
        </div>
    );
    
  }
}

export default Login;

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
import {Redirect} from 'react-router-dom';

import "./styles.css";

/* Component for the Login page */

class Login extends React.Component {

    constructor(props){
        super(props);
        this.state={
            username:"",
            password:"",
            authenticated: false
        }
    }

    handleUserNameChange = (e)=>{
        this.setState({username: e.target.value})
    }

    handlePasswordChange = (e)=>{
        this.setState({password: e.target.value})
    }

    handleOnClick = () =>{
        
        if ((this.state.username == "user" && this.state.password == "user") || (this.state.username == "admin" && this.state.password == "admin")){
            this.setState({authenticated:true});
        } else {
            alert("Wrong username or password");
        }
    }


    render() {
        const redirect = this.state.authenticated;
        if (redirect){
            return <Redirect to="./../User"/>;
        }
        return (
            <div className="login-background">
                <AppBar className="login-appBar" color="primary" position="static">
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
                                <TextField variant="outlined" required id ="username-input" label = "Enter Username" autoComplete="username" fullWidth margin="normal" onChange={this.handleUserNameChange} value={this.state.username}/>
                                <TextField variant="outlined" id="password-input" label="Enter Password" type="password" fullWidth margin="normal" onChange={this.handlePasswordChange} value={this.state.password}/>
                            </form>
                            <Button className="submit-button" type="submit" fullWidth variant="contained" onClick={this.handleOnClick} color="primary"> Submit </Button>
                            <Link id="create-account" to={"./../Signup"}>No account? Create one now!</Link> 
                        </Card>
                    </div>
                </Container>
            </div>
        );
        
    }
}

export default Login;

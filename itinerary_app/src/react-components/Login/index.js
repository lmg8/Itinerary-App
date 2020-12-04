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

import {login, updateLoginForm} from "../../actions/user"

import "./styles.css";

/* Component for the Login page */

class Login extends React.Component {

    constructor(props){
        super(props);
        this.props.history.push("/login")
        this.state={
            username:"",
            password:""
        }
    }

    render() {
        const { app } = this.props

        const userRedirect = this.state.userAuthenticated;
        const adminRedirect = this.state.adminAuthenticated;
        if (userRedirect){
            return <Redirect to="./../user"/>;
        }
        else if (adminRedirect){
            return <Redirect to="./../admin"/>;
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
                                <TextField variant="outlined" required id ="username-input" name="username" label = "Enter Username" autoComplete="username" fullWidth margin="normal" onChange={e => updateLoginForm(this, e.target)}/>
                                <TextField variant="outlined" id="password-input" name="password" label="Enter Password" type="password" fullWidth margin="normal" onChange={e => updateLoginForm(this, e.target)}/>
                            </form>
                            <Button className="submit-button" type="submit" fullWidth variant="contained" onClick={()=>login(this,app)} color="primary"> Submit </Button>
                            <Link id="create-account" to={"./../Signup"}>No account? Create one now!</Link> 
                        </Card>
                    </div>
                </Container>
            </div>
        );
        
    }
}

export default Login;

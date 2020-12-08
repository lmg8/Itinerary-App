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
import Grid from '@material-ui/core/Grid';

import {createUser, updateCreationForm} from "../../actions/user"


import "./styles.css";

/* Component for the Home page */

//Right now starting on line 23, it just leads the user back to the home page. In the full release, it should save the new account in the database under users
//Of course, this will require a server call
class Signup extends React.Component {
    constructor(props){
        super(props);
        this.props.history.push("/signup")
        this.state={
            username:"",
            password:""
        }
    }
  render() {
    const { app } = this.props

    return (
        <div className="signup-background">
             <AppBar className="signup-appBar" color="primary" position="static">
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
                    <Card className="signup-card" elevation="24" variant = "elevated">
                        <Typography component="h1" variant="h5">
                            Create an account
                        </Typography>
                        <form>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField variant="outlined" required id ="firstname-input" name="firstName" label = "Enter your first name" fullWidth margin="normal" onChange={e=>updateCreationForm(this, e.target)}/>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField variant="outlined" required id ="lastame-input" name="lastName" label = "Enter your last name" fullWidth margin="normal" onChange={e=>updateCreationForm(this, e.target)}/>
                                </Grid>
                            </Grid>
                            <TextField variant="outlined" required id ="username-input" name="username" label = "Enter your username" autoComplete="username" fullWidth margin="normal" onChange={e=>updateCreationForm(this, e.target)}/>
                            <TextField variant="outlined" required id ="email-input" name="email" label = "Enter your email" fullWidth margin="normal" onChange={e=>updateCreationForm(this, e.target)}/>
                            <TextField variant="outlined" id="password-input" name="password" label="Enter Password" type="password" fullWidth margin="normal" onChange={e=>updateCreationForm(this, e.target)}/>
                            <TextField variant="outlined" id="repeated-password-input" label="Enter Password Again" type="password" fullWidth margin="normal"/>
                        </form>
                        <ButtonGroup>
                            <Link to={"./../user"}>
                                <Button className="submit-button" type="submit" fullWidth variant="contained" color="primary" onClick={()=>createUser(this,app)}> Create Account </Button>
                            </Link>
                            <Link to={"./../Login"}>
                                <Button className="cancel-button" type="cancel" fullWidth variant="contained" color="secondary"> I already have an account </Button>
                            </Link>
                        </ButtonGroup>
                    </Card>
                </div>
            </Container>
        </div>
    );
    
  }
}

export default Signup;

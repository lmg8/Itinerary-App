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
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import "./styles.css";

/* Component for the User page */

class User extends React.Component {

    constructor(props){
        super(props);
        this.state={
            username:"",
            password:"",
            authenticated: false
        }
    }

    render() {
        return (
            <div >
                <AppBar className="user-appBar" color="primary" position="static">
                        <Toolbar variant={"dense"}>
                            <ButtonGroup size='small' variant="text">
                                <Link edge="start" to={"./../"}>
                                    <Button><HomeIcon fontSize="large"/></Button>
                                </Link>
                            </ButtonGroup>
                        </Toolbar>
                    </AppBar>
                <Container component="main" maxWidth="xl">
                    <div className="center">
                        <Avatar src="/static/avatar.jpg"/>
                        <Typography component="h1" variant="h5"> Welcome Adam</Typography>
                    </div>
                </Container>
            </div>
        );
        
    }
}

export default User;

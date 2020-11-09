import React from "react";
import { Link  } from "react-router-dom";
import { ButtonGroup, Container, AppBar, Toolbar, Button } from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles'

import SettingsIcon from '@material-ui/icons/Settings';
import SearchIcon from '@material-ui/icons/Search';
import HomeIcon from '@material-ui/icons/Home';
import "./styles.css"


const useStyles = makeStyles(() => ({
  typographyStyles: {
    flex: 1
},
}));

const Header = () => {
  const classes = useStyles();
  return (
    <AppBar className="generic-appBar" color="primary" position="static">
        <Toolbar variant={"dense"}>
            <Container>
                <ButtonGroup size='small' variant="text">
                    <Link to={{pathname: "/user"}}>
                        <Button> <HomeIcon fontSize="large"/> </Button>
                    </Link>
                    <Link to={{pathname: "/search"}}>
                        <Button> <SearchIcon fontSize="large"/> </Button>
                    </Link>
                </ButtonGroup>
                <ButtonGroup size='small' variant="text" className="signout_button_group">
                    <Link to={{pathname: "/"}}>
                        <Button variant="contained">Sign out</Button>
                    </Link>
                </ButtonGroup>
                <ButtonGroup size='small' variant="text" className="generic_button_group">
                    <Link to={{pathname: "/user/settings"}}>
                        <Button><SettingsIcon fontSize="large"/></Button>
                    </Link>
                </ButtonGroup>
                            
            </Container>
        </Toolbar>
    </AppBar>
    );
};

export default Header;
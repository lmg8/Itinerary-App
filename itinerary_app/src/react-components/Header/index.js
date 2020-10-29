import React from "react";
import { ButtonGroup, Container, AppBar, Toolbar, Link, Button } from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles'
import InfoIcon from '@material-ui/icons/Info';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import NavigationIcon from '@material-ui/icons/Navigation'
import "./styles.css"


const useStyles = makeStyles(() => ({
  typographyStyles: {
    flex: 1
},
}));

const Header = () => {
  const classes = useStyles();
  return (
    <AppBar className={"home__appBar"} color="primary" position="static">
      <Toolbar variant={"dense"}>
          <Container>
              <ButtonGroup size='small' variant="text" className="home__button">
                  <Link className="home__button-link" to={"./../About"}>
                      <Button><InfoOutlinedIcon fontSize="small"/></Button>
                  </Link>
                  <Link className="home__button-link" to={"./../Signup"}>
                      <Button>SIGN UP</Button>
                  </Link>
                  <Link className="home__button-link" to={"./../Login"}>
                      <Button variant="contained">SIGN IN <NavigationIcon fontSize={"small"}/></Button>
                  </Link>
              </ButtonGroup>
          </Container>
      </Toolbar>
    </AppBar>
    );
};

export default Header;
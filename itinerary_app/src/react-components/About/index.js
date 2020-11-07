import React from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar , Container, Paper} from "@material-ui/core"
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from "@material-ui/core/Button";
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import NavigationIcon from '@material-ui/icons/Navigation'
import HomeIcon from '@material-ui/icons/Home';

import AboutTabs from '.././AboutTabs';
import "./styles.css";

class About extends React.Component {

    render() {
        return (
            <div className="home__bg-image center">

                <AppBar className={"home__appBar"} color="primary" position="static">
                    <Toolbar variant={"dense"}>
                        <Container className="home__container">
                            <Link className="home__button-link" to={"./../"}>
                                <Button className={"backhome__button"} size={"small"} variant="contained">
                                    <HomeIcon className="home__Icon" />
                                </Button>
                            </Link>
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
                <div >
                    <Paper className="about__section" elevation={24}>
                        <AboutTabs className="AboutTabs"/>
                    </Paper>
                </div>

            </div>

        );
    }
}

export default About;

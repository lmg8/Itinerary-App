import React from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar , Container} from "@material-ui/core"
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from "@material-ui/core/Button";
import Typography from '@material-ui/core/Typography';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import RoomIcon from '@material-ui/icons/Room';
import NavigationIcon from '@material-ui/icons/Navigation'

import "./styles.css";

class Home extends React.Component {

    constructor(props){
        super(props);
        this.props.history.push("/")
    }

    render() {
        const { history, app } = this.props;

        return (
            <div className="home__bg-image center">
                <Container className={"TitleContainer"}>
                    <Typography className={"Title"} variant="h1"  gutterBottom>
                        <RoomIcon className="TitleIcon shadow" fontSize={"large"}/>ITINERARY
                    </Typography>
                </Container>
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
            </div>
        );
    }
}

export default Home;

import React from "react";
import Container from "@material-ui/core/Container";
import TextField from '@material-ui/core/TextField';
import AddLocationRoundedIcon from '@material-ui/icons/AddLocationRounded';
import DoneIcon from '@material-ui/icons/Done';
import { uid } from "react-uid";
import NewDestination from "../NewDestination";
import "./styles.css";
import Grid from "@material-ui/core/Grid";
import HomeRounded from '@material-ui/icons/Home';
import PlaceRoundedIcon from '@material-ui/icons/PlaceRounded';
import WatchLaterIcon from '@material-ui/icons/WatchLater';
import ExploreIcon from '@material-ui/icons/Explore';
import {IconButton} from "@material-ui/core";
import Tooltip from "@material-ui/core/Tooltip";
import Header from "../Header";
import {Link } from "react-router-dom";


class CreateItinerary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            //store this in database
            itinerary: {id: '', name: "", starting: "", ending: "", destinations: [], startDate: new Date()},

        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleAddClick = this.handleAddClick.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
    }

    handleNameChange = (e) => {
        let itinerary = this.state.itinerary;
        itinerary["name"] = e.target.value;
        this.setState({itinerary});
    }

    handleStartingChange = (e) => {
        let itinerary = this.state.itinerary;
        itinerary["starting"] = e.target.value.toUTCString();
        this.setState({itinerary});
    }

    handleFinalChange = (e) => {
        let itinerary = this.state.itinerary;
        itinerary["ending"] = e.target.value;
        this.setState({itinerary});
    }

    handleDateChange = (e) => {
        let itinerary = this.state.itinerary;
        itinerary["startDate"] = e.target.value;
        this.setState({itinerary});
    }

    handleDestination = (index, {target: {value}}) => {
        let itinerary = this.state.itinerary;
        let destinations = itinerary["destinations"];
        destinations[index]["address"] = value;
        itinerary["destinations"] = destinations
        this.setState({itinerary});

    }

    handleAddClick = () => {
        let itinerary = this.state.itinerary;
        let destinations = itinerary["destinations"];
        destinations.push({address:""})
        itinerary["destinations"] = destinations;
        this.setState({itinerary});

    }

     handleSubmit = (unique) => {
        let itinerary = this.state.itinerary;
        itinerary["id"] = unique
        this.setState({itinerary});
         this.props.handleSubmit(this.state.itinerary);
     }

    render() {
        const unique = uid(this.state.itinerary);
        return (

            <div>
                <Header/>

                <Container component="main" maxWidth="sm">

                <div className={"createItinerary__body"}>
                        <h1 className={"createItinerary__h3"} >Create Itinerary</h1>
                        <form>
                            <Grid container  alignItems="center" spacing={1}>
                                <Grid item xs={11} >
                                    <TextField
                                        //accept only addresses
                                        //use google api to get autocomplete address
                                        id="standard-full-width"
                                        placeholder="Name your trip"
                                        fullWidth={true}
                                        margin="normal"
                                        value={this.state.itinerary["name"]}
                                        onChange={this.handleNameChange}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={1}> <ExploreIcon/></Grid>

                                <Grid item xs={11} >
                                    <TextField
                                        //accept only addresses
                                        //use google api to get autocomplete address
                                        id="standard-full-width"
                                        placeholder="Choose starting point..."
                                        fullWidth={true}
                                        margin="normal"
                                        value={this.state.itinerary["starting"]}
                                        onChange={this.handleStartingChange}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={1}> <HomeRounded/></Grid>

                                <Grid item xs={11} >

                                    <TextField
                                        //accept only addresses
                                        //use google api to get autocomplete address
                                        id="standard-full-width"
                                        placeholder="Choose final destination..."
                                        fullWidth={true}
                                        margin="normal"
                                        value={this.state.itinerary["ending"]}
                                        onChange={this.handleFinalChange}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={1}> <PlaceRoundedIcon/></Grid>

                                <Grid item xs={11} >

                                    <TextField
                                        id="datetime-local"
                                        label="Start Date"
                                        type="datetime-local"
                                        fullWidth={true}
                                        margin="normal"
                                        value={this.state.itinerary["startDate"]}
                                        onChange={this.handleDateChange}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />

                                </Grid>
                                <Grid item xs={1}> <WatchLaterIcon fontSize={"small"}/> </Grid>

                                <Grid item xs={12} >

                                    {
                                        this.state.itinerary["destinations"].map((d, index) => {
                                            return (<NewDestination  key={uid(d)} itinerary={this} index={index} handleChange={this.handleDestination.bind(this,index)}/>);
                                        })
                                    }

                                </Grid>

                                <Grid item xs={12} >
                                    <div>
                                        <Link onClick={()=>this.handleSubmit(unique)} to={`./itinerary/${unique}`}>
                                            <Tooltip title="Submit" arrow>
                                                <IconButton  className={"create__Button"} variant={"contained"} >  <DoneIcon fontSize={"small"}/> </IconButton>
                                            </Tooltip>
                                        </Link>
                                        <Tooltip title="Add destination..." arrow>
                                            <IconButton className={"create__Button"} onClick={this.handleAddClick} variant={"contained"} ><AddLocationRoundedIcon/> </IconButton>
                                        </Tooltip>
                                    </div>
                                </Grid>


                            </Grid>
                        </form>
                    </div>
                </Container>

            </div>

        );
    };
}

export default CreateItinerary;
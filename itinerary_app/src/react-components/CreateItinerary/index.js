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
import {withRouter} from "react-router-dom";
import GoogleMaps from "./search";
import {createItinerary} from "../../actions/itinerary";

class CreateItinerary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            //store this in database
            id: '',
            itinerary: {name: "", source: null, destination: null, waypoints: [], startDate: ''},
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleAddClick = this.handleAddClick.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleAddressChange = this.handleAddressChange.bind(this);
    }

    handleNameChange = (e) => {
        let itinerary = this.state.itinerary;
        itinerary["name"] = e.target.value;
        this.setState({itinerary});
    }

    handleDateChange = (e) => {
        let itinerary = this.state.itinerary;
        itinerary["startDate"] = e.target.value;
        this.setState({itinerary});
    }

    handleDestination = (index, val) => {
        if(val) {
            let itinerary = this.state.itinerary;
            let waypoints = itinerary["waypoints"];
            waypoints[index]["address"] = val.description;
            waypoints[index]["place_id"] = val.place_id;
            itinerary["waypoints"] = waypoints
            this.setState({itinerary});
            console.log(this.state.itinerary)
        }
    }

    handleAddClick = () => {
        let itinerary = this.state.itinerary;
        if(itinerary.waypoints.length < 10) {
            let waypoints = itinerary["waypoints"];
            waypoints.push({})
            itinerary["waypoints"] = waypoints;
            this.setState({itinerary});
        } else {
            alert("Sorry! We are currently only allowing up to 10 waypoints")
        }
    }

     handleSubmit = (unique) => {

        let itinerary = this.state.itinerary;
        if(itinerary.source && itinerary.destination && itinerary.startDate.trim() != '' && itinerary.name.trim() != ''){
            /*itinerary["id"] = unique
            itinerary.waypoints = itinerary.waypoints.filter(value => Object.keys(value).length !== 0) //remove empty waypoints
            this.setState({itinerary});
            this.props.handleSubmit(this.state.itinerary);
            this.props.history.push(`./itinerary/${unique}`)*/

            itinerary.waypoints = itinerary.waypoints.filter(value => Object.keys(value).length !== 0) //remove empty waypoints
            this.setState({itinerary});
           createItinerary(this);
           //go to componentDidUpdate after createItinerary finished
        } else {
            alert("Please make sure to enter the name, start destination, final destination, and start date");
        }

     }



     handleAddressChange = (className, val) => {
        if(val){
            let itinerary = this.state.itinerary;
            itinerary[className] = {"address":val.description, "place_id":val.place_id};
            this.setState({itinerary})
            console.log(itinerary)
            console.log(val.description);
            console.log(val.place_id);
        }
     }

     componentDidUpdate(prevProps, prevState, snapshot) {
        //handle when id updated
        if(prevState.id !== this.state.id){
            this.props.history.push(`/user/itinerary/${this.state.id}`)
        }
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
                                    <GoogleMaps
                                        inputAddress={this.handleAddressChange.bind(this, "source")}
                                        prompt={"Choose starting point..."}
                                    />
                                    {/*<TextField*/}
                                    {/*    //accept only addresses*/}
                                    {/*    //use google api to get autocomplete address*/}
                                    {/*    id="standard-full-width"*/}
                                    {/*    placeholder="Choose starting point..."*/}
                                    {/*    fullWidth={true}*/}
                                    {/*    margin="normal"*/}
                                    {/*    value={this.state.itinerary["starting"]}*/}
                                    {/*    onChange={this.handleStartingChange}*/}
                                    {/*    InputLabelProps={{*/}
                                    {/*        shrink: true,*/}
                                    {/*    }}*/}
                                    {/*/>*/}
                                </Grid>
                                <Grid item xs={1}> <HomeRounded/></Grid>

                                <Grid item xs={11} >
                                    <GoogleMaps
                                        prompt={"Choose final destination..."}
                                        inputAddress={this.handleAddressChange.bind(this, "destination")}
                                        className={"ending"}
                                    />
                                </Grid>
                                <Grid item xs={1}> <PlaceRoundedIcon/></Grid>

                                <Grid item xs={11} >

                                    <TextField
                                        id="datetime-local"
                                        //label="Start Date"
                                        placeholder={"Start Date"}
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
                                        this.state.itinerary["waypoints"].map((d, index) => {
                                            return (<NewDestination  key={uid(d)} itinerary={this} index={index} handleChange={this.handleDestination.bind(this,index)}/>);
                                        })
                                    }

                                </Grid>

                                <Grid item xs={12} >
                                    <div>
                                            <Tooltip title="Submit" arrow>
                                                <IconButton  onClick={()=>this.handleSubmit(unique)} className={"create__Button"} variant={"contained"} >  <DoneIcon fontSize={"small"}/> </IconButton>
                                            </Tooltip>
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

export default withRouter(CreateItinerary);
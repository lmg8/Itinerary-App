import React from "react";
import Container from "@material-ui/core/Container";
import TextField from '@material-ui/core/TextField';
import AddLocationRoundedIcon from '@material-ui/icons/AddLocationRounded';
import Button from "@material-ui/core/Button";
import DoneIcon from '@material-ui/icons/Done';
import { uid } from "react-uid";

import NewDestination from "../NewDestination";
import "./styles.css";
import Grid from "@material-ui/core/Grid";
import HomeRounded from '@material-ui/icons/Home';
import PlaceRoundedIcon from '@material-ui/icons/PlaceRounded';
import WatchLaterIcon from '@material-ui/icons/WatchLater';


class CreateItinerary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { starting: "", finalD: "", startDate: "", destinations: [], inputs: [],
        };
    }

    handleStartingChange = (e) => {
        this.setState({starting: e.target.value})
    }

    handleFinalChange = (e) => {
        this.setState({finalD: e.target.value})
    }

    handleDateChange = (e) => {
        this.setState({startDate: e.target.value})
        console.log(this.state)
    }

    handleDestination = (index, {target: {value}}) => {
        const destinations = [...this.state.destinations];
        destinations[index]["address"] = value;
        console.log(destinations)
        this.setState({destinations});
        console.log(this.state)
    }

    handleAddClick = () => {
        this.setState({destinations: [...this.state.destinations, {address: ""}]});
    }

    render() {
        return (
            <div>
                {/*TODO: add header*/}

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
                                        placeholder="Choose starting point..."
                                        fullWidth={true}
                                        margin="normal"
                                        value={this.state.starting}
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
                                        value={this.state.finalD}
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
                                        value={this.state.startDate}
                                        onChange={this.handleDateChange}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />

                                </Grid>
                                <Grid item xs={1}> <WatchLaterIcon fontSize={"small"}/> </Grid>

                                <Grid item xs={12} >

                                    {
                                        this.state.destinations.map((d, index) => {
                                            return (<NewDestination  key={uid(d)} itinerary={this} index={index} handleChange={this.handleDestination.bind(this,index)}/>);
                                        })
                                    }

                                </Grid>

                                <Grid item xs={6} >
                                    <Button onClick={this.handleAddClick} color={"primary"}><AddLocationRoundedIcon/> Add Destination... </Button>
                                </Grid>
                                <Grid item xs={6} >
                                    <Button className={"create__Button"} variant={"contained"} color={"secondary"}>  <DoneIcon fontSize={"small"}/> </Button>
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
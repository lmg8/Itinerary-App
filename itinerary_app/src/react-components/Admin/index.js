import React from "react";
import {Box, Button, Grid} from '@material-ui/core';
import AdminUserCard from "../AdminUserCard";
import Header from "../Header";
import './styles.css';
import AdminItineraryCard from "../AdminItineraryCard";

import { getUsers } from "../../actions/user";
import { getItineraries } from "../../actions/itinerary"

class Admin extends React.Component {
  state = {switchTo: "itineraries",
    // Hardcoded itinerary data, will be stored in a database in the final app
    itineraries: [],
    userList: []
  };
    
    // deletes user matching given user ID
    // this will be a database update instead of a state update in the final app
    handleUserDelete = IDToDelete => event => {
        // this will be select _ where _ database query
        let remainingUsers = this.state.users.filter(
            user => user.userID != IDToDelete);
            
        this.setState({
            users: remainingUsers
        });
    }

    // deletes user matching given user ID
    // this will be a database update instead of a state update in the final app
    handleItineraryDelete = IDToDelete => event => {
        // this will be select _ where _ database query
        let remainingItineraries = this.state.itineraries.filter(
            itinerary => itinerary.itineraryID != IDToDelete);
            
        this.setState({
            itineraries: remainingItineraries
        });
    }

    // returns cards displaying all user information
    renderUserCards = users => {
        if (this.state.switchTo === "users"){
            return;
        }
        let userCards = [];
        // this will be a database query
        for (let i = 0; i < users.length; i++){
            userCards.push(<AdminUserCard
            user={users[i]}
            deleteOnClick = {this.handleUserDelete}>
            </AdminUserCard>)
        }
        return userCards;
    }

    // returns cards displaying all itinerary information
    renderItineraryCards = itineraries => {
        if (this.state.switchTo === "itineraries"){
            return;
        }
        let itineraryCards = [];
        // this will be a database query
        for (let i = 0; i < itineraries.length; i++){
            itineraryCards.push(<AdminItineraryCard
            itinerary={itineraries[i]}
            deleteOnClick = {this.handleItineraryDelete}>
            </AdminItineraryCard>)
        }
        return itineraryCards;
    }

    // updates whether users or itineraries are displayed
    handleSwitch = () =>{
        // get from database
        getUsers(this);
        getItineraries(this);
        
        console.log(this.state);
        if (this.state.switchTo === "users"){
            this.setState({
                switchTo: "itineraries"
            });
        }
        else{
            this.setState({
                switchTo: "users"
            });
        }
    }

  render() {
    return (
        <Box className="background">
            <Grid className="pageContainer" container>
                <Grid item xs={12}>
                    <Header></Header>
                </Grid>
                <Grid container xs={1}></Grid>
                <Grid container xs={10}>
                    <Grid item xs={12}>
                        <h1 className="adminPageHeader">Admin Page</h1>
                    </Grid>
                    <Grid container item xs={9} spacing={2}>
                        {this.renderUserCards(this.state.userList)}
                        {this.renderItineraryCards(this.state.itineraries)}
                    </Grid>
                    <Grid container xs={3}>
                        <Grid container item xs={12}>
                            <Grid container xs={5}></Grid>
                            <Grid container xs={6}>
                                <Grid item xs={12} >
                                    <Button fullWidth variant="contained" color="primary" onClick={this.handleSwitch}>{this.state.switchTo}</Button>
                                </Grid>
                            </Grid>
                            <Grid container xs={1}></Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container xs={1}></Grid>
            </Grid>
        </Box>
        );
    }
}

export default Admin;
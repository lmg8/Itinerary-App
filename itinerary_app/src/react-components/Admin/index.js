import React from "react";
import {Avatar, Box, Card, CardActions, CardContent, CardHeader, CardMedia, Button, IconButton, Typography, Grid} from '@material-ui/core';
import AdminUserCard from "../AdminUserCard";
import Header from "../Header";
import './styles.css';
import AdminItineraryCard from "../AdminItineraryCard";

class Admin extends React.Component {
  state = {switchTo: "itineraries",
    itineraries: [
        {
            itineraryID: 0,
            title: "A Night in Toronto",
            day: "January 1st",
            timeOfDay: "12:00",
            banner:"./SearchPics/banner1.jpg",
        },
        {
            itineraryID: 1,
            title: "Toronto in the Summer",
            day: "June 14th",
            timeOfDay: "14:00",
            banner:"./SearchPics/banner2.jpg",
        },
        {
            itineraryID: 2,
            title: "Beach Trip",
            day: "July 29th",
            timeOfDay: "19:00",
            banner:"./SearchPics/banner3.jpg",
        },
        {
            itineraryID: 3,
            title: "Another Night in Toronto",
            day: "January 1st",
            timeOfDay: "02:00",
            banner:"./SearchPics/banner1.jpg",
        },
        {
            itineraryID: 4,
            title: "Watching the Sunset",
            day: "September 14th",
            timeOfDay: "16:00",
            banner:"./SearchPics/banner2.jpg",
        },
        {
            itineraryID: 5,
            title: "Beach Trip 2",
            day: "May 17th",
            timeOfDay: "13:00",
            banner:"./SearchPics/banner3.jpg",
        }],
    users: [
      { 
        userID: 0,
        firstName: "James", 
        lastName: "Naismith", 
        profilePic:"./SearchPics/profilePic1.jpeg", 
        location: "Toronto", 
        quote:"“You only live once, but if you do it right, once is enough.”",
        banner:"./SearchPics/banner1.jpg" },
      { 
        userID: 1,
        firstName: "Kate", 
        lastName: "Park", 
        profilePic: "./SearchPics/profilePic2.jpeg",
        location: "Montreal",
        quote: "“Laugh, even when you feel too sick or too worn out or tired.”",
        banner: "./SearchPics/banner2.jpg" },
      { 
        userID: 2,
        firstName: "Andrew", 
        lastName: "Johnson", 
        profilePic: "./SearchPics/profilePic3.jpg",
        location: "Seattle",
        quote: "“Hello, nice to meet you.”",
        banner: "./SearchPics/banner3.jpg" 
      },
      { 
        userID: 3,
        firstName: "James", 
        lastName: "Naismith", 
        profilePic:"./SearchPics/profilePic1.jpeg", 
        location: "Toronto", 
        quote:"“You only live once, but if you do it right, once is enough.”",
        banner:"./SearchPics/banner1.jpg" },
      { 
        userID: 4,
        firstName: "Kate", 
        lastName: "Park", 
        profilePic: "./SearchPics/profilePic2.jpeg",
        location: "Montreal",
        quote: "“Laugh, even when you feel too sick or too worn out or tired.”",
        banner: "./SearchPics/banner2.jpg" },
      { 
        userID: 5,
        firstName: "Andrew", 
        lastName: "Johnson", 
        profilePic: "./SearchPics/profilePic3.jpg",
        location: "Seattle",
        quote: "“Hello, nice to meet you.”",
        banner: "./SearchPics/banner3.jpg" 
      }]
  };

    handleUserDelete = IDToDelete => event => {
        let remainingUsers = this.state.users.filter(
            user => user.userID != IDToDelete);
            
        this.setState({
            users: remainingUsers
        });
    }

    handleItineraryDelete = IDToDelete => event => {
        let remainingItineraries = this.state.itineraries.filter(
            itinerary => itinerary.itineraryID != IDToDelete);
            
        this.setState({
            itineraries: remainingItineraries
        });
    }

    renderUserCards = users => {
        if (this.state.switchTo === "users"){
            return;
        }
        let userCards = [];
        for (let i = 0; i < users.length; i++){
            userCards.push(<AdminUserCard
            user={users[i]}
            deleteOnClick = {this.handleUserDelete}>
            </AdminUserCard>)
        }
        return userCards;
    }

    renderItineraryCards = itineraries => {
        if (this.state.switchTo === "itineraries"){
            return;
        }
        let itineraryCards = [];
        for (let i = 0; i < itineraries.length; i++){
            itineraryCards.push(<AdminItineraryCard
            itinerary={itineraries[i]}
            deleteOnClick = {this.handleItineraryDelete}>
            </AdminItineraryCard>)
        }
        return itineraryCards;
    }

    handleSwitch = () =>{
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
                        {this.renderUserCards(this.state.users)}
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
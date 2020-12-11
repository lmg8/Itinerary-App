import React from "react";
import {Box, Button, Grid} from '@material-ui/core';
import AdminUserCard from "../AdminUserCard";
import Header from "../Header";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import './styles.css';
import AdminItineraryCard from "../AdminItineraryCard";

import { getUsers, deleteUser } from "../../actions/user";
import { getItineraries, deleteItinerary } from "../../actions/itinerary"

class Admin extends React.Component {
    state = {switchTo: "itineraries",
        itineraries: [],
        userList: [],
        open: false,
        selectedID: ""
    };

    componentDidMount(){
        getUsers(this);
        getItineraries(this);
    }

    transition = React.forwardRef(function Transition(props, ref) {
        return <Slide direction="up" ref={ref} {...props} />;
      });
  
    setOpen = (bool) => {
        this.setState({
            open: bool
        })
    };

    setSelectedID = (id) => {
        this.setState({
            selectedID: id
        })
    }

    handleClickOpen = userID => {
        this.setOpen(true);
        this.setSelectedID(userID);
    };

    handleCloseYes = () => {
        this.setOpen(false);
        this.handleDelete();
    };

    handleCloseNo = () => {
        this.setOpen(false);
    };

    handleDelete = () => {
        if (this.state.switchTo === "users"){
            this.handleItineraryDelete(this.state.selectedID);
            console.log(this.state.selectedID);
        }
        else{
            console.log(this.state.selectedID);
            this.handleUserDelete(this.state.selectedID);
        }
    };
    
    // deletes user matching given user ID
    // this will be a database update instead of a state update in the final app
    handleUserDelete = IDToDelete => {
        let remainingUsers = this.state.userList.filter(
            user => user._id != IDToDelete);
            
        this.setState({
            userList: remainingUsers
        });

        deleteUser(IDToDelete);
    }

    // deletes user matching given user ID
    // this will be a database update instead of a state update in the final app
    handleItineraryDelete = IDToDelete => {
        let remainingItineraries = this.state.itineraries.filter(
            itinerary => itinerary._id != IDToDelete);
            
        this.setState({
            itineraries: remainingItineraries
        });

        deleteItinerary(IDToDelete);
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
            deleteOnClick = {this.handleClickOpen}>
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
            deleteOnClick = {this.handleClickOpen}>
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
            <Dialog
                open={this.state.open}
                TransitionComponent={this.transition}
                keepMounted
                onClose={this.handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">{"Delete?"}</DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    This cannot be undone.
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={this.handleCloseNo} color="primary">
                    No
                </Button>
                <Button onClick={this.handleCloseYes} color="primary">
                    Yes
                </Button>
                </DialogActions>
            </Dialog>
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
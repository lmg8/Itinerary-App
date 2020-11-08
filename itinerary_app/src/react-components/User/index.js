import React from "react";
import { Link  } from "react-router-dom";
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import SettingsIcon from '@material-ui/icons/Settings';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import CardActions from '@material-ui/core/CardActions';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardHeader from '@material-ui/core/CardHeader';
import { Tabs, Tab, CardContent } from "@material-ui/core";

import "./styles.css";

/* Component for the User page */

function allyProps(){
    return {
        id: 'full-width-tab-${index}',
        'aria-controls': 'full-width-tabpanel-${index}',
    };
}

TabPanel.propTypes ={
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
}

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

//Below are two hardcoded items to fill the state arrays. In the full release, the server should populate the arrays
// and these should be removed
const hardCodedItinerary = {id:1,
    starting:"Los Angeles",
    ending:'Berlin',
    destinations: [],
    startDate:'August 12, 2020'
}

const hardCodedFriend = {userId:1,
    name: "Angela Smith",
    currLocation: "Tokyo, Japan",
    username: "AngelS"
}

class User extends React.Component {

    handleChange(event, value) {
        this.setState({value});
    }

    constructor(props){
        super(props);
        this.state={
            username:"user",
            password:"user",
            newFavourite:{
                id:'',
                starting:'',
                ending:'',
                destinations: [],
                startDate:''
            },
            currentItinerary:{
                id:'',
                starting:'',
                ending:'',
                destinations: [],
                startDate:''
            },
            
            //The below lists should be populated by the server (e.g. itineraryList: <itineraryList that is on the server>)
            itineraryList:[hardCodedItinerary],
            favouritesList:[],
            friendsList:[hardCodedFriend]
        }
        this.handleChange = this.handleChange.bind(this);

    }

    addToFavourites(){
        //This should send information to the server so that the server knows what a user's favourites are, right now it just updates a local array
        // In the full release, an additional array on the server should be updated as well.
        const newFavourite = {
            id: hardCodedItinerary.id,
            starting: hardCodedItinerary.starting,
            ending: hardCodedItinerary.ending,
            destinations: hardCodedItinerary.destinations,
            startDate:hardCodedItinerary.startdate
        }

        const favouritesList = [...this.state.favouritesList];
        let flag = true
        for (var i=0; i < favouritesList.length; i++){
            if(favouritesList[i].id == newFavourite.id){
                flag = false;
            }
        }
        if (flag == true){
            favouritesList.push(newFavourite);
        }

        //reset the state
        this.setState({
            favouritesList,
            newFavourite:{
                id:'',
                starting:'',
                ending:'',
                destinations: [],
                startDate:''
            }
        })
    }

    removeItinerary(id){
        //Code below should make a server call and update the itinerary section of the database on the server as well
        const itineraryList=[...this.state.itineraryList];
        const updatedItineraryList = itineraryList.filter(currentItinerary => currentItinerary.id !== id)
        this.setState({itineraryList: updatedItineraryList})
    }

    removeFriend(id){
        //Code below should make a server call and update the friends section of the database on the server as well
        const friendsList=[...this.state.friendsList];
        const updatedFriendList = friendsList.filter(currentFriend => currentFriend.id !== id)
        this.setState({friendsList: updatedFriendList})
    }

    removeFromFavourites(id){
        //Code below should make a server call and update the favourites section of the database on the server as well
        const favList=[...this.state.favouritesList];
        const updatedList = favList.filter(currentItinerary => currentItinerary.id !== id)
        this.setState({favouritesList: updatedList})
    }

    render() {
        return (
            <div >
                <AppBar className="user-appBar" color="primary" position="static">
                        <Toolbar variant={"dense"}>
                            <ButtonGroup size='small' variant="text">
                                <Link to={"user/settings" }>
                                    <Button><SettingsIcon fontSize="large"/></Button>
                                </Link>
                            </ButtonGroup>
                            <ButtonGroup size='small' variant="text">
                                <Link to={"/"}>
                                    <Button variant="contained">Sign out</Button>
                                </Link>
                            </ButtonGroup>
                        </Toolbar>
                    </AppBar>
                    <div>
                        <Avatar className="user-avatar" src="./../SearchPics/profilePic1.jpeg"/>
                        <div>
                            <Typography align="center" component="h1" variant="h5"> Adam Smith </Typography>
                        </div>
                        <Box textAlign='center'>
                            <Link to ={"user/create-itinerary" }>
                                <Button variant="contained"> Create a new itinerary!</Button>
                            </Link>
                        </Box>

                        <Paper>
                            <Tabs value={this.state.value} onChange={this.handleChange} indicatorColor="primary" textcolor="primary" centered>
                                <Tab label="Itineraries" {...allyProps(0)}/>
                                <Tab label="Favourites" {...allyProps(1)}/>
                                <Tab label="Friends" {...allyProps(2)}/>
                            </Tabs>
                        </Paper>
                        <TabPanel value={this.state.value} index={0}>
                            <Grid container spacing = {5}>
                            {this.state.itineraryList.map(itinerary => {
                                return (
                                <Grid item key={itinerary.id} md={3}>
                                    <Card>
                                        <CardActionArea>
                                                <CardContent>
                                                    <Typography variant="h5" component="h2">
                                                        Itinerary: {this.state.itineraryList[0].id}
                                                    </Typography>
                                                    <Typography>
                                                        Starting Location:{this.state.itineraryList[0].starting}
                                                    </Typography>
                                                    <Typography>
                                                        Destination: {this.state.itineraryList[0].ending}
                                                    </Typography>
                                                </CardContent>
                                        </CardActionArea>
                                        <CardActions>
                                            <Button size="small" color="primary" onClick={()=>this.addToFavourites()}>Favourite this itinerary</Button>
                                            <Button size="small" color="secondary" onClick={()=>this.removeItinerary(itinerary.id)}>Delete this itinerary</Button>
                                        </CardActions>
                                    </Card>
                                </Grid>)
                                })}
                            </Grid>
                        </TabPanel>
                        <TabPanel value={this.state.value} index={1}>
                        <Grid container spacing = {5}>
                            {this.state.favouritesList.map(itinerary => {
                                return (
                                    <Grid item key={itinerary.id} md={3}>
                                        <Card>
                                            <CardActionArea>
                                                    {<CardContent>
                                                        <Typography variant="h5" component="h2">
                                                            {this.state.favouritesList[0].id}
                                                        </Typography>
                                                        <Typography>
                                                            Starting location: {this.state.favouritesList[0].starting}
                                                        </Typography>
                                                        <Typography>
                                                            Destination: {this.state.favouritesList[0].ending}
                                                        </Typography>
                                                    </CardContent>}
                                            </CardActionArea>
                                            <CardActions>
                                                <Button size="small" color="secondary" onClick={()=>this.removeFromFavourites(itinerary.id)}>Remove this itinerary from favourites</Button>
                                            </CardActions>
                                        </Card>
                                    </Grid>)
                            })}
                                
                            </Grid>
                        </TabPanel>
                        <TabPanel value={this.state.value} index={2}>
                            <Grid container spacing = {5}>
                                {this.state.friendsList.map(friend => {
                                    return (
                                        <Grid item md={3}>
                                            <Card>
                                                <CardHeader
                                                    Avatar={
                                                        <Avatar className="friend-avatar" src="/static/avatar.jpg"/>
                                                    }/>
                                                <CardActionArea>
                                                        <CardContent>
                                                            <Typography variant="h5" component="h2">
                                                                Name: {this.state.friendsList[0].name}
                                                            </Typography>
                                                            <Typography>
                                                                Location: {this.state.friendsList[0].currLocation}
                                                            </Typography>
                                                            <Typography>
                                                                Username: {this.state.friendsList[0].username}
                                                            </Typography>
                                                        </CardContent>
                                                </CardActionArea>
                                                <CardActions>
                                                    <Button size="small" color="secondary" onClick={()=>this.removeFriend(friend.id)}>Remove this friend</Button>
                                                </CardActions>
                                            </Card>
                                        </Grid>)
                                    })}

                            </Grid>
                        </TabPanel>
                    </div>
            </div>
        );
        
    }
}

User.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};


export default User;

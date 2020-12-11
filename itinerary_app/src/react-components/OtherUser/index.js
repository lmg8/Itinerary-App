import React from "react";
import uuid from 'react-uuid'
import { Link  } from "react-router-dom";
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import CardActions from '@material-ui/core/CardActions';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardHeader from '@material-ui/core/CardHeader';
import Collapse from '@material-ui/core/Collapse'
import { Tabs, Tab, CardContent} from "@material-ui/core";

import { getItinerariesFromUser } from "../../actions/itinerary";
import { getFavouritesFromUser, getFriendsFromUser } from "../../actions/user";
import "./styles.css";
import Header from "../Header";

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

class OtherUser extends React.Component {
    handleChange(event, value) {
        this.setState({value});
    }

    constructor(props){
        super(props);
        this.state={
            user: {},
            username:"user",
            password:"user",
            newFavourite:{
                id:'',
                name:'',
                starting:'',
                ending:'',
                destinations: [],
                startDate:''
            },
            currentItinerary:{
                id:'',
                name:'',
                starting:'',
                ending:'',
                destinations: [],
                startDate:''
            },
            itineraryList:[],
            favouritesList:[],
            friendsList:[],
            itineraryCardsExpanded: false,
            favouritesCardsExpanded: false,
        }
        this.handleChange = this.handleChange.bind(this);

    }

    componentDidMount(){
        console.log(this.props.location.state.user._id);
        getItinerariesFromUser(this.props.location.state.user._id, this);
        getFriendsFromUser(this.props.location.state.user._id, this);
        getFavouritesFromUser(this.props.location.state.user._id, this);
    }

    handleItineraryCardClick = ()=>{
        this.setState(state=>({itineraryCardsExpanded: !state.itineraryCardsExpanded}));
    }

    handleFavouritesCardClick = ()=>{
        this.setState(state=>({favouritesCardsExpanded: !state.favouritesCardsExpanded}));
    }

    render() {
        return (
            <div>
                <Header/>
                    <div className="profile-banner"></div>
                    <div className="spacer"></div>
                    <div>
                        <Avatar className="otheruser-avatar" src="./../SearchPics/profilePic3.jpg"/>
                        <div>
                            <Typography align="center" component="h1" variant="h5">{this.props.location.state.user.firstName + " " + this.props.location.state.user.lastName}</Typography>
                        </div>
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
                                            <CardActionArea onClick={this.handleItineraryCardClick}>
                                                    <CardContent>
                                                        <Typography variant="h5" component="h2">
                                                            Itinerary: {itinerary.name}
                                                        </Typography>
                                                        <Typography>
                                                            Starting Location:{itinerary.starting}
                                                        </Typography>
                                                        <Typography>
                                                            Destination: {itinerary.ending}
                                                        </Typography>
                                                    </CardContent>
                                            </CardActionArea>
                                        <Collapse in={this.state.itineraryCardsExpanded} timeout="auto" unmountOnExit>
                                            <CardContent>
                                                {/*<Typography paragraph variant="h5">
                                                    Stops in between:
                                                </Typography>
                                                <Typography paragraph>
                                                    {this.state.itineraryList[0].destinations[0]}
                                                </Typography>
                                                <Typography paragraph>
                                                    {this.state.itineraryList[0].destinations[1]}
                                                </Typography>*/}
                                            </CardContent>
                                        </Collapse>
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
                                            <CardActionArea onClick={this.handleFavouritesCardClick}>
                                                    {<CardContent>
                                                        <Typography variant="h5" component="h2">
                                                            {itinerary.name}
                                                        </Typography>
                                                        <Typography>
                                                            Starting location: {itinerary.source}
                                                        </Typography>
                                                        <Typography>
                                                            Destination: {itinerary.destination}
                                                        </Typography>
                                                    </CardContent>}
                                            </CardActionArea>
                                            <CardActions>
                                            </CardActions>
                                            <Collapse in={this.state.favouritesCardsExpanded} timeout="auto" unmountOnExit>
                                            <CardContent>
                                                {/*<Typography paragraph variant="h5">
                                                    Stops in between:
                                                </Typography>
                                                <Typography paragraph>
                                                    {itinerary.destinations[0]}
                                                </Typography>
                                                <Typography paragraph>
                                                    {itinerary.destinations[1]}
                                                </Typography>*/}
                                            </CardContent>
                                        </Collapse>
                                        </Card>
                                    </Grid>)
                            })}
                            </Grid>
                        </TabPanel>
                        <TabPanel value={this.state.value} index={2}>
                            <Grid container spacing = {5}>
                                {this.state.friendsList.map(friend => {
                                    console.log(friend)
                                    return (
                                        <Grid item md={2.5}>
                                            <Card>
                                                <CardHeader
                                                    avatar={
                                                        <Avatar className="friend-avatar" src={friend["profilePic"]}/>}
                                                    title={`${friend.firstName} ${friend.lastName}`}
                                                />
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

OtherUser.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default OtherUser;
import React from "react";
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

//Below are two hardcoded items to fill the state arrays. In the full release, the server should populate the arrays
// and these should be removed
const hardCodedItinerary = {id:1,
    name:"Beach Trip",
    starting:"Adam's home, Toronto",
    ending:'Centre Island Beach, Toronto',
    destinations: ["Starbucks, Toronto", "Jack Layton Ferry Terminal, Toronto"],
    startDate:'August 12, 2020'
}

const hardCodedFriend = {userId:1,
    name: "Adam Smith",
    currLocation: "Toronto",
    username: "@ASmith",
    profilePic: `${process.env.PUBLIC_URL}/SearchPics/profilePic1.jpeg`,
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
            
            //The below lists should be populated by the server (e.g. itineraryList: <itineraryList that is on the server>)
            itineraryList:[hardCodedItinerary],
            favouritesList:[],
            friendsList:[hardCodedFriend],
            itineraryCardsExpanded: false,
            favouritesCardsExpanded: false,
        }
        this.handleChange = this.handleChange.bind(this);

    }

    componentDidMount(){
    }

    addToFavourites(){
        //This should send information to the server so that the server knows what a user's favourites are, right now it just updates a local array
        // In the full release, an additional array on the server should be updated as well.
        const newFavourite = {
            id: hardCodedItinerary.id,
            name: hardCodedItinerary.name,
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
                name:'',
                starting:'',
                ending:'',
                destinations: [],
                startDate:''
            }
        })
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
                                                            Itinerary: {this.state.itineraryList[0].name}
                                                        </Typography>
                                                        <Typography>
                                                            Starting Location:{this.state.itineraryList[0].starting}
                                                        </Typography>
                                                        <Typography>
                                                            Destination: {this.state.itineraryList[0].ending}
                                                        </Typography>
                                                    </CardContent>
                                            </CardActionArea>
                                        <Collapse in={this.state.itineraryCardsExpanded} timeout="auto" unmountOnExit>
                                            <CardContent>
                                                <Typography paragraph variant="h5">
                                                    Stops in between:
                                                </Typography>
                                                <Typography paragraph>
                                                    {this.state.itineraryList[0].destinations[0]}
                                                </Typography>
                                                <Typography paragraph>
                                                    {this.state.itineraryList[0].destinations[1]}
                                                </Typography>
                                                
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
                                                            {this.state.favouritesList[0].name}
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
                                            <Collapse in={this.state.favouritesCardsExpanded} timeout="auto" unmountOnExit>
                                            <CardContent>
                                                <Typography paragraph variant="h5">
                                                    Stops in between:
                                                </Typography>
                                                <Typography paragraph>
                                                    {this.state.favouritesList[0].destinations[0]}
                                                </Typography>
                                                <Typography paragraph>
                                                    {this.state.favouritesList[0].destinations[1]}
                                                </Typography>
                                                
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
                                    return (
                                        <Grid item md={2.5}>
                                            <Card>
                                                <CardHeader
                                                    avatar={
                                                        <Avatar className="friend-avatar" src={friend["profilePic"]}/>}
                                                    title={friend["name"]}
                                                    subheader={friend["currLocation"]}
                                                />
                                                <CardActions>
                                                    <Link to={"/User"}>
                                                        <Button size="small" color="secondary">View Profile</Button>
                                                    </Link>
                                                    <Button size="small" color="secondary" onClick={()=>this.removeFriend(friend["userId"])}>Remove this friend</Button>
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

OtherUser.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default OtherUser;
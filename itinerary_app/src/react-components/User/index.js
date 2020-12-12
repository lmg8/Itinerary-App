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
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import CardActions from '@material-ui/core/CardActions';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardHeader from '@material-ui/core/CardHeader';
import Collapse from '@material-ui/core/Collapse'
import {Tabs, Tab, CardContent, Container} from "@material-ui/core";

import {logout, getUsers, getSpecificUser,  getFavouritesFromUser, 
        getFriendsFromUser, replaceFriendsList, replaceItineraryList, replaceFavouritesList} from "../../actions/user"

import { getItinerariesFromUser, deleteItinerary } from "../../actions/itinerary";


import SettingsIcon from '@material-ui/icons/Settings';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import SearchIcon from '@material-ui/icons/Search';


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

class User extends React.Component {

    handleChange(event, value) {
        this.setState({value});
    }

    constructor(props){
        super(props);
        this.props.history.push("/user");
        this.state={
            userList: [],
            nextUser:{},
            userId: 0,
            username:"",
            firstName:"",
            lastName:"",
            adminStatus: false,
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
            itineraryList:[],
            favouritesList:[],
            friendsList:[],
            itineraryCardsExpanded: false,
            favouritesCardsExpanded: false,
        }
        this.handleChange = this.handleChange.bind(this);
    }

    addToFavourites(itinerary){
        console.log(`addtofav: ${itinerary}`)
        const newFavourite = {
            id: itinerary._id,
            name: itinerary.name,
            starting: itinerary.starting,
            ending: itinerary.ending,
            destinations: itinerary.destinations,
            startDate:itinerary.startdate
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

        replaceFavouritesList(favouritesList, this.state.userId)

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

    showUser(user){
        console.log(user)
    }

    removeItinerary(id, app){
        //Code below should make a server call and update the itinerary section of the database on the server as well
        const itineraryList=[...this.state.itineraryList];
        const updatedItineraryList = itineraryList.filter(currentItinerary => currentItinerary._id !== id)
        console.log(updatedItineraryList)
        this.setState({itineraryList: updatedItineraryList})
        replaceItineraryList(updatedItineraryList, this.state.userId)
        deleteItinerary(id, app)
    }

    removeFriend(id){
        //Code below should make a server call and update the friends section of the database on the server as well
        const friendsList=[...this.state.friendsList];
        const updatedFriendList = friendsList.filter(currentFriend => currentFriend._id !== id)
        this.setState({friendsList: updatedFriendList})
        replaceFriendsList(updatedFriendList, this.state.userId)
    }

    removeFromFavourites(id){
        //Code below should make a server call and update the favourites section of the database on the server as well
        const favList=[...this.state.favouritesList];
        const updatedList = favList.filter(currentItinerary => currentItinerary.id !== id)
        this.setState({favouritesList: updatedList})
    }

    handleItineraryCardClick = ()=>{
        this.setState(state=>({itineraryCardsExpanded: !state.itineraryCardsExpanded}));
    }

    handleFavouritesCardClick = ()=>{
        this.setState(state=>({favouritesCardsExpanded: !state.favouritesCardsExpanded}));
    }

    componentDidMount(){
        getUsers(this);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {app} = this.props;
        if(prevState.userList != this.state.userList){
            for (let i = 0; i < this.state.userList.length; i++){
                if(app.state.currentUser == this.state.userList[i].username){
                    getSpecificUser(this, this.state.userList[i]._id)
                    getItinerariesFromUser(this.state.userList[i]._id, this);
                    getFriendsFromUser(this.state.userList[i]._id, this);
                    getFavouritesFromUser(this.state.userList[i]._id, this);
                }
            }
        }
        
    }

    render() {
        const { app } = this.props
        if (this.state.adminStatus === false){
            return (
            <div >
                <AppBar className="user-appBar" color="primary" position="static">
                    <Toolbar variant={"dense"}>
                        <Container>
                            <ButtonGroup size='small' variant="text">
                                <Link to={"./../search"}>
                                    <Button> <SearchIcon fontSize="large"/> </Button>
                                </Link>
                            </ButtonGroup>
                            <ButtonGroup size='small' variant="text" className="signout_button_group">
                                <Link className="signout_button_link" to={"/"}>
                                    <Button variant="contained" onClick={()=>logout(app)}>Sign out</Button>
                                 </Link>
                            </ButtonGroup>
                            <ButtonGroup size='small' variant="text" className="user_button_group">
                                <Link to={"user/settings" }>
                                    <Button><SettingsIcon fontSize="large"/></Button>
                                </Link>
                            </ButtonGroup>
                            
                        </Container>
                    </Toolbar>
                </AppBar>
                    <div className="user-profile-banner"></div>
                    <div className="spacer"></div>
                    <div>
                        <Avatar className="user-avatar" src="./../SearchPics/profilePic1.jpeg"/>
                        <div>
                            <Typography align="center" component="h1" variant="h5"> {this.state.firstName + " " + this.state.lastName} </Typography>
                        </div>
                        <Box textAlign='center'>
                                <Button onClick={()=> this.props.history.push("/user/create-itinerary")} variant="contained"> Create a new itinerary!</Button>
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
                                console.log(itinerary)

                                return (
                                <Grid item key={itinerary._id} md={3}>
                                        <Card>
                                            <CardActionArea onClick={this.handleItineraryCardClick}>
                                                    <CardContent>
                                                        <Typography variant="h5" component="h2">
                                                            {itinerary.name}
                                                        </Typography>
                                                        <Typography>
                                                            Starting location: {itinerary.source.address}
                                                        </Typography>
                                                        <Typography>
                                                            Destination: {itinerary.destination.address}
                                                        </Typography>
                                                    </CardContent>
                                            </CardActionArea>
                                            <CardActions>
                                                <Link to={{pathname:`/user/itinerary/${itinerary._id}`}}>
                                                <Button size="small" color="primary">View</Button>
                                                </Link>
                                                <Button size="small" color="primary" onClick={()=>this.addToFavourites(itinerary)}>Favourite this itinerary</Button>
                                                <Button size="small" color="secondary" onClick={()=>this.removeItinerary(itinerary._id)}>Delete this itinerary</Button>
                                            </CardActions>
                                        <Collapse in={this.state.itineraryCardsExpanded} timeout="auto" unmountOnExit>
                                            {/*
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
                                            */}
                                        </Collapse>
                                    </Card>

                                </Grid>)
                                })}
                            </Grid>
                        </TabPanel>
                        <TabPanel value={this.state.value} index={1}>
                        <Grid container spacing = {5}>
                            {this.state.favouritesList.map(itinerary => {
                                console.log(itinerary)
                                return (
                                    <Grid item key={itinerary._id} md={3}>
                                        <Card>
                                            <CardActionArea onClick={this.handleFavouritesCardClick}>
                                                    {<CardContent>
                                                        <Typography variant="h5" component="h2">
                                                            {itinerary.name}
                                                        </Typography>
                                                        <Typography>
                                                            Starting location: {itinerary.source.address}
                                                        </Typography>
                                                        <Typography>
                                                            Destination: {itinerary.destination.address}
                                                        </Typography>
                                                    </CardContent>}
                                            </CardActionArea>
                                            <CardActions>
                                                <Button size="small" color="secondary" onClick={()=>this.removeFromFavourites(itinerary._id)}>Remove this itinerary from favourites</Button>
                                            </CardActions>
                                            <Collapse in={this.state.favouritesCardsExpanded} timeout="auto" unmountOnExit>
                                            {/*
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
                                            */}
                                        </Collapse>
                                        </Card>
                                    </Grid>)
                            })}
                                
                            </Grid>
                        </TabPanel>
                        <TabPanel value={this.state.value} index={2}>
                            <Grid container spacing = {1}>
                                {this.state.friendsList.map(friend => {
                                    console.log(friend)
                                    return (
                                        <Grid item md={2.5}>
                                            <Card>
                                                    <CardHeader
                                                        avatar={<Avatar className="friend-avatar" src={friend["profilePic"]}/>}
                                                        title={`${friend.firstName} ${friend.lastName}`}
                                                    />
                                                    <CardActions>
                                                        <Link className="signout_button_link" to={{pathname:"../User2", state:{user:this.state.nextUser}}}>
                                                            <Button size="small" color="secondary" onClick={()=>this.showUser(friend)}>View Profile</Button>
                                                        </Link>
                                                        <Button size="small" color="secondary" onClick={()=>this.removeFriend(friend._id)}>Remove this friend</Button>
                                                    </CardActions>
                                            </Card>
                                        </Grid>)
                                    })}

                            </Grid>
                        </TabPanel>
                    </div>
            </div>
        );} else {
            return (
                <div >
                    <AppBar className="user-appBar" color="primary" position="static">
                        <Toolbar variant={"dense"}>
                            <Container>
                                <ButtonGroup size='small' variant="text">
                                    <Link to={"./../search"}>
                                        <Button> <SearchIcon fontSize="large"/> </Button>
                                    </Link>
                                </ButtonGroup>
                                <ButtonGroup size='small' variant="text" className="signout_button_group">
                                    <Link className="signout_button_link" to={"/"}>
                                        <Button variant="contained" onClick={()=>logout(app)}>Sign out</Button>
                                     </Link>
                                </ButtonGroup>
                                <ButtonGroup size='small' variant="text" className="user_button_group">
                                    <Link to={"/admin" }>
                                        <Button><SupervisorAccountIcon fontSize="large"/></Button>
                                    </Link>
                                </ButtonGroup>
                                
                            </Container>
                        </Toolbar>
                    </AppBar>
                        <div className="user-profile-banner"></div>
                        <div className="spacer"></div>
                        <div>
                            <Avatar className="user-avatar" src="./../SearchPics/profilePic1.jpeg"/>
                            <div>
                                <Typography align="center" component="h1" variant="h5"> {this.state.firstName + " " + this.state.lastName} </Typography>
                            </div>
                            <Box textAlign='center'>
                                <Link className="signout_button_link" to ={"user/create-itinerary" }>
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
                                    console.log(itinerary)
                                    return (
                                    <Grid item key={itinerary._id} md={3}>
                                            <Card>
                                                <CardActionArea onClick={this.handleItineraryCardClick}>
                                                    <CardContent>
                                                        <Typography variant="h5" component="h2">
                                                            {itinerary.name}
                                                        </Typography>
                                                        <Typography>
                                                            Starting location: {itinerary.source.address}
                                                        </Typography>
                                                        <Typography>
                                                            Destination: {itinerary.destination.address}
                                                        </Typography>
                                                    </CardContent>
                                                </CardActionArea>
                                                <CardActions>
                                                    <Link to={{pathname:`/user/itinerary/${itinerary._id}`}}>
                                                    <Button size="small" color="primary">View</Button>
                                                    </Link>
                                                    <Button size="small" color="primary" onClick={()=>this.addToFavourites(itinerary)}>Favourite this itinerary</Button>
                                                    <Button size="small" color="secondary" onClick={()=>this.removeItinerary(itinerary._id)}>Delete this itinerary</Button>
                                                </CardActions>
                                            <Collapse in={this.state.itineraryCardsExpanded} timeout="auto" unmountOnExit>
                                            {/*
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
                                            */}
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
                                        <Grid item key={itinerary._id} md={3}>
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
                                                    <Button size="small" color="secondary" onClick={()=>this.removeFromFavourites(itinerary._id)}>Remove this itinerary from favourites</Button>
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
                                <Grid container spacing = {1}>
                                    {this.state.friendsList.map(friend => {
                                        return (
                                            <Grid item md={2.5}>
                                                <Card>
                                                    <CardHeader
                                                        avatar={<Avatar className="friend-avatar" src={friend["profilePic"]}/>}
                                                        title={`${friend.firstName} ${friend.lastName}`}
                                                    />
                                                    <CardActions>
                                                        <Link className="signout_button_link" to={"../User2"}>
                                                            <Button size="small" color="secondary">View Profile</Button>
                                                        </Link>
                                                        <Button size="small" color="secondary" onClick={()=>this.removeFriend(friend._id)}>Remove this friend</Button>
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
}

User.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};


export default User;

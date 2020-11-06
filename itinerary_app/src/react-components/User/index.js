import React from "react";
import { Link } from "react-router-dom";
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

function allyProps(index){
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
        this.state={
            username:"user",
            password:"user",
        }
        this.handleChange = this.handleChange.bind(this);
    }


    render() {
        return (
            <div >
                <AppBar className="user-appBar" color="primary" position="static">
                        <Toolbar variant={"dense"}>
                            <ButtonGroup size='small' variant="text">
                                <Link to={"./../"}>
                                    <Button><SettingsIcon fontSize="large"/></Button>
                                </Link>
                            </ButtonGroup>
                            <ButtonGroup size='small' variant="text">
                                <Link to={"./../"}>
                                    <Button variant="contained">Sign out</Button>
                                </Link>
                            </ButtonGroup>
                        </Toolbar>
                    </AppBar>
                    <div>
                        <Avatar className="user-avatar" src="/static/avatar.jpg"/>
                        <div>
                            <Typography align="center" component="h1" variant="h5"> Adam Smith </Typography>
                        </div>
                        <Box textAlign='center'>
                            <Link to ={"./../"}>
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
                                <Grid item md={3}>
                                    <Card>
                                        <CardActionArea>
                                                <CardContent>
                                                    <Typography variant="h5" component="h2">
                                                        Itinerary 1
                                                    </Typography>
                                                    <Typography>
                                                        Starting location: Los Angeles
                                                    </Typography>
                                                    <Typography>
                                                        Destination: Berlin
                                                    </Typography>
                                                </CardContent>
                                        </CardActionArea>
                                        <CardActions>
                                            <Button size="small" color="primary">Favourite this itinerary</Button>
                                            <Button size="small" color="secondary">Delete this itinerary</Button>
                                        </CardActions>
                                    </Card>
                                </Grid>
                                <Grid item md={3}>
                                    <Card>
                                        <CardActionArea>
                                                <CardContent>
                                                    <Typography variant="h5" component="h2">
                                                        Itinerary 2
                                                    </Typography>
                                                    <Typography>
                                                        Starting location: Toronto
                                                    </Typography>
                                                    <Typography>
                                                        Destination: New York City
                                                    </Typography>
                                                </CardContent>
                                        </CardActionArea>
                                        <CardActions>
                                            <Button size="small" color="primary">Favourite this itinerary</Button>
                                            <Button size="small" color="secondary">Delete this itinerary</Button>
                                        </CardActions>
                                    </Card>
                                </Grid>
                                <Grid item md={3}>
                                    <Card>
                                        <CardActionArea>
                                                <CardContent>
                                                    <Typography variant="h5" component="h2">
                                                        Itinerary 3
                                                    </Typography>
                                                    <Typography>
                                                        Starting location: Toronto
                                                    </Typography>
                                                    <Typography>
                                                        Destination: Tokyo
                                                    </Typography>
                                                </CardContent>
                                                
                                        </CardActionArea>

                                        <CardActions>
                                            <Button size="small" color="primary">Favourite this itinerary</Button>
                                            <Button size="small" color="secondary">Delete this itinerary</Button>
                                        </CardActions>
                                    </Card>
                                </Grid>
                            </Grid>
                        </TabPanel>
                        <TabPanel value={this.state.value} index={1}>
                        <Grid container spacing = {5}>
                                <Grid item md={3}>
                                    <Card>
                                        <CardActionArea>
                                                <CardContent>
                                                    <Typography variant="h5" component="h2">
                                                        Favourite 1
                                                    </Typography>
                                                    <Typography>
                                                        Starting location: Los Angeles
                                                    </Typography>
                                                    <Typography>
                                                        Destination: Berlin
                                                    </Typography>
                                                </CardContent>
                                        </CardActionArea>
                                        <CardActions>
                                            <Button size="small" color="secondary">Remove this itinerary from favourites</Button>
                                        </CardActions>
                                    </Card>
                                </Grid>
                                <Grid item md={3}>
                                    <Card>
                                        <CardActionArea>
                                                <CardContent>
                                                    <Typography variant="h5" component="h2">
                                                        Favourite 2
                                                    </Typography>
                                                    <Typography>
                                                        Starting location: Toronto
                                                    </Typography>
                                                    <Typography>
                                                        Destination: Tokyo
                                                    </Typography>
                                                </CardContent>
                                                
                                        </CardActionArea>
                                        <CardActions>
                                            <Button size="small" color="secondary">Remove this itinerary from favourites</Button>
                                        </CardActions>
                                    </Card>
                                </Grid>
                            </Grid>
                        </TabPanel>
                        <TabPanel value={this.state.value} index={2}>
                            <Grid container spacing = {5}>
                                <Grid item md={3}>
                                    <Card>
                                        <CardHeader
                                            Avatar={
                                                <Avatar className="friend-avatar" src="/static/avatar.jpg"/>
                                            }/>
                                        <CardActionArea>
                                                <CardContent>
                                                    <Typography variant="h5" component="h2">
                                                        Angela Jamieson
                                                    </Typography>
                                                    <Typography>
                                                        Location: Toronto
                                                    </Typography>
                                                    <Typography>
                                                        Username: Angie123
                                                    </Typography>
                                                </CardContent>
                                        </CardActionArea>
                                        <CardActions>
                                            <Button size="small" color="secondary">Remove this friend</Button>
                                        </CardActions>
                                    </Card>
                                </Grid>
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

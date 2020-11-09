import React from "react";
import "./styles.css";
import {Link, withRouter} from "react-router-dom";
import Header from "../Header";
import "./styles.css"
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import PlaceRoundedIcon from '@material-ui/icons/PlaceRounded';
import ListItemText from "@material-ui/core/ListItemText";

import IconButton from "@material-ui/core/IconButton";
import Drawer from "@material-ui/core/Drawer";

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import {Avatar} from "@material-ui/core";

import TodayIcon from '@material-ui/icons/Today';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {ChevronRight} from "@material-ui/icons";
import MapRoundedIcon from '@material-ui/icons/MapRounded';
import QuestionAnswerRoundedIcon from '@material-ui/icons/QuestionAnswerRounded';
import PeopleAltRoundedIcon from '@material-ui/icons/PeopleAltRounded';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import Tooltip from "@material-ui/core/Tooltip";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import CommentsBlock from 'simple-react-comments';
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";

//get this from database server
const commentsData = [{  avatarUrl: `${process.env.PUBLIC_URL}/SearchPics/profilePic1.jpeg`,
    authorUrl: "/user",
    fullName: "Adam Smith",
    createdAt: new Date(),
    text: "Do you guys want to go with me",},
    {  avatarUrl: `${process.env.PUBLIC_URL}/SearchPics/profilePic2.jpeg`,
        authorUrl: "/user",
        fullName: "Kate Park",
        createdAt: new Date(),
        text: "Let's do it!",},
    {  avatarUrl: `${process.env.PUBLIC_URL}/SearchPics/profilePic3.jpg`,
        authorUrl: "/user",
        fullName: "Andrew Johnson",
        createdAt: new Date(),
        text: "When?",},
]

class Itinerary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            //itinerary object
            itinerary: props.itinerary[0],
            //list of dictionaries
            friendsList: props.friendsList,

            drawerIsOpen: false,
            leftDrawerIsOpen:false,

            comments: commentsData,
            openComment:false
        };
    }

    handleDrawerOpen = () => {
        this.setState({ drawerIsOpen: true });
    };

    handleDrawerClose = () => {
        this.setState({ drawerIsOpen: false });
    };

    handleLeftDrawerOpen = () => {
        this.setState({ leftDrawerIsOpen: true });
    };

    handleLeftDrawerClose = () => {
        this.setState({ leftDrawerIsOpen: false });
    };

    handleOpenComments=() => {
        this.setState({openComment:true});
    }
    handleCloseComments = () => {
        this.setState({openComment:false});
    };


    render() {
        // const userKeys = Object.keys(this.state.itinerary) //["id", "name", "starting", "ending", "destinations", "startDate"]
        return (

            <div className={"backgroundContainer"}>
                <Header/>

                <BottomNavigation
                    className={"navigationBar"}
                    showLabels
                >
                    {/*<BottomNavigationAction className={"navButtons"}  label="FRIENDS" icon={<PeopleAltRoundedIcon />} />*/}
                    <BottomNavigationAction className={"navButtons"} onClick={this.handleOpenComments} label="COMMENTS" icon={<QuestionAnswerRoundedIcon />} />
                    <BottomNavigationAction className={"navButtons"} onClick={this.handleDrawerOpen} label="ITINERARY" icon={<MapRoundedIcon />} />
                </BottomNavigation>

                <Drawer
                    className={"rightDrawer"}
                    classes={{
                        paper: "drawerPaper",
                    }}
                    onBackdropClick={this.handleDrawerClose}
                    open={this.state.drawerIsOpen}
                    anchor={"right"}
                >
                    <div className={"drawerHeader"}
                         onKeyDown={this.handleDrawerClose}>
                        <Tooltip title={"CLOSE"}>

                        <IconButton className={"exitDrawerButton"} onClick={this.handleDrawerClose}>
                            <ChevronRight/>
                        </IconButton>
                        </Tooltip>

                        <Tooltip title={"Edit Itinerary"}>
                            <Link to={{pathname:`/user/edit-itinerary/${this.state.itinerary["id"]}`}}>
                                <IconButton className={"editDrawerButton"}>
                                    <EditRoundedIcon fontSize={"medium"}/>
                                </IconButton>
                            </Link>

                        </Tooltip>

                    <h1 className={"ItineraryName__h1"}>{this.state.itinerary["name"]}</h1>
                    </div>
                    <Divider />
                    <div className={"drawerInner"}>
                        <List>
                            <ListItem >
                                <ListItemIcon><TodayIcon /></ListItemIcon>
                                <ListItemText>{this.state.itinerary["startDate"]}</ListItemText>
                            </ListItem>
                                <ListItem button onClick={this.handleLeftDrawerOpen}>
                                    <ListItemIcon><HomeRoundedIcon /></ListItemIcon>
                                    <ListItemText>{this.state.itinerary["starting"]}</ListItemText>
                                </ListItem>
                        </List>
                        <Divider/>
                        <List>
                            {this.state.itinerary["destinations"].map((d) => (
                                <ListItem button onClick={this.handleLeftDrawerOpen} key={d}>
                                    <ListItemIcon><MoreVertIcon/></ListItemIcon>
                                    <ListItemText primary={d["address"]} />
                                </ListItem>
                            ))}
                        </List>
                        <Divider/>
                        <List>

                            <ListItem button onClick={this.handleLeftDrawerOpen}>
                                <ListItemIcon><PlaceRoundedIcon /></ListItemIcon>
                                <ListItemText>{this.state.itinerary["ending"]}</ListItemText>
                            </ListItem>
                        </List>
                    </div>
                </Drawer>
{/*///////////////////////////////////////////REVIEWS DRAWER///////////////////////////////////////////////////////*/}
                <Drawer
                    className={"leftDrawer"}
                    classes={{
                        paper: "leftDrawerPaper",
                    }}
                    onBackdropClick={this.handleLeftDrawerClose}
                    open={this.state.leftDrawerIsOpen}
                    anchor={"left"}
                >
                    <div className={"drawerHeader"}
                         onKeyDown={this.handleDrawerClose}>
                        <Tooltip title={"CLOSE"}>

                            <IconButton className={"exitLeftDrawerButton"} onClick={this.handleLeftDrawerClose}>
                                <ChevronLeftIcon/>
                            </IconButton>
                        </Tooltip>

                        <h1 className={"reviews__h1"}>Google Reviews</h1>
                    </div>
                    <Divider variant={"fullWidth"}/>
                    <div className={"drawerInner"}>
                        <List>
                            <ListItem>
                                {/*Get reviews from Google Api*/}
                                <ListItemIcon><Avatar /></ListItemIcon>
                                <ListItemText>"Fantastic View ,Food ,Service , Great Family outing location"</ListItemText>
                            </ListItem>
                            <ListItem>
                                <ListItemIcon><Avatar /></ListItemIcon>
                                <ListItemText>"A great tourist attraction that is a must if you're in the area. Spectacular views that can only be seen from the tower. I would definitely recommend going at sunset or just afterwards."
                                    </ListItemText>
                            </ListItem>
                        </List>

                    </div>
                </Drawer>


                <Dialog onClose={this.handleCloseComments} open={this.state.openComment}>
                    <DialogContent >
                        <CommentsBlock
                            comments={this.state.comments}
                            signinUrl={'/login'}
                            isLoggedIn
                            // set to true if you are using react-router
                            onSubmit={text => {
                                if (text.length > 0) {
                                    this.setState({
                                        comments: [
                                            ...this.state.comments,
                                            {
                                                authorUrl: '/user',
                                                avatarUrl: `${process.env.PUBLIC_URL}/SearchPics/profilePic1.jpeg`,
                                                createdAt: new Date(),
                                                fullName: 'Adam Smith',
                                                text,
                                            },
                                        ],
                                    });
                                    console.log('submit:', text);
                                }
                            }}
                        />
                    </DialogContent>
                </Dialog>
            </div>

        );
    };

}

export default withRouter((Itinerary));

import React from 'react'
import { withRouter, Switch, Route } from 'react-router-dom'
import User from "../User";
import UserSettings from "../UserSettings";
import CreateItinerary from "../CreateItinerary";
import ItinerariesRoute from "../ItinerariesRoute";
import EditItineraryRoute from "../EditItineraryRoute";


//Below are two hardcoded items to fill the state arrays. In the full release, the server should populate the arrays
// and these should be removed
const hardCodedItinerary = {id: 0,
    name:"Beach Trip",
    starting:"Adam's home, Toronto",
    ending:'Centre Island Beach, Toronto',
    destinations: [{address:"123 Address St."}, {address:"24 Donald St."}],
    startDate:'August 12, 2020'
}

const hardCodedFriend = {userId:1,
    name: "Kate Park",
    currLocation: "Montreal",
    username: "KateP"
}

class UserRoutes extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            //get these information from server
            userInfo: {name: "Adam Smith",
                source: "./../SearchPics/profilePic1.jpeg",
                email: "adam.smith@email.com",
                password: "user",
                location: "123 Address St."},


            //The below lists should be populated by the server (e.g. itineraryList: <itineraryList that is on the server>)
            itineraryList:[hardCodedItinerary],
            friendsList:[hardCodedFriend]
        };
        this.handleCreateItinerary = this.handleCreateItinerary.bind(this);
        this.handleUpdateItinerary = this.handleUpdateItinerary.bind(this);
    }

    handleCreateItinerary(itineraryObj){
        let itineraryList = this.state.itineraryList;
        itineraryList.push(itineraryObj);
        this.setState({itineraryList})

    }

    handleUpdateItinerary(itineraryObj){
        const filterItineraries = this.state.itineraryList.filter(s => {
            //remove previous version of itinerary
            return s["id"] != itineraryObj["id"];
        });
        //add new version
        filterItineraries.push(itineraryObj)
        this.setState({itineraryList: filterItineraries})
        console.log(this.state.itineraryList)
    }

    render() {
        return(
            <Switch>
                <Route exact path={`${this.props.match.path}`} render={()=><User appState={this.state}/>}/>
                <Route path={`${this.props.match.path}/settings`} render={ () => <UserSettings
                    name={this.state.userInfo.name}
                    source={this.state.userInfo.source}
                    email={this.state.userInfo.email}
                    password={this.state.userInfo.password}
                    location={this.state.userInfo.location}
                />}/>
                <Route path={`${this.props.match.path}/create-itinerary`} render={() =>
                    (<CreateItinerary appState={this.state} location={this.props.location} handleSubmit={this.handleCreateItinerary}/>)}/>
                <Route path = {`${this.props.match.path}/itinerary/:id`} render = {(props) =>
                    <ItinerariesRoute {...props} itineraries={this.state.itineraryList} friendsList={this.state.friendsList}/>
                }/>
                <Route path = {`${this.props.match.path}/edit-itinerary/:id`} render = {(props) =>
                    <EditItineraryRoute {...props} location={this.props.location} itineraries={this.state.itineraryList} handleSubmit={this.handleUpdateItinerary}/>
                }/>
            </Switch>
        );
    };
}

export default withRouter(UserRoutes)
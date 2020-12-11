import React from 'react'
import { withRouter, Switch, Route } from 'react-router-dom'
import User from "../User";
import UserSettings from "../UserSettings";
import CreateItinerary from "../CreateItinerary";
import ItinerariesRoute from "../ItinerariesRoute";
import EditItineraryRoute from "../EditItineraryRoute";
import { getUsers } from '../../actions/user';
import { getSpecificUserItineraryList } from '../../actions/itinerary';

//Below are two hardcoded items to fill the state arrays. In the full release, the server should populate the arrays
// and these should be removed


const hardCodedFriend = {userId:1,
    name: "Kate Park",
    currLocation: "Montreal",
    username: "KateP"
}

class UserRoutes extends React.Component {
    constructor(props){
        super(props);
        this.props.history.push("/user");
        this.state = {
            //get these information from server
            userInfo: {name: "",
                source: "./../SearchPics/profilePic1.jpeg",
                email: "",
                password: "",
                location: ""
            },


            //The below lists should be populated by the server (e.g. itineraryList: <itineraryList that is on the server>)
            itineraryList:[],
            friendsList:[hardCodedFriend],
            loaded: false
        };
        this.handleCreateItinerary = this.handleCreateItinerary.bind(this);
        this.handleUpdateItinerary = this.handleUpdateItinerary.bind(this);
    }

    handleCreateItinerary(){
        //TODO: get list of itineraries
        //TODO: get specific itinerary
        /*let itineraryList = this.state.itineraryList;
        itineraryList.push(itineraryObj);
        this.setState({itineraryList})*/
        getSpecificUserItineraryList(this)
        console.log("itinerary list")
        console.log(this.state.itineraryList);

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

    componentDidMount(){
            //load once only in the beginning
            console.log("hello!")
            console.log(!this.state.itineraryList)
            console.log(this.state.itineraryList)
            if (this.state.itineraryList) {
                console.log(!this.state.itineraryList)
                getSpecificUserItineraryList(this)
                console.log("itinerary list")
                console.log(this.state.itineraryList);
                this.setState({loaded:true})
            }

    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevState.itineraryList !== this.state.itineraryList){
            //this.props.history.push("/user")
            console.log(prevState.itineraryList + " 1111 " + this.state.itineraryList)
        }
    }

    render() {
        const { history, app } = this.props;

        if(this.state.userInfo.name === ""){
            console.log(app.state.currentUser)
            console.log(`${this.props.match.path}`)
        }
        return(

            <Switch>
                <Route exact path={`${this.props.match.path}`} render={(props)=><User {...props} app={app} appState={this.state}/>}/>
                <Route path={`${this.props.match.path}/settings`} render={ () => <UserSettings
                    name={this.state.userInfo.name}
                    source={this.state.userInfo.source}
                    email={this.state.userInfo.email}
                    password={this.state.userInfo.password}
                    location={this.state.userInfo.location}
                />}/>
                <Route path={`${this.props.match.path}/create-itinerary`} render={() =>
                    (<CreateItinerary appState={this.state} location={this.props.location} handleSubmit={this.handleCreateItinerary}/>)}/>
                <Route path = {[`${this.props.match.path}/itinerary/:id`, '/user/itinerary/:id']} render = {(props) =>
                    <ItinerariesRoute {...props} itineraries={this.state.itineraryList} friendsList={this.state.friendsList}/>
                }/>
                {/*TODO: fix edit-itinerary!*/}
                <Route path = {`${this.props.match.path}/edit-itinerary/:id`} render = {(props) =>
                    <EditItineraryRoute {...props} location={this.props.location} itineraries={this.state.itineraryList} handleSubmit={this.handleUpdateItinerary}/>
                }/>
            </Switch>
        );
    };
}

export default withRouter(UserRoutes)
import React from 'react'
import { withRouter, BrowserRouter, Switch, Route } from 'react-router-dom'
import User from "../User";
import UserSettings from "../UserSettings";
import CreateItinerary from "../CreateItinerary";

class UserRoutes extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            name: "Adam Smith",
            source: "./../SearchPics/profilePic1.jpeg",
            email: "adam.smith@email.com",
            password: "user",
            location: "123 Address St."
        };
    }


    render() {
        console.log(this.state)

        return(
            <Switch>

                <Route exact path={`${this.props.match.path}`} render={()=><User appState={this.state}/>}/>
                <Route path={`${this.props.match.path}/settings`} render={ () => <UserSettings
                    name={this.state.name}
                    source={this.state.source}
                    email={this.state.email}
                    password={this.state.password}
                    location={this.state.location}
                />}/>
{/*                    <UserSettings name={this.state.name}/>
                </Route>*/}
                <Route path={`${this.props.match.path}/create-itinerary`} render={() =>
                    (<CreateItinerary appState={this.state}/>)}/>
            </Switch>
        );
    };
}

/*class UserRoutes extends React.Component {

    state = {
        name: "Adam Smith",
        avatar: "./User/static/avatar.jpg",
        email: "adam.smith@email.com",
        password: "user",
        location: "123 "
    };
    //implement authentication... only allow logged in user here


}*/

export default withRouter(UserRoutes)
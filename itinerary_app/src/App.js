import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import './App.css';

import Home from './react-components/Home';
import Login from './react-components/Login';
import Signup from './react-components/Signup';
import Search from './react-components/Search';
import PlaceSearch from './react-components/PlaceSearch';
import About from './react-components/About';
import UserRoutes from "./react-components/UserRoutes";
import Admin from './react-components/Admin';
import User from './react-components/User';
import OtherUser from './react-components/OtherUser';

import { checkSession } from "./actions/user";


class App extends React.Component {
 
  constructor(props) {
      super(props);
  }
  state = {
    initialState: "Itinerary", //probably going to change this later
    currentUser: null
  }


  render(){
    const { currentUser } = this.state;
    return(
      <div>
        {<BrowserRouter>
          <Switch>
            <Route exact path='/' render={props =>
              (
                <div >
                  { /* If logged in, continue to user page, else stay on login page */}
                  {!currentUser ? <Home {...props} app={this} /> : <User {...props} app={this} />}
                </div>        
              )}/>
            <Route exact path='/login' render={props => (
              <div >
                { /* If logged in, continue to user page, else stay on login page */}
                {!currentUser ? <Login {...props} app={this} /> : <User {...props} app={this} />}
              </div>        
            )}/>
            <Route exact path='/signup' render={() => 
              (<Signup appState={this.state}/>)}/>
            <Route exact path='/about' render={() =>
                (<About appState={this.state}/>)}/>
            <Route exact path='/search' render={() =>
              (<Search appState={this.state}/>)}/>
            <Route exact path='/search-places' render={() =>
              (<PlaceSearch appState={this.state}/>)}/>
            <Route exact path='/admin' render={() =>
              (<Admin appState={this.state}/>)}/>
            <Route path='/user' render={props => (
              <div >
                { /* If logged in, continue to user page, else stay on login page */}
                {!currentUser ? <Login {...props} app={this} /> : <UserRoutes {...props} app={this} />}
              </div>        
            )}/>
            <Route exact path='/user2' render={() =>
              (<OtherUser appState={this.state}/>)}/>
          </Switch>
        </BrowserRouter>}
      </div>
    );
  }
}

export default App;

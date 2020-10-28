import React from 'react';
import logo from './logo.svg';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import './App.css';

import Home from './react-components/Home';
import Login from './react-components/Login';
import Signup from './react-components/Signup';
import Search from './react-components/Search';
import About from './react-components/About';

class App extends React.Component {
  state = {
    initialState: "Itinerary" //probably going to change this later
  }

  render(){
    return(
      <div>
        {<BrowserRouter>
          <Switch>
            <Route exact path='/' render={() => 
              (<Home appState={this.state}/>)}/>
            <Route exact path='/login' render={() => 
              (<Login appState={this.state}/>)}/>
            <Route exact path='/signup' render={() => 
              (<Signup appState={this.state}/>)}/>
            <Route exact path='/about' render={() =>
                (<About appState={this.state}/>)}/>
            <Route exact path='/search' render={() =>
              (<Search appState={this.state}/>)}/>
          </Switch>
        </BrowserRouter>}
      </div>
    );
  }
}

export default App;

import logo from './logo.svg';
import {Route, Switch, BrowserRouter} from 'react-router-dom';
import './App.css';

import Home from './react-components/Home';
import Login from './react-components/Login';
import Signup from './react-components/Signup';

class App extends React.Component {
  state = {
    initialState: "Itinerary" //probably going to change this later
  }

  render(){
    return(
      <div>
        <BrowserRouter>
          <Switch>
            <Route exact path='/' render={() => 
              (<Home appState={this.state}/>)}/>
            <Route exact path='/login' render={() => 
              (<Login appState={this.state}/>)}/>
            <Route exact path='/signup' render={() => 
              (<Signup appState={this.state}/>)}/>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;

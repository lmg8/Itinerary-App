import React from "react";
import { Link } from "react-router-dom";
import Header from '../Header';
import PeopleCard from '../PeopleCard';
import { Grid, TextField, Box, Button } from '@material-ui/core';
import './styles.css'; 
import { getUsers } from "../../actions/user";

class Search extends React.Component {
  componentDidMount() {
    getUsers(this);
  }

  // Allows us to keep track of changing data in this component.
  state = { 
    SearchValue: '',
    filteredUsers: [],
    userList: []
  };

  // Updates a specified state variable to the event target value
  handleChange = stateVar => event => {
    this.setState({
      [stateVar]: event.target.value,
    });
  };

  // Stores filtered users in state based on user input when enter is pressed in the search bar
  handleKeyDown = stateVar => event => {
    if (event.keyCode === 13){
      this.setState({
        [stateVar]: event.target.value
      });

      getUsers(this);

      let newFilteredUsers = this.state.userList.filter(
        user => user.firstName.toUpperCase().includes(this.state.SearchValue.toUpperCase()) 
        || user.lastName.toUpperCase().includes(this.state.SearchValue.toUpperCase()));
        
      this.setState({
        filteredUsers: newFilteredUsers
      });
    }
  }

  // Returns cards displaying user information
  renderPeopleCards = users => {
    let userCards = [];
    // there would be a database query for users here
    for (let i = 0; i < users.length; i++){
      userCards.push(<PeopleCard
        user={users[i]}
        >
        </PeopleCard>)
    }
    return (userCards);
  }

  render() {
    return (
      <div className="search-background-image center">
        <Grid container>
          <Header />
          <Grid xs="false" sm={1}></Grid>
          <Grid container xs={12} sm={10}>
            <Grid item xs={4}>
              <Box mt={3} ml={3}>
                <TextField
                label="Search" 
                variant="filled" 
                fullWidth
                value={this.state.SearchValue} 
                onChange={this.handleChange("SearchValue")}
                onKeyDown={this.handleKeyDown("SearchValue")}
                />
              </Box>
            </Grid>
            <Grid container xs={12} sm={10}>
              <Box mt={1} ml={3}>
                <Link>
                  <Button className="searchButton" variant="contained" color="primary">PEOPLE</Button>
                </Link>
              </Box>
              <Box mt={1} ml={1}>
                <Link to={"../search-places"}>
                  <Button className="searchButton" variant="contained" color="primary">PLACES</Button>
                </Link>
              </Box>
            </Grid>
            <Grid container xs={12} sm={10}>
              <Box mx={3} mt={3}>
                <Grid item xs={12}>
                    <h1 className="searchHeader">Search Results</h1>
                </Grid>
              </Box>
            </Grid>
            {this.renderPeopleCards(this.state.filteredUsers)}
          </Grid>
          <Grid xs="false" sm={1}></Grid>
        </Grid>
      </div>
    );
  }
}

export default Search;
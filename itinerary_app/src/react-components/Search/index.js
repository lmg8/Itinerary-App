import React from "react";
import { Link } from "react-router-dom";
import Header from '../Header';
import PeopleCard from '../PeopleCard';
import { Container, Grid, TextField, Box, Button, FormControl } from '@material-ui/core';
import './styles.css'; 

class Search extends React.Component {
// Allows us to keep track of changing data in this component.
  state = { 
    SearchValue: '', 
    filteredUsers: [],
    users: [
      { 
        firstName: "James", 
        lastName: "Naismith", 
        profilePic:"./SearchPics/profilePic1.jpeg", 
        location: "Toronto", 
        quote:"“You only live once, but if you do it right, once is enough.”",
        banner:"./SearchPics/banner1.jpg" },
      { 
        firstName: "Kate", 
        lastName: "Park", 
        profilePic: "./SearchPics/profilePic2.jpeg",
        location: "Montreal",
        quote: "“Laugh, even when you feel too sick or too worn out or tired.”",
        banner: "./SearchPics/banner2.jpg" },
      { 
        firstName: "Andrew", 
        lastName: "Johnson", 
        profilePic: "./SearchPics/profilePic3.jpg",
        location: "Seattle",
        quote: "“Hello, nice to meet you.”",
        banner: "./SearchPics/banner3.jpg" 
      },
      { 
        firstName: "Andrew", 
        lastName: "Johnson", 
        profilePic: "./SearchPics/profilePic3.jpg",
        location: "Seattle",
        quote: "“Hello, nice to meet you.”",
        banner: "./SearchPics/banner3.jpg" 
      }]
  };

  handleChange = stateVar => event => {
    this.setState({
      [stateVar]: event.target.value,
    });
  };

  handleKeyDown = stateVar => event => {
    if (event.keyCode === 13){
      this.setState({
        [stateVar]: event.target.value
      });
      let newFilteredUsers = this.state.users.filter(
        user => user.firstName.toUpperCase().includes(this.state.SearchValue.toUpperCase()) 
        || user.lastName.toUpperCase().includes(this.state.SearchValue.toUpperCase()));
      this.setState({
        filteredUsers: newFilteredUsers
      });
      console.log(newFilteredUsers);
    }
  }

  renderPeopleCards = users => {
    let userCards = [];
    // there would be a database query for users here
    for (let i = 0; i < users.length; i++){
      userCards.push(<PeopleCard
        firstName={users[i].firstName}
        lastName={users[i].lastName}
        profilePic={users[i].profilePic}
        location={users[i].location}
        quote={users[i].quote}
        banner={users[i].banner}>
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
             
              <Grid container xs={12}>
                <Grid item xs={12}>
                    <h1 className="searchHeader">Search Results</h1>
                </Grid>
              </Grid>
              <Grid container>
                  {this.renderPeopleCards(this.state.filteredUsers)}
              </Grid>
            </Grid>
          <Grid xs="false" sm={1}></Grid>
        </Grid>
      </div>
    );
  }
}

export default Search;
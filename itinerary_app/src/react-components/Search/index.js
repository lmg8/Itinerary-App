import React from "react";
import Header from '../Header';
import SearchCard from '../SearchCard';
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
          banner:"./SearchPics/banner1.jpg"
      },
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
          banner: "./SearchPics/banner3.jpg" }
      ],
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
      let filteredUsers = this.state.users.filter(
        user => user.firstName.toUpperCase().includes(this.state.SearchValue.toUpperCase()) 
        || user.lastName.toUpperCase().includes(this.state.SearchValue.toUpperCase()));
      this.state.filteredUsers = filteredUsers;
      console.log(filteredUsers);
    }
  }

  renderPeopleCards = users => {
    let userCards = [];
    for (let i = 0; i < users.length; i++){
      userCards.push(<SearchCard 
        firstName={users[i].firstName}
        lastName={users[i].lastName}
        profilePic={users[i].profilePic}
        location={users[i].location}
        quote={users[i].quote}
        banner={users[i].banner}>
        </SearchCard>)
    }
    return userCards;
  }

  render() {
    return (
      <div className="search-background-image center">
        <Grid container>
          <Header />
          <Grid xs="false" sm={1}></Grid>
            <Grid container item xs={12} sm={10}>
              <Grid xs={6}>
                <Container>
                  <FormControl>
                    <TextField className="search-bar" 
                    id="search-box" 
                    label="Search" 
                    variant="outlined" 
                    fullWidth 
                    value={this.state.SearchValue} 
                    onChange={this.handleChange("SearchValue")}
                    onKeyDown={this.handleKeyDown("SearchValue")}
                    />
                  </FormControl>
                </Container>
              </Grid>
              <Grid xs={12}>
                <Container>
                  <Box mt={2}>
                      <Button variant="contained" color="primary">PEOPLE</Button>
                      <Button variant="contained" color="primary">PLACES</Button>
                  </Box>
                </Container>
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
import React from "react";
import { Link } from "react-router-dom";
import Header from '../Header';
import SearchCard from '../SearchCard';
import { Container, Grid, TextField, Box, Button, FormControl } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import './styles.css'; 

class Search extends React.Component {
// Allows us to keep track of changing data in this component.
  state = { 
    SearchValue: '',
    selectedIndex: -2,
    filteredPlaces: [],
    Places: ["CN Tower", "First Canadian Place", "The St. Regis Toronto", "Scotia Plaza", "Aura", "TD Canada Trust Tower"]
  };

  setSelectedIndex = (index) => {
    this.setState({
      selectedIndex: index,
    })
  }

  handleListItemClick = index => event => {
    this.setSelectedIndex(index);
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

      let newFilteredPlaces = this.state.Places.filter(
        place => place.toUpperCase().includes(this.state.SearchValue.toUpperCase()));
      
      this.setState({
        filteredPlaces: newFilteredPlaces
      });
    }
  }

  renderPlaceList = places => {
    let listItems = [];
    // there would be a database query for users here
    for (let i = 0; i < places.length; i++){
      listItems.push(<ListItem>
        <ListItemText 
        button 
        primary={places[i]}
        selected={this.state.selectedIndex === i}
        onClick={this.handleListItemClick(i)} />
      </ListItem>)
    }
    return listItems;
  }

  render() {
    return (
      <div className="search-places-background-image center">
        <Grid container>
          <Header />
          <Grid xs="false" sm={1}></Grid>
            <Grid container item xs={12} sm={10}>
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
                <Box mt={1} ml={3} mr={1}>
                  <Link to={"../Search"}>
                    <Button className="searchButton" variant="contained" color="primary">PEOPLE</Button>
                  </Link>
                </Box>
                <Box mt={1} ml={1} mr={1}>
                    <Button className="searchButton" variant="contained" color="primary">PLACES</Button>
                </Box>
              </Grid>
              
              <Grid container>
                <Box m={3}>
                  <List className="placeList">
                    {this.renderPlaceList(this.state.filteredPlaces)}
                  </List>
                </Box>
              </Grid>
            </Grid>
          <Grid xs="false" sm={1}></Grid>
        </Grid>
      </div>
    );
  }
}

export default Search;
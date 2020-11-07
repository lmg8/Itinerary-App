import React from "react";
import { Link } from "react-router-dom";
import Header from '../Header';
import PlaceCard from '../PlaceCard';
import { Grid, TextField, Box, Button } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import StreetviewIcon from '@material-ui/icons/Streetview';
import AddBoxIcon from '@material-ui/icons/AddBox';
import './styles.css'; 

class PlaceSearch extends React.Component {
// Allows us to keep track of changing data in this component.
  state = { 
    SearchValue: '',
    selectedIndex: -1,
    filteredPlaces: [],
    Places: [
      {
      name: "CN Tower",
      address: "290 Bremner Blvd, Toronto, ON M5V 3L9",
      banner: "./SearchPics/banner1.jpg"
    },
    {
      name: "First Canadian Place",
      address: "100 King St W, Toronto, ON M5X 1A9",
      banner: "./SearchPics/banner2.jpg"
    },
    {
      name: "The St. Regis Toronto",
      address: "325 Bay St, Toronto, ON M5H 4G3",
      banner: "./SearchPics/banner3.jpg"
    },
    {
      name: "Scotia Plaza",
      address: "40 King Street West",
      banner: "./SearchPics/banner1.jpg"
    },
    {
      name: "Aura",
      address: "386 Yonge St",
      banner: "./SearchPics/banner2.jpg"
    },
    {
      name: "TD Canada Trust Tower",
      address: "161 and 181 Bay Street",
      banner: "./SearchPics/banner3.jpg"
    }
  ]
  };

  handleListItemClick = index => event => {
    this.setState({
      selectedIndex: index,
    })
    console.log(this.state.selectedIndex);
  };

  handleChange = stateVar => event => {
    this.setState({
      [stateVar]: event.target.value,
    });
  };

  handleViewClick = index => event => {
    this.setState({
      selectedIndex: index,
    });
    console.log(this.state.selectedIndex);
  }

  handleKeyDown = stateVar => event => {
    if (event.keyCode === 13){
      this.setState({
        [stateVar]: event.target.value
      });

      let newFilteredPlaces = this.state.Places.filter(
        place => place.name.toUpperCase().includes(this.state.SearchValue.toUpperCase()));
      
      this.setState({
        filteredPlaces: newFilteredPlaces
      });
    }
  }

  renderPlaceCard = () => {
    if (this.state.selectedIndex != -1){
      return (<PlaceCard place={this.state.filteredPlaces[this.state.selectedIndex]}
        ></PlaceCard>
        )
    }
  }

  renderPlaceList = places => {
    let listItems = [];
    // there would be a database query for places here
    for (let i = 0; i < places.length; i++){
      listItems.push(<ListItem>
        <ListItemText 
        button 
        primary={places[i].name}
        selected={this.state.selectedIndex === i}
        onClick={this.handleListItemClick(i)} />
        <Button
        variant="contained"
        color="primary"
        className="placeListButton"
        startIcon={<StreetviewIcon />}
        onClick={this.handleViewClick(i)}
        >
        View
        </Button>
        <Button
        variant="contained"
        color="secondary"
        className="placeListButton"
        startIcon={<AddBoxIcon />}
        >
        Add to Itinerary
        </Button>
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
                <Box mt={1} ml={3}>
                  <Link to={"../search"}>
                    <Button className="searchButton" variant="contained" color="primary">PEOPLE</Button>
                  </Link>
                </Box>
                <Box mt={1} ml={1}>
                    <Button className="searchButton" variant="contained" color="primary">PLACES</Button>
                </Box>
              </Grid>
              
              
              <Grid container xs={12} sm={10}>
                
              <Box m={3}>
                <Grid item xs={4}>
                    <List className="placeList">
                      {this.renderPlaceList(this.state.filteredPlaces)}
                    </List>
                </Grid>
              </Box>
                
                <Grid item xs={6}>
                  <Box m={3}>
                    {this.renderPlaceCard(this.state.filteredPlaces[this.state.selectedIndex])}
                  </Box>
                </Grid>
              </Grid>
                
            </Grid>
          <Grid xs="false" sm={1}></Grid>
        </Grid>
      </div>
    );
  }
}

export default PlaceSearch;
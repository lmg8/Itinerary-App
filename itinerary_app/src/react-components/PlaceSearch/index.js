import React from "react";
import { Link } from "react-router-dom";
import Header from '../Header';
import SearchCard from '../SearchCard';
import { Container, Grid, TextField, Box, Button, FormControl, Card } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import StreetviewIcon from '@material-ui/icons/Streetview';
import AddBoxIcon from '@material-ui/icons/AddBox';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import './styles.css'; 

class Search extends React.Component {
// Allows us to keep track of changing data in this component.
  state = { 
    SearchValue: '',
    selectedIndex: -1,
    filteredPlaces: [],
    Places: ["CN Tower", "First Canadian Place", "The St. Regis Toronto", "Scotia Plaza", "Aura", "TD Canada Trust Tower"]
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
        place => place.toUpperCase().includes(this.state.SearchValue.toUpperCase()));
      
      this.setState({
        filteredPlaces: newFilteredPlaces
      });
    }
  }

  renderPlaceCard = () => {
    return (
    <Card>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="place"
          height="140"
          image="./SearchPics/banner1.jpg"
          title="place"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {this.state.filteredPlaces[this.state.selectedIndex]}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {this.state.filteredPlaces[this.state.selectedIndex]}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions>
    </Card>)
  }

  renderPlaceList = places => {
    let listItems = [];
    // there would be a database query for places here
    for (let i = 0; i < places.length; i++){
      listItems.push(<ListItem>
        <ListItemText 
        button 
        primary={places[i]}
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
                  <Link to={"../Search"}>
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

export default Search;
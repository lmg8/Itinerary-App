import { Typography } from "@material-ui/core";
import React from "react";

import Header from '../Header';
import SearchCard from '../SearchCard';
import { Grid, TextField, Box, Button } from '@material-ui/core';

class Search extends React.Component {
// Allows us to keep track of changing data in this component.
  state = {
    users: [
        { firstName: "James", lastName: "Naismith", course: "./2.png" },
        { firstName: "Kate", lastName: "Park", profilePic: "./1.png" }
      ]
  };

  render() {
    return (
      <div className="App">
        <Grid item container>
            <Header></Header>
            <Grid xs={0} sm={1}></Grid>
            <Grid container xs={12} sm={10} spacing={1}>
                <Grid container xs={12}>
                    <TextField id="outlined-basic" label="Outlined" variant="outlined" />
                </Grid>
                <Grid item xs={12} sm={3}>
                    <SearchCard firstName="James" lastName="Naismith" profilePic="1.png" location="Toronto"/>
                </Grid>
                {/* <Grid item xs={12} sm={4}>
                    <SearchCard />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <SearchCard />
                </Grid> */}
            </Grid>
            <Grid xs={0} sm={1}></Grid>
        </Grid>
      </div>
    );
  }
}

export default Search;

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Avatar, Box, Card, CardActions, CardActionArea, CardContent, CardHeader, CardMedia, Button, IconButton, Typography, Grid} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import './styles.css';

const AdminItineraryCard = props => {
    const {itinerary, deleteOnClick} = props;

    return (
    <Grid item xs={6}>
        <Card className="itineraryCard">
            <Grid container xs={12}>
                <Grid item xs={12}>
                    <CardActionArea>
                        <CardMedia
                        className="bannerPicture"
                        height="200"
                        component="img"
                        image={itinerary.banner}
                        title={itinerary.title}
                        />
                    </CardActionArea>
                </Grid>
                <Grid item direction="column" xs={8}>
                    <CardContent>
                        <Typography className="titleText" gutterBottom variant="h5">
                            {itinerary.title}
                        </Typography>
                        <Typography className="dayText" variant="overline">
                            {itinerary.day + " | " +  itinerary.timeOfDay}
                        </Typography>
                    </CardContent>
                </Grid>
                <Grid container direction="column" xs={4}>
                    <Grid className="cardButton" item>
                        <Button  fullWidth variant="outlined" color="primary">
                            View Comments
                        </Button>
                    </Grid>
                    <Grid className="cardButton" item>
                        <Button fullWidth variant="outlined" color="primary">
                            View Reviews
                        </Button>
                    </Grid>
                    <Grid className="cardButton" item> 
                        <Button fullWidth variant="contained" startIcon={<DeleteIcon />} color="secondary" onClick={deleteOnClick(itinerary.itineraryID)}>
                            Delete
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </Card>
    </Grid>
    );
};

export default AdminItineraryCard;
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Avatar, Card, CardActions, CardContent, CardHeader, CardMedia, Button, IconButton, Typography} from '@material-ui/core';
import ShareIcon from '@material-ui/icons/Share';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const useStyles = makeStyles({
  root: {
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const SearchCard = props => {
    const classes = useStyles();
    const {firstName, lastName, profilePic, location} = props;
    return (
    <Card variant="outlined">
        <CardHeader
            avatar={
            <Avatar src={profilePic} />
            }
            action={
            <IconButton aria-label="settings">
                <MoreVertIcon />
            </IconButton>
            }
            title={firstName + " " + lastName}
            subheader={location}
      />
      <CardMedia
        style={{height: "150px"}}
        className={classes.media}
        image="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Sunset_Toronto_Skyline_Panorama_Crop_from_Snake_Island.jpg/1040px-Sunset_Toronto_Skyline_Panorama_Crop_from_Snake_Island.jpg"
        title="Toronto"
      />
      <CardContent>
        <Typography variant="body2" component="p">
            “You only live once, but if you do it right, once is enough.”
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">View</Button>
      </CardActions>
    </Card>
    );
};

export default SearchCard;
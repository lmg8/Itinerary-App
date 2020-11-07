import React from 'react';
import { Button, Card } from '@material-ui/core';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const PlaceCard = props => {
    const {place} = props;
    return (<Card>
        <CardActionArea>
          <CardMedia
            component="img"
            alt="place"
            height="140"
            image={place.banner}
            title="place"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {place.name}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {place.address}
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
      </Card>
    );
};

export default PlaceCard;
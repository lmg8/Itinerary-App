import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Avatar, Box, Card, CardActions, CardContent, CardHeader, CardMedia, Button, IconButton, Typography, Grid} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { Link } from "react-router-dom";
import './styles.css';

const AdminUserCard = props => {
    const {user, deleteOnClick} = props;

    return (<Grid item xs={4}>
                <Card className variant="outlined" className="userCard" border={5}>
                    <CardContent>
                        {/* Delete Button */}
                        <Grid container xs={12}>
                            <Grid item xs={1}></Grid>
                            <Grid className="deleteButtonContainer" item xs={10} onClick={deleteOnClick(user.userID)}>
                                <Button fullWidth startIcon={<DeleteIcon />} variant="contained" color="secondary">
                                    Delete
                                </Button>
                            </Grid>
                            <Grid item xs={1}></Grid>
                            {/* Profile Picture */}
                            <Grid item xs={2}></Grid>
                            <Grid item xs={8}>
                                <CardMedia 
                                    className="profilePicture"
                                    height="200"
                                    component="img"
                                    image={user.profilePic}
                                    title={user.firstName + " " + user.lastName}
                                    border={5}
                                />
                            </Grid>
                            <Grid item xs={2}></Grid>
                            {/* Name */}
                            <Grid item xs={12}>
                                <Typography className="nameText" align="center" variant="h5">
                                    {user.firstName + " " + user.lastName}
                                </Typography>
                            </Grid>
                            {/* Location */}
                            <Grid className="locationText" item xs={12}>
                                <Typography  align ="center" variant="overline" color="textSecondary" display="block">
                                    {user.location}
                                </Typography>
                            </Grid>
                            {/* Buttons */}
                            <Grid item xs={6}>
                                <Link to="../User">
                                    <Button fullWidth variant="outlined">View</Button>
                                </Link>
                            </Grid>
                            <Grid item xs={6}>
                                <Button fullWidth variant="outlined">Add</Button>
                            </Grid>

                        </Grid>
                    </CardContent>
                    
                </Card>
            </Grid>
    );
};

export default AdminUserCard;
import React from "react";
import TextField from "@material-ui/core/TextField";
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import {IconButton} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Tooltip from "@material-ui/core/Tooltip";
import GoogleMaps from "../CreateItinerary/search";

const removeDestination = (itinerary, index) => {
    let i = itinerary.state.itinerary
    const list = [...itinerary.state.itinerary["waypoints"]];
    list.splice(index, 1);
    i["waypoints"] = list;
    itinerary.setState({
       i
    });
}

class NewDestination extends React.Component
{

    render()
    {
        const {handleChange, itinerary, index} = this.props;
        return(
            <div>
                <Grid container  alignItems="center" spacing={0}>
                     <Grid item xs={11} >
                         <GoogleMaps
                             inputAddress={handleChange}
                             prompt={"Choose destination..."}
                         />
                     </Grid>
                    <Grid item xs={1}>
                        <Tooltip title="Remove" arrow>
                            <IconButton
                                onClick={
                                    () => removeDestination(itinerary, index)
                                }>
                                <DeleteRoundedIcon color={"secondary"} fontSize={"small"}

                                />
                            </IconButton>
                        </Tooltip>

                    </Grid>
                </Grid>

            </div>

        )

    }

}

export default NewDestination;
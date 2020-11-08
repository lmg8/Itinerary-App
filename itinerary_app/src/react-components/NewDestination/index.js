import React from "react";
import TextField from "@material-ui/core/TextField";
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import {IconButton} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Tooltip from "@material-ui/core/Tooltip";

const removeDestination = (itinerary, index) => {
    const list = [...itinerary.state.destinations];
    list.splice(index, 1);
    itinerary.setState({
       destinations: list
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
                        <TextField
                            //accept only addresses
                            //use google api to get autocomplete address
                            placeholder="Choose destination..."
                            fullWidth
                            margin="normal"
                            onChange={handleChange}
                            InputLabelProps={{
                                shrink: true,
                            }}
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
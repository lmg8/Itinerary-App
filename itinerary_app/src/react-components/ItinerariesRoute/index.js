import React from 'react'
import { withRouter} from 'react-router-dom'
import Itinerary from "../Itinerary";

class ItinerariesRoute extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            itineraries: props.itineraries,
            friendsList: props.friendsList,
        };
    }


    render() {
        const filterItineraries = this.state.itineraries.filter(s => {
            return s["id"] == this.props.match.params.id;
        });
        return(
            <Itinerary itinerary={filterItineraries} friendsList={this.state.friendsList}/>
        );
    };
}

export default withRouter(ItinerariesRoute);
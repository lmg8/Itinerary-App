import React from 'react'
import { withRouter} from 'react-router-dom'
import EditItinerary from "../EditItinerary";

class EditItineraryRoute extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            itineraries: props.itineraries,
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(itineraryObj){
        this.props.handleSubmit(itineraryObj);
    }

    render() {
        console.log(this.state)
        const filterItineraries = this.state.itineraries.filter(s => {
            return s["id"] == this.props.match.params.id;
        });
        return(
            <EditItinerary itinerary={filterItineraries} handleSubmit={this.handleSubmit}/>
        );
    };
}

export default withRouter(EditItineraryRoute);
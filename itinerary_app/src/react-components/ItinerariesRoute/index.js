import React from 'react'
import { withRouter} from 'react-router-dom'
import Itinerary from "../Itinerary";
import {getSpecificItinerary, getSpecificUserItineraryList} from "../../actions/itinerary"
/* global google */



class ItinerariesRoute extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            itineraries: props.itineraries,
            friendsList: props.friendsList,
            loaded: false
        };

        this.filterItinerary = null;
    }

    componentDidMount() {
        getSpecificUserItineraryList(this)
    }

    componentDidUpdate (prevProps, prevState) {
        const oldI = prevProps.itineraries;
        const newI = this.props.itineraries;
        if (oldI !== newI) {
            this.setState({loaded: true})
            console.log("!!!!!itinerary list")
            console.log(this.props.itineraryList);
            this.filterItinerary = this.props.itineraries.filter(s => {
                console.log(s._id + " " + this.props.match.params.id)
                return s["_id"].toString() == this.props.match.params.id;
            })[0];
        }

    }


    render() {

        //console.log(this.state.itineraries)
        console.log("filterItineraryId")
        console.log(this.filterItinerary);
        return(
            (this.state.loaded ? <Itinerary itinerary={this.filterItinerary} friendsList={this.state.friendsList}/> : null)
        );
    };
}

export default withRouter(ItinerariesRoute);
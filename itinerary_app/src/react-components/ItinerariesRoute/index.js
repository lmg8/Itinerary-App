import React from 'react'
import { withRouter} from 'react-router-dom'
import Itinerary from "../Itinerary";
import {getSpecificItinerary, getSpecificUserItineraryList} from "../../actions/itinerary"

function loadScript(src, position, id) {
    if (!position) {
        return;
    }

    const script = document.createElement('script');
    script.setAttribute('async', '');
    script.setAttribute('id', id);
    script.src = src;
    position.appendChild(script);
}


class ItinerariesRoute extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            itineraryList: [],
            itinerary: null,
            friendsList: [], //TODO: action get friends list
            loaded: false
        };


    }

    componentDidMount() {
        if (this.state.itinerary===null) {
            getSpecificItinerary(this, this.props.match.params.id)
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevState.itinerary != this.state.itinerary) {
            this.setState({loaded:true})
        }
    }


    render() {
        /*console.log("itineraries route")
        console.log(this.state.itinerary)
        console.log(this.state.loaded)*/
        return(
            (this.state.loaded ? <Itinerary itinerary={this.state.itinerary} friendsList={this.state.friendsList}/> : null)
        );
    };
}

export default withRouter(ItinerariesRoute);
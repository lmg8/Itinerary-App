import React from 'react'
import { withRouter} from 'react-router-dom'
import Itinerary from "../Itinerary";
import {
    getItineraryRouteInfo
} from "../../actions/itinerary"

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
            creator: null,
            friendsList: [], //TODO: action get friends list
            loaded: false
        };


    }

    async componentDidMount() {
        if (this.state.itinerary===null) {
            //await getSpecificItinerary(this, this.props.match.params.id)
            await getItineraryRouteInfo(this, this.props.match.params.id)
            this.myRef = React.createRef()
            if (typeof window !== 'undefined' && !this.myRef.current) {
                if (!document.querySelector('#google-maps')) {
                    loadScript(
                        `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_API_KEY}&libraries=places`,
                        document.querySelector('head'),
                        'google-maps',
                    );
                }
                this.myRef.current = true;
            }
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
            (this.state.loaded ? <Itinerary itinerary={this.state.itinerary} creator={this.state.creator}/> : null)
        );
    };
}

export default withRouter(ItinerariesRoute);
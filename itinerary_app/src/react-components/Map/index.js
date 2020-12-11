//https://stackoverflow.com/questions/55424790/how-i-draw-a-route-with-react-google-maps-component
import React from "react";
import {
    withGoogleMap,
    withScriptjs,
    GoogleMap,
    DirectionsRenderer
} from "react-google-maps";
/* global google */

//const MapLoader = withScriptjs(Map);
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

class Map extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            directions: null,
            hasFetched: false, //prevents re-rendering if state not changed
            //TODO: store waypoint order to be used for reordering destinations
            waypoint_order: [0],
            //TODO: check if already optimized. If not, optimize. If already optimized, store so don't have to reoptimize and save the order of waypoints
            isOptimized: false, //get from props?
            loaded: false //check if data is fetched from google api
        };

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

    async componentDidMount() {
        if(this.myRef.current){
            const directionsService = await new window.google.maps.DirectionsService();
            const origin =  {placeId: this.props.itinerary.source.place_id};
            const destination = {placeId: this.props.itinerary.destination.place_id};
            const waypoints =[];

            for(let i = 0; i <  (this.props.itinerary.waypoints).length; i++){
                waypoints.push({"stopover":true,"location": {"placeId":this.props.itinerary.waypoints[i].place_id}})
            }
            await directionsService.route(
                {
                    origin: origin,
                    destination: destination,
                    waypoints: waypoints,
                    optimizeWaypoints: (waypoints.length > 1) ? true : false, //only optimize route if more than 1 waypoints
                    travelMode: window.google.maps.TravelMode.DRIVING,
                    drivingOptions: {departureTime: new Date(this.props.itinerary.startDate)}
                },
                (result, status) => {
                    if (status === window.google.maps.DirectionsStatus.OK) {
                        if(waypoints.length > 1){
                            this.setState({
                                waypoint_order: result.routes[0].waypoint_order,
                                loaded:true,
                                directions: result,
                                hasFetched:true,
                                isOptimized: true
                            });
                        } else {
                            this.setState({
                                loaded:true,
                                directions: result,
                                hasFetched:true,
                                isOptimized: true
                            })
                        }

                    } else {
                        console.error(`error fetching directions ${result}`);
                    }
                }
            );

        } else {
            alert("could not load script");
        }

    }

    shouldComponentUpdate(nextProps, nextState) {
        if ( this.state.hasFetched ) {
            return false;
        }
        return true;
    }

    content(){
        const GoogleMapExample = withGoogleMap(props => (
            <GoogleMap
                //defaultCenter={{ lat: 40.756795, lng: -73.954298 }}
                defaultZoom={13}
            >
                <DirectionsRenderer
                    directions={this.state.directions}
                />
            </GoogleMap>
        ));
        // console.log(this.state.directions)
        // console.log(this.state.waypoint_order)
        return (
            <div>
                <GoogleMapExample
                    containerElement={<div style={{ height: `100vh`, width: "100%", position:"absolute"}} />}
                    mapElement={<div style={{ height: `100vh` }} />}
                />
            </div>
        );
    }

    render() {
        /*if(this.state.loaded){
            console.log(this.state.waypoint_order)
        }*/
        return (
            <div>
                {this.state.loaded ? this.content() : null}
            </div>
        );
    }
}

export default Map;

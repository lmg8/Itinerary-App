// Functions to help with itinerary actions.

import { Redirect } from "react-router-dom";


// A function to send a GET request to the web server,
// gets all itineraries
export const getItineraries = (page) => {
    // the URL for the request
    const url = "/api/itineraries";

    // Since this is a GET request, simply call fetch on the URL
    fetch(url)
        .then(res => {
            if (res.status === 200) {
                // return a promise that resolves with the JSON body
                return res.json();
            } else {
                alert("Could not get itineraries");
            }
        })
        .then(json => {
            // the resolved promise with the JSON body
            page.setState({ itineraries: json });
        })
        .catch(error => {
            console.log(error);
        });
};


// A function to send a GET request to the web server,
// and then loop through them and add a list element for each itinerary
export const getSpecificItinerary = (page,itineraryID) => {
    // the URL for the request
    const url = `/api/itineraries/${itineraryID}`;

    // Since this is a GET request, simply call fetch on the URL
    fetch(url)
        .then(res => {
            if (res.status === 200) {
                // console.log(res.clone().json()); // debugging
                // return a promise that resolves with the JSON body
                return res.json();
            } else {
                alert("Could not get itineraries");
            }
        })
        .then(json => {
            // the resolved promise with the JSON body
            page.setState(json);

        })
        .catch(error => {
            console.log(error);
        });
};

// A function to send a POST request to the web server with new itinerary,
export const createItinerary = (creationComp, createItinComp) => {
    const request = new Request("/api/itineraries", {
        method: "post",
        body: JSON.stringify(creationComp.state),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });



    // Send the request with fetch()
    fetch(request)
        .then(res => {

            if (res.status === 200) {
                const request2 = new Request(`/api/users/${res.creator}`, {
                    method: "patch",
                    body: JSON.stringify([
                        { "op": "add", "path": "/itineraries/-", "value": res._id }
                    ]),
                    headers: {
                        Accept: "application/json, text/plain, */*",
                        "Content-Type": "application/json"
                    }
                });
                //update user itinerary list
                fetch(request2)
                    .catch(() =>{
                        alert("Error: Could not add itinerary to user profile")
                    })
                createItinComp.setState({id: res._id})
            }
        })
        .catch(() => {
            alert("Error: Could not add itinerary")
        });
};
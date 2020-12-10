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

// A function to send a DELETE request to the web server
// deletes an itinerary by ID
export const deleteItinerary = (itineraryID, app) => {
    const request = new Request(`/api/itineraries/${itineraryID}`, {
        method: "delete",
       // body: JSON.stringify({userID: userID}),
       // headers: {
         //   Accept: "application/json, text/plain, */*",
        //    "Content-Type": "application/json"
        //}
    });
    // Send the request with fetch()
    fetch(request)
        .then(res => {
            if (res.status === 200) {
                return res.json();
            }
        })
        .then()
        .catch(error => {
            alert("Error deleting itinerary")
        });
};
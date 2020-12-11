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
    .then()
    .catch(error => {
        alert("Error deleting user")
    });
};
export const getSpecificUserItineraryList = (page) => {
    const url = `/api/user/itineraries`;

    // Since this is a GET request, simply call fetch on the URL
    fetch(url)
        .then(res => {
            if (res.status === 200) {
                return res.json();
            }
        })
        .then(json => {
            // the resolved promise with the JSON body
            /*console.log("json")
            console.log(json)*/
            page.setState({ itineraryList: json});
        })
        .catch(error => {
            console.log(error)
            alert("Could not get user itineraries list");
        });
}

// A function to send a GET request to the web server,
// and then loop through them and add a list element for each itinerary
export const getSpecificItinerary = (page, itineraryId) => {
    // the URL for the request
    const url = `/api/itineraries/${itineraryId}`;

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
            page.setState({ itinerary: json});
         })
        .catch(error => {
            console.log(error);
        });
};

/*const itin = async(creationComp) => {
    const request = new Request("/api/itineraries", {
        method: "post",
        body: JSON.stringify(creationComp.state.itinerary),
        headers: {
            Accept: "application/json, text/plain, *!/!*",
            "Content-Type": "application/json"
        }
    });
    //console.log(creationComp.state.itinerary)
    const json = await fetch(request);
    return json.json();
}

const saveItin = async(json)=> {
    const request2 = await new Request(`/api/users/${json.creator}/itineraries`, {
        method: "PATCH",
        body: JSON.stringify(
            {"value": json._id.valueOf()}
        ),
        headers: {
            Accept: "application/json, text/plain, *!/!*",
            "Content-Type": "application/json"
        }
    });
    const res = await fetch(request2);
}*/

// A function to send a POST request to the web server with new itinerary,
export const createItinerary = (creationComp) => {
/*    const json = await itin(creationComp);
    console.log(json)
    const res = await saveItin(json);

    creationComp.setState({id: json._id.valueOf()})*/

    // Send the request with fetch()

    const request = new Request("/api/itineraries", {
        method: "post",
        body: JSON.stringify(creationComp.state.itinerary),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });

    fetch(request)
        .then(res => {
            if (res.status === 200) {
                //creationComp.setState({id: res.json()._id.valueOf()})
                return res.json()
            }
            else {
                alert("create itinerary request failed!");
            }
        }).then( res => {
                creationComp.setState({id: res._id.valueOf()})
                return res;
        }
    )
        .then(json => {
            const request2 = new Request(`/api/users/${json.creator}/itineraries`, {
                method: "PATCH",
                body: JSON.stringify(
                    {"value": json._id.valueOf()}
                ),
                headers: {
                    Accept: "application/json, text/plain, */*",
                    "Content-Type": "application/json"
                }
            });
            //update user itinerary list
/*            const itinerary =  creationComp.state.itinerary;
            itinerary["id"]= json._id.valueOf();
            console.log("action")
            console.log(itinerary)
            creationComp.setState({itinerary: itinerary});*/
            fetch(request2)
                .catch((error) =>{
                    alert("Error: Could not add itinerary to user profile")
                });

        })
        .catch((error) => {
            console.log(error)
            alert("Error: Could not add itinerary")
        })
};
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

export const getItinerariesFromUser = (userID, page) => {
    const url = `/api/user/${userID}/itineraries`;
    console.log(userID);
    // Since this is a GET request, simply call fetch on the URL
    fetch(url)
        .then(res => {
            if (res.status === 200) {
                return res.json();
            }
        })
        .then(json => {
            console.log(`this is the current itinerary list ${json}`)
            // the resolved promise with the JSON body
            page.setState({ itineraryList: json});
        })
        .catch(error => {
            console.log(error)
            alert("Could not get user itineraries list");
        });
}

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

// A function to send a POST request to the web server with new itinerary,
export const createItinerary = (creationComp) => {
    const request = new Request("/api/itineraries", {
        method: "POST",
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

export const UpdateItineraryComments = (commentsData, itineraryId, page) => {


    const request = new Request(`/api/itineraries/${itineraryId}/comments`, {
        method: "PATCH",
        body: JSON.stringify(
            {"value": commentsData }
        ),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });
    // Send the request with fetch()
    fetch(request)
        .then(res => {
            if (res.status === 200) {
                return res.json();
            }
        })
        .then (res => {
            const comments = res.commentsData;
            comments.forEach( task => task.createdAt = new Date(task.createdAt));
            console.log(comments)
            page.setState({comments: comments})
        })
        .catch(error => {
            console.log(error)
            alert("Error updating comments.")
        });
};

//for itinerariesRoute to get information of itinerary. userId = owner of itinerary
export const getUserOfItinerary = (page,userId) => {
    // the URL for the request
    const url = `/api/users/${userId}`;
    console.log("getUserOfItinerary")
    console.log(page)
    console.log(userId)

    // Since this is a GET request, simply call fetch on the URL
    fetch(url)
        .then(res => {
            if (res.status === 200) {
                // console.log(res.clone().json()); // debugging
                // return a promise that resolves with the JSON body
                return res.json();
            } else {
                alert("Could not get users");
            }
        })
        .then(json => {
            // the resolved promise with the JSON body
            page.setState({ creator: json });

        })
        .catch(error => {
            console.log(error);
        });
};

// getSpecificItinerary and then getUserofItinerary
export const getItineraryRouteInfo = (page, itineraryId) => {
    const url = `/api/itineraries/${itineraryId}`;

    // Since this is a GET request, simply call fetch on the URL
    fetch(url)
        .then(res => {
            if (res.status === 200) {
                //get itinerary info from itineraryId
                return res.json();
            } else {
                alert("Could not get itineraries");
            }
        })
        .then(json => {
            page.setState({ itinerary: json});
            return json;
        }).then(json => {


            const url2 = `/api/users/${json.creator.valueOf()}`;
            fetch(url2)
                .then(res => {
                    if (res.status === 200) {
                        //get user info from creator of itinerary
                        return res.json();
                    } else {
                        alert("Could not get users");
                    }
                })
                .then(json => {
                    page.setState({ creator: json });
                })

    })
        .catch(error => {
            console.log(error);
        });
};
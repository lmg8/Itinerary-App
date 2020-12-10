// Functions to help with user actions.

import { Redirect } from "react-router-dom";

// Send a request to check if a user is logged in through the session cookie
export const checkSession = (app) => {
    const url = "/users/check-session";

    fetch(url)
        .then(res => {
            if (res.status === 200) {
                return res.json();
            }
        })
        .then(json => {
            if (json && json.currentUser) {
                app.setState({ currentUser: json.currentUser });
            }
        })
        .catch(error => {
            console.log(error);
        });
};

// A functon to update the login form state
export const updateLoginForm = (loginComp, field) => {
    const value = field.value;
    const name = field.name;

    loginComp.setState({
        [name]: value
    });
};

// A functon to update the user creation form state
export const updateCreationForm = (creationComp, field) => {
    const value = field.value;
    const name = field.name;

    creationComp.setState({
        [name]: value
    });
};


// A function to send a POST request with the user to be logged in
export const login = (loginComp, app) => {
    // Create our request constructor with all the parameters we need
    const request = new Request("/users/login", {
        method: "post",
        body: JSON.stringify(loginComp.state),
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
        .then(json => {
            if (json.currentUser !== undefined) {
                app.setState({ currentUser: json.currentUser });
                if (json.currentUser === "admin"){
                    app.setState({ adminStatus: true});
                }
            }
        })
        .catch(error => {
            alert("Incorrect username or password")
        });
};

// A function to send a GET request to logout the current user
export const logout = (app) => {
    const url = "/users/logout";
    fetch(url)
        .then(res => {
            app.setState({
                currentUser: null,
                message: { type: "", body: "" }
            });
        })
        .catch(error => {
            console.log(error);
        });
};

// A function to send a GET request to the web server,
// and then loop through them and add a list element for each user
export const getUsers = (page) => {
    // the URL for the request
    const url = "/api/users";

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
            page.setState({ userList: json });
        })
        .catch(error => {
            console.log(error);
        });
};

// A function to send a GET request to the web server,
// and then loop through them and add a list element for each user
export const getSpecificUser = (page,userId) => {
    // the URL for the request
    const url = `/api/users/${userId}`;

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
            page.setState({ username: json.username });
            page.setState({ firstName: json.firstName });
            page.setState({ lastName: json.lastName });
            page.setState({ userId: json._id });
            if (json.adminStatus === true){
                page.setState({ adminStatus: json.adminStatus})
            }

        })
        .catch(error => {
            console.log(error);
        });
};

// A function to send a POST request to the web server,
// and then loop through them and add a list element for each user
export const createUser = (creationComp, app) => {
    const request = new Request("/api/users", {
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
                return res.json();
            }
        })
        .then(json => {
            if (json.currentUser !== undefined) {
                app.setState({ currentUser: json.currentUser });
            }
        })
        .catch(error => {
            alert("Error creating account. Please pick a unique username")
        });
};

export const addFriend = (friendUserId,currUserId,app) => {
    const request = new Request(`/api/users/${currUserId}`, {
        method: "patch",
        body: JSON.stringify([
            { "op": "replace", "path": "/friends", "value": [friendUserId] }
          ]),
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
        .catch(error => {
            alert("Error updating friends list.")
        });
};

// A function to send a DELETE request to the web server
export const deleteUser = (userID, app) => {
    console.log(userID);
    const request = new Request(`/api/users/${userID}`, {
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
            alert("Error deleting user")
        });
};
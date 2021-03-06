/* server.js for react-express-authentication */
"use strict";
const log = console.log;

const express = require('express');
// starting the express server
const app = express();
const path = require('path')

// mongoose and mongo connection
const { mongoose } = require("./db/mongoose");
mongoose.set('useFindAndModify', false); // for some deprecation issues

// import the mongoose models
const { Itinerary } = require("./models/itinerary");
const { User } = require("./models/user");

// to validate object IDs
const { ObjectID } = require("mongodb");

// body-parser: middleware for parsing HTTP JSON body into a usable object
const bodyParser = require("body-parser");
app.use(bodyParser.json());

// express-session for managing user sessions
const session = require("express-session");
app.use(bodyParser.urlencoded({ extended: true }));


function isMongoError(error) { // checks for first error returned by promise rejection if Mongo database suddently disconnects
    return typeof error === 'object' && error !== null && error.name === "MongoNetworkError"
}

// middleware for mongo connection error for routes that need it
const mongoChecker = (req, res, next) => {
    // check mongoose connection established.
    if (mongoose.connection.readyState != 1) {
        log('Issue with mongoose connection')
        res.status(500).send('Internal server error')
        return;
    } else {
        next()  
    }   
}

// Middleware for authentication of resources
const authenticate = (req, res, next) => {
    if (req.session.user) {
        User.findById(req.session.user).then((user) => {
            if (!user) {
                return Promise.reject()
            } else {
                req.user = user
                next()
            }
        }).catch((error) => {
            res.status(401).send("Unauthorized")
        })
    } else {
        res.status(401).send("Unauthorized")
    }
}


/*** Session handling **************************************/
// Create a session and session cookie
app.use(
    session({
        secret: "our hardcoded secret",
        resave: false,
        saveUninitialized: false,
        cookie: {
            expires: 60000,
            httpOnly: true
        }
    })
);

// A route to login and create a session
app.post("/users/login", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    // Use the static method on the User model to find a user
    // by their username and password
    User.findByUsernamePassword(username, password)
        .then(user => {
            // Add the user's id to the session.
            // We can check later if this exists to ensure we are logged in.
            req.session.user = user._id;
            req.session.username = user.username; // we will later send the username to the browser when checking if someone is logged in through GET /check-session (we will display it on the frontend dashboard. You could however also just send a boolean flag).
            res.send({ currentUser: user.username });

        })
        .catch(error => {
            res.status(400).send()
        });
});

// A route to logout a user
app.get("/users/logout", (req, res) => {
    // Remove the session
    req.session.destroy(error => {
        if (error) {
            res.status(500).send(error);
        } else {
            res.send()
        }
    });
});

// A route to check if a user is logged in on the session
app.get("/users/check-session", (req, res) => {
    if (req.session.user) {
        res.send({ currentUser: req.session.username });
    } else {
        res.status(401).send();
    }
});

/*********************************************************/

/*** API Routes below ************************************/
// User API Route
app.post('/api/users', mongoChecker, async (req, res) => {
    log(req.body)

    // Create a new user
    const user = new User({
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        adminStatus: req.body.adminStatus,
        friends: req.body.friends
    })

    try {
        // Save the user
        const newUser = await user.save()
        res.send(newUser)
    } catch (error) {
        if (isMongoError(error)) { // check for if mongo server suddenly disconnected before this request.
            res.status(500).send('Internal server error')
        } else {
            log(error)
            res.status(400).send('Bad Request') // bad request for changing the itinerary.
        }
    }
})

/** Itinerary resource routes **/
// a POST route to *create* a itinerary
app.post('/api/itineraries', mongoChecker, authenticate, async (req, res)=> {
    log(`Adding itinerary ${req.body.name}, created by user ${req.user._id}`)

    // Create a new itinerary using the Itinerary mongoose model
    const itinerary = new Itinerary({
        name: req.body.name,
        startDate: req.body.startDate,
        source: req.body.source,
        destination: req.body.destination,
        waypoints: req.body.waypoints,
        creator: req.user._id // creator id from the authenticate middleware
    })


    // Save itinerary to the database
    // async-await version:
    try {
        const result = await itinerary.save()
        res.send(result)
    } catch(error) {
        log(error) // log server error to the console, not to the client.
        if (isMongoError(error)) { // check for if mongo server suddenly disconnected before this request.
            res.status(500).send('Internal server error')
        } else {
            res.status(400).send('Bad Request') // 400 for bad request gets sent to client.
        }
    }
})

// a GET route to get all itineraries
app.get('/api/itineraries', mongoChecker, async (req, res) => {

    // Get the itineraries
    try {
        const itineraries = await Itinerary.find()
        res.send(itineraries) // can wrap itineraries in object if want to add more properties
    } catch(error) {
        log(error)
        res.status(500).send("Internal Server Error")
    }
})

// a GET route to get all itineraries for specific user
app.get('/api/user/:id/itineraries', mongoChecker, async (req, res) => {

    const id = req.params.id
    if (!ObjectID.isValid(id)) {
        res.status(404).send()
        return;  // so that we don't run the rest of the handler.
    }

    // check mongoose connection established.
    if (mongoose.connection.readyState != 1) {
        log('Issue with mongoose connection')
        res.status(500).send('Internal server error')
        return;
    }
    // Get the users
    try {
        const itineraries = await Itinerary.find({creator: id})
        if (!itineraries) {
            res.status(404).send('Resource not found')
        } else {
            res.send(itineraries)
        }
    } catch(error) {
        log(error)
        res.status(500).send("Internal Server Error")
    }
})

// a GET route to get all friends from a specific user
app.get('/api/users/:id/friends', mongoChecker, async (req, res) => {

    const id = req.params.id
    if (!ObjectID.isValid(id)) {
        res.status(404).send()
        return;  // so that we don't run the rest of the handler.
    }

    // check mongoose connection established.
    if (mongoose.connection.readyState != 1) {
        log('Issue with mongoose connection')
        res.status(500).send('Internal server error')
        return;
    }
    // get friendsList
    try {
        // get user
        const user = await User.findById(id);
        if (!user) {
            res.status(404).send('Resource not found')
        } else {
            // get friends from user's friendlist
            const friends = await User.find({ _id: { "$in" : user.friends} });
            res.send(friends);
        }
    } catch(error) {
        log(error)
        res.status(500).send("Internal Server Error")
    }
})

// a GET route to get specific friend from a specific user
app.get('/api/users/:id/friends/:friendid', mongoChecker, async (req, res) => {

    const id = req.params.id
    const friendid = req.params.friendid

    if (!ObjectID.isValid(id)) {
        res.status(404).send()
        return;  // so that we don't run the rest of the handler.
    }

    if (!ObjectID.isValid(friendid)) {
        res.status(404).send()
        return;  // so that we don't run the rest of the handler.
    }

    // check mongoose connection established.
    if (mongoose.connection.readyState != 1) {
        log('Issue with mongoose connection')
        res.status(500).send('Internal server error')
        return;
    }
    // get friendsList
    try {
        // get user
        const user = await User.findById(id);
        if (!user) {
            res.status(404).send('Resource not found')
        } else {
            // get friends from user's friendlist
            const friends = await User.find({ _id: { "$in" : user.friends} });
            for(let i = 0; i < friends.length; i++){
                if(friends[i]._id == friendid){
                    res.send(friends[i]);
                }
            }
        }
    } catch(error) {
        log(error)
        res.status(500).send("Internal Server Error")
    }
})

// a GET route to get all favourites from a specific user
app.get('/api/users/:id/favourites', mongoChecker, async (req, res) => {

    const id = req.params.id
    if (!ObjectID.isValid(id)) {
        res.status(404).send()
        return;  // so that we don't run the rest of the handler.
    }

    // check mongoose connection established.
    if (mongoose.connection.readyState != 1) {
        log('Issue with mongoose connection')
        res.status(500).send('Internal server error')
        return;
    }
    try {
        // get user
        const user = await User.findById(id);
        if (!user) {
            res.status(404).send('Resource not found')
        } else {
            // itineraries in user's favourites list
            const favouriteItineraries = await Itinerary.find({ _id: { "$in" : user.favourites} });
            res.send(favouriteItineraries);
        }
    } catch(error) {
        log(error)
        res.status(500).send("Internal Server Error")
    }
})

// a GET route to get all itineraries for current user
app.get('/api/user/itineraries', mongoChecker, authenticate, async (req, res) => {

    // Get the users
    try {
        const itineraryList = await Itinerary.find({creator: req.user._id})
        if (!itineraryList) {
            res.status(404).send('Resource not found')
        } else {
            res.send(itineraryList)

        }
    } catch(error) {
        log(error)
        res.status(500).send("Internal Server Error")
    }
})

// a GET route to get specific itinerary
app.get('/api/itineraries/:id', mongoChecker, async (req, res) => {
    const id = req.params.id

/*
    if (!ObjectID.isValid(id)) {
        res.status(404).send()
        return;  // so that we don't run the rest of the handler.
    }
*/

    // check mongoose connection established.
    if (mongoose.connection.readyState != 1) {
        log('Issue with mongoose connection')
        res.status(500).send('Internal server error')
        return;
    }
    // Get the itinerary
    try {
        const itinerary = await Itinerary.findById({_id: id})
        if (!itinerary) {
            res.status(404).send('Resource not found')
        } else {
            res.send(itinerary)
        }
    } catch (error) {
        log(error)
        if (isMongoError(error)) { // check for if mongo server suddenly disonnected before this request.
            res.status(500).send('Internal server error')
        } else {
            res.status(400).send('Bad Request') // bad request for changing the user.
        }
    }
})

// a GET route to get all users
app.get('/api/users', mongoChecker, async (req, res) => {

    // Get the users
    try {
        const users = await User.find()
        res.send(users)
    } catch(error) {
        log(error)
        res.status(500).send("Internal Server Error")
    }
})

// a GET route to get specific users
app.get('/api/users/:id', mongoChecker, async (req, res) => {
	const id = req.params.id
    if (!ObjectID.isValid(id)) {
		res.status(404).send()
		return;  // so that we don't run the rest of the handler.
	}

	// check mongoose connection established.
	if (mongoose.connection.readyState != 1) {
		log('Issue with mongoose connection')
		res.status(500).send('Internal server error')
		return;
	}
    // Get the users
    try {
		const user = await User.findById({_id: id})
		if (!user) {
			res.status(404).send('Resource not found')
		} else {   
			res.send(user)
		}
	} catch (error) {
		log(error)
		if (isMongoError(error)) { // check for if mongo server suddenly disonnected before this request.
			res.status(500).send('Internal server error')
		} else {
			res.status(400).send('Bad Request') // bad request for changing the user.
		}
    }
})

app.patch('/api/users/:id', async (req, res) => {
	const id = req.params.id

	if (!ObjectID.isValid(id)) {
		res.status(404).send()
		return;  // so that we don't run the rest of the handler.
	}

	// check mongoose connection established.
	if (mongoose.connection.readyState != 1) {
		log('Issue with mongoose connection')
		res.status(500).send('Internal server error')
		return;
	}

	// Find the fields to update and their values.
	const fieldsToUpdate = {}
	req.body.map((change) => {
		const propertyToChange = change.path.substr(1) // getting rid of the '/' character
		fieldsToUpdate[propertyToChange] = change.value
	})

	// Update the user by their id.
	try {
		const user = await User.findOneAndUpdate({_id: id}, {$set: fieldsToUpdate}, {new: true, useFindAndModify: false})
		if (!user) {
			res.status(404).send('Resource not found')
		} else {
			res.send(user)
		}
	} catch (error) {
		log(error)
		if (isMongoError(error)) { // check for if mongo server suddenly disonnected before this request.
			res.status(500).send('Internal server error')
		} else {
            log(error)
			res.status(400).send('Bad Request') // bad request for changing the user.
		}
    }
});

//add itinerary to user
app.patch('/api/users/:id/itineraries', async (req, res) => {
    const id = req.params.id

    if (!ObjectID.isValid(id)) {
        res.status(404).send()
        return;  // so that we don't run the rest of the handler.
    }

    // check mongoose connection established.
    if (mongoose.connection.readyState != 1) {
        log('Issue with mongoose connection')
        res.status(500).send('Internal server error')
        return;
    }

    // Update the user by their id.
    try {
        const user = await User.findOneAndUpdate({_id: id}, {$push: {itineraries: req.body.value} }, {new: true, useFindAndModify: false})
        if (!user) {
            res.status(404).send('Resource not found')
        } else {
            res.send(user)
        }

    } catch (error) {
        log(error)
        if (isMongoError(error)) { // check for if mongo server suddenly disonnected before this request.
            res.status(500).send('Internal server error')
        } else {
            res.status(400).send('Bad Request') // bad request for changing the user.
        }
    }
});

//update favourites to user
app.patch('/api/users/:id/favourites', async (req, res) => {
    const id = req.params.id

    if (!ObjectID.isValid(id)) {
        res.status(404).send()
        return;  // so that we don't run the rest of the handler.
    }

    // check mongoose connection established.
    if (mongoose.connection.readyState != 1) {
        log('Issue with mongoose connection')
        res.status(500).send('Internal server error')
        return;
    }

    console.log(req)
    // Update the user by their id.
    try {
        const user = await User.findOneAndUpdate({_id: id}, {$push: {itineraries: req.body.value} }, {new: true, useFindAndModify: false})
        if (!user) {
            res.status(404).send('Resource not found')
        } else {
            res.send(user)
        }

    } catch (error) {
        log(error)
        if (isMongoError(error)) { // check for if mongo server suddenly disonnected before this request.
            res.status(500).send('Internal server error')
        } else {
            res.status(400).send('Bad Request') // bad request for changing the user.
        }
    }
});

//update itineraries data - specifically for comments
app.patch('/api/itineraries/:id/comments', async (req, res) => {
    const id = req.params.id

    if (!ObjectID.isValid(id)) {
        res.status(404).send()
        return;  // so that we don't run the rest of the handler.
    }

    // check mongoose connection established.
    if (mongoose.connection.readyState != 1) {
        log('Issue with mongoose connection')
        res.status(500).send('Internal server error')
        return;
    }

    // Update the itinerary by their id.
    try {
        const itinerary = await Itinerary.findOneAndUpdate({_id: id}, {$push: {commentsData: req.body.value}}, {new: true, useFindAndModify: false})
        if (!itinerary) {
            res.status(404).send('Resource not found')
        } else {
            res.send(itinerary)
        }
    } catch (error) {
        if (isMongoError(error)) { // check for if mongo server suddenly disonnected before this request.
            res.status(500).send('Internal server error')
        } else {
            res.status(400).send('Bad Request') // bad request for changing the user.
        }
    }
});

//Delete a user
app.delete('/api/users/:id', async (req, res) => {
	const id = req.params.id

	if (!ObjectID.isValid(id)) {
		res.status(404).send()
		return;  // so that we don't run the rest of the handler.
	}

	// check mongoose connection established.
	if (mongoose.connection.readyState != 1) {
		log('Issue with mongoose connection')
		res.status(500).send('Internal server error')
		return;
	}

	// find user and delete them from the database
	try {
		const user = await User.findOneAndDelete({_id: id}, {useFindAndModify: false})
		if (!user) {
			res.status(404).send('User not found')
		} else {   
			res.send(user)
		}
	} catch (error) {
		log(error)
		if (isMongoError(error)) { // check for if mongo server suddenly disonnected before this request.
			res.status(500).send('Internal server error')
		} else {
			res.status(400).send('Bad Request') // bad request for deleting the user.
		}
    }
});

//Delete an itinerary
app.delete('/api/itineraries/:id', async (req, res) => {
	const id = req.params.id
    console.log(id);
	if (!ObjectID.isValid(id)) {
		res.status(404).send()
		return;  // so that we don't run the rest of the handler.
	}

	// check mongoose connection established.
	if (mongoose.connection.readyState != 1) {
		log('Issue with mongoose connection')
		res.status(500).send('Internal server error')
		return;
	}

	// find itinerary and delete it from the database
	try {
		const itinerary = await Itinerary.findOneAndDelete({_id: id}, {useFindAndModify: false})
		if (!itinerary) {
			res.status(404).send('Itinerary not found')
		} else {   
			res.send(itinerary)
		}
	} catch (error) {
		log(error)
		if (isMongoError(error)) { // check for if mongo server suddenly disonnected before this request.
			res.status(500).send('Internal server error')
		} else {
			res.status(400).send('Bad Request') // bad request for deleting the itinerary.
		}
    }
});

/*** Webpage routes below **********************************/
// Serve the build
app.use(express.static(path.join(__dirname, "itinerary_app/build")));

// All routes other than above will go to index.html
app.get("*", (req, res) => {
    // check for page routes that we expect in the frontend to provide correct status code.
    const goodPageRoutes = ["/", "/home", "/login", "/signup", "/about", "/search", "/search-places", "/admin", "/user"];
    console.log(req)
    //TODO: fix this for dynamic routing
    /*    console.log(req)
    if (!goodPageRoutes.includes(req.url)) {
        // if url not in expected page routes, set status to 404.
        console.log("not good route")
        res.status(404);
    }*/

    // send index.html
    res.sendFile(path.join(__dirname, "itinerary_app/build/index.html"));
});



/*************************************************/
// Express server listening...
const port = process.env.PORT || 5000;
app.listen(port, () => {
    log(`Listening on port ${port}...`);
});

/* This module will hold our connection to 
   our mongo server through the Mongoose API.
   We will access the connection in our express server. */
const mongoose = require('mongoose')

/* Connnect to our database */
// Get the URI of the local database, or the one specified on deployment.
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ItineraryAPI'

mongoose.connect(mongoURI, 
	{ useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
	.catch((error) => { 
		console.log('Error connecting to mongodb. Timeout reached.') 
	})
;

module.exports = { mongoose }  // Export the active connection.
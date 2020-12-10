/* Itinerary mongoose model */
const mongoose = require('mongoose')

const PlaceSchema = new mongoose.Schema({
    address: {
        type: String,
        required: true
    },
    place_id: {
        type: String,
        required: true
    }
});

const CommentsSchema = new mongoose.Schema({
    authorUrl:{
        type: String, /* example: "/userID" */
            required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
            required: true
    },
    fullName: {
        type: String,
            required: true
    },
    text: {
        type: String,
            required: true
    }
});

const Itinerary = mongoose.model('Itinerary', {
	name: {
		type: String,
		required: true,
		minlegth: 1,
		trim: true
    },
    startDate: {
        type: Date,
        default: Date.now,
        required: true
    },
    source:{
        type: PlaceSchema,
        required: true
    },
    destination:{
        type: PlaceSchema,
        required: true
    },
    waypoints: {
	    type: [PlaceSchema],
        required: false
    },
    waypoint_order: {
	  type: [Number],
        default: [0],
        required: false
    },
    commentsData: {
	  type: [CommentsSchema],
        required: false
    },
	creator: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
})

module.exports = { Itinerary }

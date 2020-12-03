/* Itinerary mongoose model */
const mongoose = require('mongoose')

const Itinerary = mongoose.model('Itinerary', {
	name: {
		type: String,
		required: true,
		minlegth: 1,
		trim: true
    },
    month: {
        type: Number,
        required: true
    },
    date: {
        type: Number,
        required: true
    },
	year: {
		type: Number,
		required: true,
    },
    source:{
        type: String,
        required: true
    },
    destination:{
        type: String,
        required: true
    },
	creator: {
		type: mongoose.Schema.Types.ObjectId,
		required: true
	}
})

module.exports = { Itinerary }

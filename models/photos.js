const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
	img: {
		type: String,
		required: true
	},
	username: {
		type: String,
		required: true
	},
	caption: String
})

module.exports = mongoose.model('Photo', photoSchema);
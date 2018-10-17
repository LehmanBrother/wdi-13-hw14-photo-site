const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
	img: {
		type: String,
		required: true
	},
	user: {
		type: String,
		required: true
	},
	caption: String
})

module.exports = mongoose.model('Photo', photoSchema);
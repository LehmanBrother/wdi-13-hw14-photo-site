const express = require('express');
const router = express.Router();
const User = require('./models/users');
const Photo = require('./models/photos');
require('./db/db');

Photo.deleteMany({}, (err, deletedPhotos) => {
	console.log(deletedPhotos);
})
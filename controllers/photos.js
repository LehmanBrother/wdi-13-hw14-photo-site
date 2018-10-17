const express = require('express');
const router = express.Router();
const User = require('../models/users');
const Photo = require('../models/photos');

//index route
router.get('/', (req, res) => {
	Photo.find({}, (err, allPhotos) => {
		res.render('photos/index.ejs', {
			photos: allPhotos
		});
	})
})

//new route
router.get('/new', (req, res) => {
	res.render('users/new.ejs');
})

//show route
router.get('/:index', (req, res) => {
	User.findById(req.params.index, (err, foundUser) => {
		res.render('users/show.ejs', {
			user: foundUser
		})
	})
})

//post route
router.post('/', (req, res) => {
	User.create(req.body, (err, createdUser) => {
		if(err) {
			console.log(err);
		} else {
			res.redirect('/users');
		}
	})
})

//delete route
router.delete('/:index', (req, res) => {
	User.findOneAndDelete(req.params.index, (err, deletedUser) => {
		if(err) {
			console.log(err);
		} else {
			res.redirect('/users');
		}
	})
})

//edit route
router.get('/:index/edit', (req, res) => {
	User.findById(req.params.index, (err, editedUser) => {
		res.render('users/edit.ejs', {
			user: editedUser
		});
	})
})

//put route
router.put('/:index', (req, res) => {
	User.findByIdAndUpdate(req.params.index, req.body, (err, updatedUser) => {
		res.redirect('/users');
	})
})

module.exports = router;
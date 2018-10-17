const express = require('express');
const router = express.Router();
const User = require('../models/users');
const Photo = require('../models/photos');

//index route
router.get('/', (req, res) => {
	User.find({}, (err, allUsers) => {
		res.render('users/index.ejs', {
			users: allUsers
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
		Photo.find({username: foundUser.username}, (err, foundPhotos) => {
			res.render('users/show.ejs', {
				user: foundUser,
				photos: foundPhotos
			})
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
	User.findByIdAndDelete(req.params.index, (err, deletedUser) => {
		if(err) {
			console.log(err);
		} else {
			Photo.deleteMany({username: deletedUser.username}, (err, deletedPhotos) => {
				res.redirect('/users');
			})
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
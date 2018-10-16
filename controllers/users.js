const express = require('express');
const router = express.Router();
const User = require('../models/users');

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
		res.render('users/show.ejs', {
			user: foundUser
		})
	})
})

//post route
router.post('/', (req, res) => {
	Artist.create(req.body, (err, createdArtist) => {
		if(err) {
			console.log(err);
		} else {
			res.redirect('/artists');
		}
	})
})

//delete route
router.delete('/:index', (req, res) => {
	Artist.findOneAndDelete(req.params.index, (err, deletedArtist) => {
		if(err) {
			console.log(err);
		} else {
			res.redirect('/artists');
		}
	})
})

//edit route
router.get('/:index/edit', (req, res) => {
	Artist.findById(req.params.index, (err, editedArtist) => {
		res.render('artists/edit.ejs', {
			artist: editedArtist
		});
	})
})

//put route
router.put('/:index', (req, res) => {
	Artist.findByIdAndUpdate(req.params.index, req.body, (err, updatedArtist) => {
		res.redirect('/artists');
	})
})

module.exports = router;
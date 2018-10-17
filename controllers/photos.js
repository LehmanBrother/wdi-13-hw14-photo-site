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
	User.find({}, (err, allUsers) => {
		res.render('photos/new.ejs', {
			users: allUsers
		});
	})
})

//show route
router.get('/:index', (req, res) => {
	Photo.findById(req.params.index, (err, showPhoto) => {
		if(err) {
			console.log(err);
		} else {
			User.findOne({username: showPhoto.username}, (err, foundUser) => {
				res.render('photos/show.ejs', {
					user: foundUser,
					photo: showPhoto
				})
			})
		}
	})
})

//post route
router.post('/', (req, res) => {
	Photo.create(req.body, (err, newPhoto) => {
		if(err) {
			console.log(err);
		} else {
			User.findOne({username: req.body.username}, (err, foundUser) => {
				foundUser.photos.push(newPhoto);
				foundUser.save();
			})
			res.redirect('/photos');
		}
	})
})

//delete route
router.delete('/:index', (req, res) => {
	Photo.findOneAndDelete(req.params.index, (err, deletePhoto) => {
		if(err) {
			console.log(err);
		} else {
			User.findOne({username: deletePhoto.username}, (err, deleteUser) => {
				deleteUser.photos.id(deletePhoto.id).remove();
				deleteUser.save();
				res.redirect('/photos')
			})
		}
	})
})

//edit route
router.get('/:index/edit', (req, res) => {
	User.findById(req.params.index, (err, editedUser) => {
		res.render('photos/edit.ejs', {
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
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
require('./db/db');

const usersController = require('./controllers/users');

//middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use('/users', usersController);

app.get('/', (req, res) => {
	res.render('index.ejs');
})

app.listen(3000, () => {
	console.log('Server listening on port 3000');
})
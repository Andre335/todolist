const express = require('express');
var task = require('./task/task.routes');
var configs = require('./credentials.json');
var mongoose = require('mongoose');

const bodyParser = require('body-parser');
const app = express();
const PORT = configs.PORT || 3001;

mongoose.connect('mongodb://' + configs.DBUSER + ':' + configs.DBPASS + '@ds229373.mlab.com:29373/gbet', { useNewUrlParser: true });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/task', task);

app.listen(PORT, () => console.log('Server started on port ' + PORT))
module.exports = app;

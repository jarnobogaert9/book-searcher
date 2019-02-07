const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const PORT = 3000 || process.env.PORT;
const app = express();

const index = require('./routes/index');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())

app.use('/', index);

app.listen(PORT, () => {
  console.log('Server is listening on port ' + PORT);
});
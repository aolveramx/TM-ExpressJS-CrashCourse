//1. Set server
const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const logger = require('./middleware/logger');
const members = require('./Members');

const app = express();

//3.3 Init Middleware
// app.use(logger);

//11. Handlebars Middleware
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

//12. Homepage route or static folder one or the other
app.get('/', (req, res) => res.render('index', {
  title: 'Member App',
  members,
}));

//7. Body Parse Middleware
app.use(express.json()); //Handle raw JSON
app.use(express.urlencoded({ extended: false })); //Handle form submitions


//2. Set static folder
//use method when we want to use middleware
app.use(express.static(path.join(__dirname, 'public')));

//5. Members API Routes
app.use('/api/members', require('./routes/api/members')); 


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server run on port ${PORT}`));

//12. Check passportJS http://www.passportjs.org/ and brad passport-local youtube
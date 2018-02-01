// secret: pk_test_CGQfgCOAuB880dmwwD4LWaiS
// publishable:

const express = require('express');
const stripe = require('stripe')('sk_test_gsF7ubnlEZsQvxDjBiYPv8xy');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');

const app = express();
//  handlebars middleware
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// bodyparser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

//  Set static folder
app.use(express.static(`${__dirname}/public`));


// index route
app.get('/', (req, res)=>{
  res.render('index');
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`)
});

// stripePublishableKey: 'pk_test_CGQfgCOAuB880dmwwD4LWaiS',
// stripeSecretKey: 'sk_test_gsF7ubnlEZsQvxDjBiYPv8xy'
const express = require('express');
const { stripeSecretKey, stripePublishableKey } = require('./config/environment');
const stripe = require('stripe')(stripeSecretKey);
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');

const app = express();

// Handlebars Middleware
app.engine('handlebars',exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Set Static Folder
app.use(express.static(`${__dirname}/public`));

// Index Route
app.get('/', (req, res) => {
  res.render('index', {
    stripePublishableKey: stripePublishableKey
  });
});

// Charge Route
app.post('/charge', (req, res) => {
  const stripeToken = req.body.stripeToken;

  stripe.customers.create({
    email: req.body.stripeEmail,
    source: stripeToken
  }), function(err, customer){
    if(err){
      res.send({
        success: false,
        message: 'Error'
      });
    } else {
      const { id } = customer;

      stripe.subscriptions.create({
        customer: id,
        items: [
          {
            plan: 'standard'
          }
        ]
      }, function(err,subscription){
        console.log(err);
        console.log(subscription);
        if(err){
          res.send({
            success: false,
            message: 'Error'
          });
        } else {
          res.send({
            success: true,
            message: 'success'
          });
        }
      }).then(charge => res.render('success'));
    }
  };
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

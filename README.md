# NodeJS Application with Stripe Payments
The aim of this project was to practice implementing Stripe API was well as practice NodeJS.

The application creates a new Stripe customer when the form is submitted and registers them as a subscriber to the application and charges a set monthly rate as part of the subscription plan. It is also linked to a mailchimp account so everytime a user subscribes, they get added to a mailing list.

### Process
This application was created following a basic tutorial on implementing the Stripe API and accepting Stripe Tokens and test payments.

The tutorial used handlebars as the view engine.

The basic express server was first created along with the handlebars views to render the pages. Then I created the Stripe functionality. At first I just wanted to create a one-off payment which would then allow the customers to then download a file, but then I decided to add a subscription service so I built a subscription method on top of the intitial Stripe charge.

After the MVP functionality worked, I linked up the application to a mailchimp account and imported the customers on suscription.

To start, clone and run 'node app.js'

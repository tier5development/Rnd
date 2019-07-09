var express = require('express');
var router = express.Router();
// Use body-parser to retrieve the raw body as a buffer
const bodyParser = require('body-parser');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// Match the raw body to content type application/json
router.post('/webhook', bodyParser.raw({type: 'application/json'}), (request, response) => {
  // let event;

  // try {
  //   event = JSON.parse(request.body);
  // }
  // catch (err) {
  //   response.status(400).send(`Webhook Error: ${err.message}`);
  // }

  // console.log("event :: ", JSON.stringify(request.body))

  // // Handle the event
  // switch (event.type) {
  //   case 'payment_intent.succeeded':
  //     const paymentIntent = event.data.object;
  //     handlePaymentIntentSucceeded(paymentIntent);
  //     break;
  //   case 'payment_method.attached':
  //     const paymentMethod = event.data.object;
  //     handlePaymentMethodAttached(paymentMethod);
  //     break;
  //   // ... handle other event types
  //   default:
  //     // Unexpected event type
  //     return response.status(400).end();
  // }

  // Return a response to acknowledge receipt of the event
  response.json({ received: request.body});
});

module.exports = router;

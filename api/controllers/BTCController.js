// JavaScript Document

const crypto = require('crypto');
// npm install request
const request = require('request');

// Set these in your ENVironment, or enter them here with the actual string
const api_cred = require('../../config/local');
const apiKey = api_cred.apiKey;
const apiSecret = api_cred.apiSecret;


//get unix time in seconds
const timestamp = Math.floor(Date.now() / 1000);
/**
 * MainController
 *
 * @description :: Server-side logic for managing Mains
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	/**
   	* `MainController.getData()`
   	*/
  	getData: function (req, res) {
  		// set the parameter for the request message
		const configs = {
		    method: 'GET',
		    path: '/v2/prices/BTC-USD/spot',
		    body: ''
		};
	

		const message = timestamp + configs.method + configs.path + configs.body;
		console.log(message);

		//create a hexedecimal encoded SHA256 signature of the message
		const signature = crypto.createHmac("sha256", apiSecret).update(message).digest("hex");

		//create the request options object
		const options = {
		    baseUrl: 'https://api.coinbase.com/',
		    url: configs.path,
		    method: configs.method,
		    headers: {
		        'CB-ACCESS-SIGN': signature,
		        'CB-ACCESS-TIMESTAMP': timestamp,
		        'CB-ACCESS-KEY': apiKey,
		        'CB-VERSION': '2015-07-22'
		    }
		};

		request(options,function(err, response){
		    if (err) console.log(err);
		    console.log(response.body);
		console.log(response.body);
	
		var body = JSON.parse(response.body);		
		console.log(body);

		var cf = '{ "messages": [   {"The current price of 1 ": "'+body.data.base +' is $'+body.data.amount +'"},   {"text": "What are you up to?"} ]}';

	    return res.send(cf);
		});
    }
	
	
	
	
	
}

// JavaScript Document
// JavaScript Document
const api_cred = require('../../config/local');
const apiKey = api_cred.apiKey;
const apiSecret = api_cred.apiSecret;

const Client = require('coinbase').Client;

var client = new Client({'apiKey': apiKey,
                         'apiSecret': apiSecret});


module.exports = {
	
	justTestFunction : function(req, res){
		
		var cf = req.query['test'];
		return res.json(cf);
	},
	
	getBuyPrice : function(req, res){
		var cp = req.query['cp'];
		client.getBuyPrice({'currencyPair': '${cp}'}, function(err, price) {
  		console.log(price);
	}
	
}
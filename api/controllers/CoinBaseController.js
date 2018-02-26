// JavaScript Document
const api_cred = require('../../config/local');
const apiKey = api_cred.apiKey;
const apiSecret = api_cred.apiSecret;

const Client = require('coinbase').Client;

var client = new Client({'apiKey': apiKey,
                         'apiSecret': apiSecret});


module.exports = {
	
	
	getBuyData: function (req, res) {
            var cp = req.query['cp'];
            client.getBuyPrice({'currencyPair': cp}, function(err, price) {
            if (!err){
                var textString = ` For 1 ${price.data.base} you'll have to pay ${price.data.amount} ${price.data.currency}`;  
                var cf = {
                    messages: [
                        {
                            text : textString
                        }
                    ]
                }
                return res.json(cf);
            } else {
                var cf = {
                    messages: [
                        {
                            text : 'Something Went Wrong!'
                        }
                    ]
                }
                return res.json(cf);
            }
          });
    },

    getSellData: function (req, res) {
            var cp = req.query['cp'];
            client.getSellPrice({'currencyPair': cp}, function(err, price) {
            if (!err){
                var textString = ` For 1 ${price.data.base} you'll get  ${price.data.amount} ${price.data.currency} if you sell right now!`;  
                var cf = {
                    messages: [
                        {
                            text : textString
                        }
                    ]
                }
                return res.json(cf);
            } else {
                var cf = {
                    messages: [
                        {
                            text : 'Something Went Wrong!'
                        }
                    ]
                }
                return res.json(cf);
            }
          });
    },
     getSpotData: function (req, res) {
            var cp = req.query['cp'];
            client.getSpotPrice({'currencyPair': cp}, function(err, price) {
            if (!err){
                var textString = ` The spot price for ${price.data.base} is ${price.data.amount} ${price.data.currency} right now!`;  
                var cf = {
                    messages: [
                        {
                            text : textString
                        }
                    ]
                }
                return res.json(cf);
            } else {
                var cf = {
                    messages: [
                        {
                            text : 'Something Went Wrong!'
                        }
                    ]
                }
                return res.json(cf);
            }
          });
    }


	
}

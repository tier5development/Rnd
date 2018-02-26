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
                var textString = ` ${price.data.base} buy price: ${price.data.amount} ${price.data.currency}`;  
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
                var textString = ` ${price.data.base} sell price:  ${price.data.amount} ${price.data.currency} `;  
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
    },
    listAccounts: function (req, res) {
            var cp = req.query['cp'];
            client.getAccounts({}, function(err, accounts) {
            if (!err){
                var textString = "Hello";//` The spot price for ${price.data.base} is ${price.data.amount} ${price.data.currency} right now!`;  
                var cf = {
                    messages: [
                        {
                            text : textString
                        }
                    ]
                }
                return res.json(accounts);
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

    listUSD: function(req, res){
    	client.getAccount("9f2f6afc-ed19-55dd-bca9-109fd8e375ed", function(err, account) {
  			if (!err){
                var textString = `USD Wallet Balance: $${account.balance.amount} `;  
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

    


	
}

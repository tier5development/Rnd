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
    listBTC: function(req, res){
    	client.getAccount("c3bbf6ef-f229-5a74-8d3b-c74a776a7588", function(err, account) {
  			if (!err){
                var textString = `BTC Wallet Balance: ${account.balance.amount}  ${account.balance.currency} with a total value of $${account.native_balance.amount} `;  
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
    listBCH: function(req, res){
    	client.getAccount("898da654-3420-59de-b303-966dee0991c5", function(err, account) {
  			if (!err){
                var textString = `BCH Wallet Balance: ${account.balance.amount}  ${account.balance.currency} with a total value of $${account.native_balance.amount} `;  
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
    listETH: function(req, res){
    	client.getAccount("e2ff8352-08c5-536f-8c34-7931cad11eb6", function(err, account) {
  			if (!err){
                var textString = `ETH Wallet Balance: ${account.balance.amount}  ${account.balance.currency} with a total value of $${account.native_balance.amount} `;  
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
    listLTC: function(req, res){
    	client.getAccount("004013af-28cc-56f4-8c4a-02fff9031b10", function(err, account) {
  			if (!err){
                var textString = `LTC Wallet Balance: ${account.balance.amount}  ${account.balance.currency} with a total value of $${account.native_balance.amount} `;  
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

    storeAPIkeys : function(req, res){
    		var id = req.query['messenger user id'];
    		var cfid = req.query['chatfuel user id'];
    		var textString = `Messenger User ID: ${id} Chatfuel User ID: ${cfid}`;
    		var cf = {
                    messages: [
                        {
                            text : textString
                        }
                    ]
                }
            return res.json(cf);

    }

    


	
}

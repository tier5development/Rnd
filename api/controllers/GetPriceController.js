// JavaScript Document.

// JavaScript Document// JavaScript Document// JavaScript Document

// Set these in your ENVironment, or enter them here with the actual string
const api_cred = require('../../config/local');
const apiKey = api_cred.apiKey;
const apiSecret = api_cred.apiSecret;

const Client = require('coinbase').Client;

var client = new Client({'apiKey': apiKey,
                         'apiSecret': apiSecret});

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
  	getBuyData: function (req, res) {
            var currencyPair = req.params.currency_pair | 'BTC-USD';
            client.getBuyPrice({'currencyPair': currencyPair}, function(err, price) {
            if (!err){
                var textString = `You have to pay ${price.data.amount} ${price.data.currency} to buy`;  
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
    getSellData: function(req,res){
        var currencyPair = req.params.currency_pair | 'BTC-USD';

        client.getSellPrice({'currencyPair': currencyPair}, function(err, price) {
            if (!err){
                var textString = `You'll get ${price.data.amount} ${price.data.currency} if you sell`;  
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

// JavaScript Document// JavaScript Document
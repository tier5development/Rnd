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
  	getData: function (req, res) {
  		
		client.getAccounts({}, function(err, accounts) {
			if (!err){
				var LTCAccount = {}
				accounts.forEach(obj => {
					if (obj.currency == 'LTC'){
						LTCAccount = obj;
					}
				})
				var cf = '{ "messages": [{"text" : "Total of '+ LTCAccount.balance.amount +' '+ LTCAccount.balance.currency +'  worth a total of $'+ LTCAccount.native_balance.amount+ '"} ]}';
				res.send(cf);
			}
		  });
	}
	
	
	
	
	
}

// JavaScript Document// JavaScript Document
/**
 * buyPolling
 * @description This function polls the coinbase api constantly and checking threshold and send a message to the chatfuel bot to send message to the particular user in messenger
 */
const api_cred = require('../../config/local');
const apiKey = api_cred.apiKey;
const apiSecret = api_cred.apiSecret;
const Client = require('coinbase').Client;

var client = new Client({'apiKey': apiKey,
                         'apiSecret': apiSecret});
const axios = require('axios');
const AsyncPolling = require('async-polling');
// bot id of the chatfuel
var bot_id = '';
// user id of the messenge
var user_id='';
// chatfuel token 
var CTOKEN='';
// block id 
var block_id ='';
// threshold you want to compare 
var threshold_buy_price = 200;
 
module.exports = function(){

    AsyncPolling(function (end) {
        client.getBuyPrice({'currencyPair': 'LTC-USD'}, function(err, price) {
            if (!err){
              console.log('buyprice',price.data.amount);
              if(price.data.amount <= threshold_buy_price){
                sendMessage()
              }
              end();
      
            } else {
              console.error(err);
              end();          
                
            }
          });
        // This will schedule the next call.
    }, 60*60).run();
 }


 function sendMessage(){
    let url = `https://api.chatfuel.com/bots/${bot_id}/users/${user_id}/send?chatfuel_token=${CTOKEN}&chatfuel_block_id=${block_id}`;
    axios.post(url,{})
      .then(function (response) {
        //console.log(response);
      })
      .catch(function (error) {
        console.log(error.message);
      });
 }
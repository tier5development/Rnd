<?php

namespace App\Http\Controllers;

use Exception;
use Illuminate\Http\Request;
use Log;

class MessageServiceController extends Controller
{
    public function sendMessage(Request $request)
    {
        /* Get Twilio Account SID and Auth Token from `.env` file */
        $accountSID = env('TWILIO_SID');
        $authToken = env('TWILIO_TOKEN');

        /* Create a new Twilio instance */
        $twilio = new \Services_Twilio($accountSID, $authToken);

        /* Fetch my Twilio numbers */
        $myTwilioNumbers = $twilio->account->incoming_phone_numbers;

        /* Message will be sent from my first number */
        $fromNumber = $myTwilioNumbers[0]->phone_number;
        /* Message will be recieved to my second number */
        $toNumber = $myTwilioNumbers[1]->phone_number;
        /* If command line argument has '-m' flag then next parameter will be the message else send default message */
        $body = $request->input('message');

        $twilio->account->messages->sendMessage($fromNumber, $toNumber, $body);

        return redirect()->route('home-page');
    }
}

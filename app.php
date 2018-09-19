<?php

require_once __DIR__ . '/vendor/autoload.php';

use Dotenv\Dotenv;

use Monolog\Logger;
use Monolog\Handler\StreamHandler;

$log = new Logger('app');
$log->pushHandler(new StreamHandler('logs/app.log', Logger::DEBUG));

$dotenv = new Dotenv(__DIR__);
$dotenv->load();

try {
    /* Get Twilio Account SID and Auth Token from `.env` file */
    $accountSID = getenv('TWILIO_SID');
    $authToken = getenv('TWILIO_TOKEN');

    /* Create a new Twilio instance */
    $twilio = new Services_Twilio($accountSID, $authToken);

    /* Fetch my Twilio numbers */
    $myTwilioNumbers = $twilio->account->incoming_phone_numbers;

    /* Message will be sent from my first number */
    $fromNumber = $myTwilioNumbers[0]->phone_number;
    /* Message will be recieved to my second number */
    $toNumber = $myTwilioNumbers[1]->phone_number;
    /* If command line argument has '-m' flag then next parameter will be the message else send default message */
    $body = ($flag = array_search('-m', $argv)) ? $argv[$flag + 1] : "Hello, World! This is a test message.";

    /* Send the message and get the Twilio response */
    $message = $twilio->account->messages->sendMessage($fromNumber, $toNumber, $body);

    /* Print the Twilio Message service response details */
    print("To: " . $message->to . "\n");
    print("Body: " . $message->body . "\n");
    print("From: " . $message->from . "\n");
    print("Direction: " . ucfirst(str_replace("-api", "", $message->direction)) . "\n");
    print("Status: " . ucfirst($message->status) . "\n");
    print("SID: " . $message->sid . "\n");
    print("Timestamp: " . $message->dateSent->format('D, M d Y, h:i:s A T') . "\n");
} catch (Exception $exception) {
    $log->info("=============================================================");
    $log->error("Exception: " . $exception->getMessage());
    $log->error("File: " . $exception->getFile());
    $log->error("Line: " . $exception->getLine());
    $log->info("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
    print("Oops! Something went wrong and application crashed!\n");
}

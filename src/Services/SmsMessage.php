<?php

declare(strict_types=1);

use Twilio\Rest\Client as Client;
use Twilio\Rest\Api\V2010\Account\MessageInstance;

/**
 * An wrapper class for SMS Message Service
 */
class Services_SmsMessage
{
    /**
     * The Twilio Client instance
     * 
     * @var Client
     */
    private $client;

    /**
     * Constructs the instance
     * 
     * @param Client $client The Twilio Client instance
     */
    public function __construct(Client $client)
    {
        $this->client = $client;
    }

    /**
     * Call Twilio message create method to provide send message service
     * 
     * @param string $fromNumber Phone number from where the message will be sent
     * @param string $toNumber Phone number where the message will be recieved
     * @param string $body The actual message (SMS) body
     * @return MessageInstance
     */
    public function create(string $fromNumber, string $toNumber, string $body): MessageInstance
    {
        return $this->client
                    ->messages
                    ->create(
                        $toNumber,[
                        'from' => $fromNumber,
                        'body' => $body
                    ]);
    }

    /**
     * Call Twilio message create method to provide send message service.
     * This is an alias for the `create` method.
     * 
     * @param string $fromNumber Phone number from where the message will be sent
     * @param string $toNumber Phone number where the message will be recieved
     * @param string $body The actual message (SMS) body
     * @return MessageInstance
     */
    public function sendMessage(string $fromNumber, string $toNumber, string $body): MessageInstance
    {
        return $this->create($fromNumber, $toNumber, $body);
    }
}

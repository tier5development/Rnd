<?php

declare(strict_types=1);

use Twilio\Rest\Client as Client;

/**
 * The actual class to contain the Twilio Client and associated services
 */
class Services_Account
{
    /**
     * Twilio Account SID
     * 
     * @var string
     */
    private $sid;

    /**
     * Twilio Auth Token
     * 
     * @var string
     */
    private $token;

    /**
     * Twilio Client
     * 
     * @var Client
     */
    private $client;

    /**
     * Twilio Message Service
     * 
     * @var Services_SmsMessage
     */
    private $sms_messages;

    /**
     * Twilio Message Service, an alias for `$sms_messages`
     * 
     * @var Services_SmsMessage
     */
    private $messages;

    /**
     * Constructs the instance
     * 
     * @param string $sid Twilio Account SID
     * @param string $token Twilio Auth Token 
     */
    public function __construct(string $sid, string $token)
    {
        $this->sid = $sid;
        $this->token = $token;
        $this->client = new Client($this->sid, $this->token);
        $this->sms_messages = new Services_SmsMessage($this->client);
        $this->messages = $this->sms_messages;
    }

    /**
     * Returns the private property magically without calling a getter method
     * 
     * @param string $property The class property name
     * @return mixed
     */
    public function __get($property)
    {
        switch ($property) {
            case 'sms_messages':
            case 'messages':
                return $this->$property;
            default:
                $method = 'get_'.$property;
                return $this->$method();
        }
    }

    /**
     * Get my Twilio phone numbers
     * 
     * @return Services_IncomingPhoneNumbers
     */
    public function get_incoming_phone_numbers()
    {
        foreach ($this->client->incomingPhoneNumbers->read() as $incomingPhoneNumber) {
            $incomingPhoneNumbers[] = new Services_IncomingPhoneNumbers($incomingPhoneNumber);
        }

        return $incomingPhoneNumbers;
    }
}

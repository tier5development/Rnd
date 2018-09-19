<?php

declare(strict_types=1);

/**
 * An Empty Wrapper Class to hold the Twilio Client instance.
 * This class is necessary to maintain the compatibility with SDK 4.
 */
class Services_Twilio
{
    /**
     * The Twilio Client instance
     * 
     * @var Services_Account
     */
    private $account;

    /**
     * Constructs the instance
     * 
     * @param string $sid Twilio Account SID
     * @param string $token Twilio Auth Token 
     */
    public function __construct(string $sid, string $token)
    {
        $this->account = new Services_Account($sid, $token);
    }

    /**
     * Returns the private property magically without calling a getter method
     * 
     * @param string $property The class property name
     * @return mixed
     */
    public function __get(string $property)
    {
        return $this->$property;
    }
}

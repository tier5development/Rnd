<?php

declare(strict_types=1);

use Twilio\Rest\Api\V2010\Account\IncomingPhoneNumberInstance as IncomingPhoneNumber;

/**
 * A Class which encapsulates Twilio phone number
 */
class Services_IncomingPhoneNumbers
{
    /**
     * Twilio phone number SID
     * 
     * @var string
     */
    private $sid;

    /**
     * Twilio Account SID
     * 
     * @var string
     */
    private $account_sid;

    /**
     * Friendly name (alias) of the phone number
     * 
     * @var string
     */
    private $friendly_name;

    /**
     * The actual phone number
     * 
     * @var string
     */
    private $phone_number;

    /**
     * Voice URL
     * 
     * @var string
     */
    private $voice_url;

    /**
     * Voice method
     * 
     * @var string
     */
    private $voice_method;

    /**
     * Voice fallback URL
     * 
     * @var string
     */
    private $voice_fallback_url;

    /**
     * Voice fallback method
     * 
     * @var string
     */
    private $voice_fallback_method;

    /**
     * Voice caller ID lookup
     * 
     * @var bool
     */
    private $voice_caller_id_lookup;

    /**
     * Date created
     * 
     * @var string
     */
    private $date_created;

    /**
     * Date updated
     * 
     * @var string
     */
    private $date_updated;

    /**
     * SMS URL
     * 
     * @var string
     */
    private $sms_url;

    /**
     * SMS Method
     * 
     * @var string
     */
    private $sms_method;

    /**
     * SMS fallback URL
     * 
     * @var string
     */
    private $sms_fallback_url;

    /**
     * SMS fallback method
     * 
     * @var string
     */
    private $sms_fallback_method;

    /**
     * Address requirements
     * 
     * @var string
     */
    private $address_requirements;

    /**
     * Is beta
     * 
     * @var bool
     */
    private $beta;

    /**
     * Capabilities
     * 
     * @var stdClass
     */
    private $capabilities;

    /**
     * Voice recieve mode
     * 
     * @var string
     */
    private $voice_receive_mode;

    /**
     * Status callback
     * 
     * @var string
     */
    private $status_callback;

    /**
     * Status callback method
     * 
     * @var string
     */
    private $status_callback_method;

    /**
     * API version
     * 
     * @var string
     */
    private $api_version;

    /**
     * Voice Application SID
     * 
     * @var string
     */
    private $voice_application_sid;

    /**
     * SMS Application SID
     * 
     * @var string
     */
    private $sms_application_sid;

    /**
     * Origin
     * 
     * @var string
     */
    private $origin;

    /**
     * Trunk SID
     * 
     * @var string
     */
    private $trunk_sid;

    /**
     * Emergency status
     * 
     * @var string
     */
    private $emergency_status;

    /**
     * Emergency status SID
     * 
     * @var string
     */
    private $emergency_address_sid;

    /**
     * Address SID
     * 
     * @var string
     */
    private $address_sid;

    /**
     * Identity SID
     * 
     * @var string
     */
    private $identity_sid;

    /**
     * URI
     * 
     * @var string
     */
    private $uri;

    /**
     * Status
     * 
     * @var string
     */
    private $status;

    /**
     * Constructs the instance
     * 
     * @param IncomingPhoneNumber $incomingPhoneNumber My Twilio phone numbers
     */
    public function __construct(IncomingPhoneNumber $incomingPhoneNumber)
    {
        $this->sid = $incomingPhoneNumber->sid;
        $this->account_sid = $incomingPhoneNumber->accountSid;
        $this->friendly_name = $incomingPhoneNumber->friendlyName;
        $this->phone_number = $incomingPhoneNumber->phoneNumber;
        $this->voice_url = $incomingPhoneNumber->voiceUrl;
        $this->voice_method = $incomingPhoneNumber->voiceMethod;
        $this->voice_fallback_url = $incomingPhoneNumber->voiceFallbackUrl;
        $this->voice_fallback_method = $incomingPhoneNumber->voiceFallbackMethod;
        $this->voice_caller_id_lookup = $incomingPhoneNumber->voiceCallerIdLookup;
        $this->date_created = $incomingPhoneNumber->dateCreated->format('D, M d Y, H:i:s T');
        $this->date_updated = $incomingPhoneNumber->dateUpdated->format('D, M d Y, G:i:s T');
        $this->sms_url = $incomingPhoneNumber->smsUrl;
        $this->sms_method = $incomingPhoneNumber->smsMethod;
        $this->sms_fallback_url = $incomingPhoneNumber->smsFallbackUrl;
        $this->sms_fallback_method = $incomingPhoneNumber->smsFallbackMethod;
        $this->address_requirements = $incomingPhoneNumber->addressRequirements;
        $this->beta = $incomingPhoneNumber->beta;
        $this->capabilities = json_decode(json_encode($incomingPhoneNumber->capabilities));
        $this->status_callback = $incomingPhoneNumber->statusCallback;
        $this->status_callback_method = $incomingPhoneNumber->statusCallbackMethod;
        $this->api_version = $incomingPhoneNumber->apiVersion;
        $this->voice_application_sid = $incomingPhoneNumber->voiceApplicationSid;
        $this->sms_application_sid = $incomingPhoneNumber->smsApplicationSid;
        $this->origin = $incomingPhoneNumber->origin;
        $this->trunk_sid = $incomingPhoneNumber->trunkSid;
        $this->emergency_status = $incomingPhoneNumber->emergencyStatus;
        $this->emergency_address_sid = $incomingPhoneNumber->emergencyAddressSid;
        $this->address_sid = $incomingPhoneNumber->addressSid;
        $this->identity_sid = $incomingPhoneNumber->identitySid;
        $this->uri = $incomingPhoneNumber->uri;
    }

    /**
     * Returns the private property magically without calling a getter method
     * 
     * @param string $property The class property name
     * @return mixed
     */
    public function __get($property)
    {
        return $this->$property;
    }
}

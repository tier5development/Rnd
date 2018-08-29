<?php

namespace Tests\Browser;

use Tests\DuskTestCase;
use Laravel\Dusk\Browser;
use Illuminate\Foundation\Testing\DatabaseMigrations;

use Artisan;

class RegisterTest extends DuskTestCase
{
    /**
     * A Dusk test example.
     *
     * @return void
     */
    use DatabaseMigrations;
    
    public function testExample()
    {
       $this->browse(function (Browser $browser) {
            $browser->visit('/')
                    ->clickLink('Register')
                    ->assertSee('Register')
                    ->value('#name','Smith')
                    ->value('#email','smith@gmail.com')
                    ->value('#password','123456')
                    ->value('#password-confirm','123456')
                    ->click('button[type="Submit"]')
                    ->assertSee("You are logged in!");
        });

        Artisan::call('migrate');
    }
}

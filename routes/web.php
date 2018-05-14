<?php

use App\Events\TaskEvent;
use App\Jobs\SendEmailJob;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/




Route::get('/', function () {
    return view('welcome');
});


Route::get('test-broadcast', function(){
    broadcast(new \App\Events\ExampleEvent);
});

Route::get('sendEmail', function(){

	dispatch(new SendEmailJob())->delay(now()->addMinutes(10)); 

	return 'Email send properly';
});

Route::get('event', function(){

	event(new TaskEvent('Hey how are you!'));
});

Route::get('listen', function(){

	return view('listenBroadcast');

});

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');

<?php

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

/*Route::get('/', function () {
return view('welcome');
});
 */
Route::get('registration', 'UserController@create');
Route::post('/registration', 'UserController@store')->name('register');

Route::get('login', 'UserController@login');
Route::post('login', 'UserController@loginprocess')->name('userlogging');

Route::get('userlist', 'UserController@userlist');

Route::get('addarticle', 'ArticleController@articleFormDisplay')->name('articlename');
Route::post('articleprocess', 'ArticleController@articleFormProcessing')->name('articleprocess');

Route::get('articlelistdisplay','ArticleController@articleListDisplay');

Route::get('/articleedit/{article_id}','ArticleController@articleEdit');

Route::post('updatearticle','ArticleController@UpdateArticle');



 Route::get('/edit_user/{id}', ['uses' => 'UserController@edit']);
/*
Auth::routes();
 */
Route::get('/home', 'HomeController@index')->name('home');

// Route::resource('/articlelist', 'userController');


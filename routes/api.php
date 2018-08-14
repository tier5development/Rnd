<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
Route::post('V1/registration','UserappController@registrationProcess');
Route::post('V1/login','UserappController@loginProcess');
Route::post('V1/addarticle','ArticleApiController@addArticle');
Route::post('V1/articlelist','ArticleApiController@articleListing');
Route::post('V1/editform','ArticleApiController@editForm');
Route::post('V1/updateform','ArticleApiController@updateForm');
Route::post('V1/articledelete','ArticleApiController@deleteArticle');


        
    

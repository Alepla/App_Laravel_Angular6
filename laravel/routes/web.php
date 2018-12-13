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

Route::get('/', function () {
    return view('welcome');
});
Route::group(['namespace' => 'Api'], function () {
    //Route::get('login/{provider}', 'AuthController@auth')->name('redirectSocialLite')->where(['provider' => 'google']);
    //Route::get('login/{provider}/callback', 'AuthController@sociallogin')->where(['provider' => 'google']);
    //Route::get('loginsocial', 'AuthController@loginsocial');
});
<?php

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

Route::group(['namespace' => 'Api'], function () {

    Route::post('users/login', 'AuthController@login');
    Route::post('users', 'AuthController@register');

    Route::get('user', 'UserController@index');
    Route::match(['put', 'patch'], 'user', 'UserController@update');

    Route::get('profiles/{user}', 'ProfileController@show');
    Route::post('profiles/{user}/follow', 'ProfileController@follow');
    Route::delete('profiles/{user}/follow', 'ProfileController@unFollow');

    Route::get('articles/feed', 'FeedController@index');
    Route::post('articles/{article}/favorite', 'FavoriteController@add');
    Route::delete('articles/{article}/favorite', 'FavoriteController@remove');

    Route::resource('articles', 'ArticleController', [
        'except' => [
            'create', 'edit'
        ]
    ]);

    Route::resource('articles/{article}/comments', 'CommentController', [
        'only' => [
            'index', 'store', 'destroy'
        ]
    ]);

    Route::get('tags', 'TagController@index');

    Route::post('sendemail','EmailController@email');

    Route::resource('videos','VideoController');
    Route::get('video', 'VideoController@indexOne');

    Route::get('labels','LabelController@index');

    Route::get('search','SearchController@index');
    Route::get('searchautofilter','SearchController@searchautofilter');
    
    Route::get('login/{provider}', 'AuthController@auth')->name('redirectSocialLite')->where(['provider' => 'google']);
    Route::get('login/{provider}/callback', 'AuthController@sociallogin')->where(['provider' => 'google']);
    Route::get('loginsocial', 'AuthController@loginsocial');
    
});
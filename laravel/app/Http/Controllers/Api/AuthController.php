<?php

namespace App\Http\Controllers\Api;

use Auth;
use App\User;
use App\SocialLogin;
use Session;
use App\Http\Requests\Api\LoginUser;
use App\Http\Requests\Api\RegisterUser;
use App\RealWorld\Transformers\UserTransformer;

class AuthController extends ApiController
{
    /**
     * AuthController constructor.
     *
     * @param UserTransformer $transformer
     */
    public function __construct(UserTransformer $transformer, SocialLogin $socialLogin)
    {
        $this->transformer = $transformer;
        $this->socialLogin = $socialLogin;
    }

    /**
     * Login user and return the user if successful.
     *
     * @param LoginUser $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(LoginUser $request)
    //public function login(Request $request)
    {
        $credentials = $request->only('user.email', 'user.password');
        $credentials = $credentials['user'];

        if (! Auth::once($credentials)) {
            return $this->respondFailedLogin();
        }

        return $this->respondWithTransformer(auth()->user());
    }

    /**
     * Register a new user and return the user if successful.
     *
     * @param RegisterUser $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function register(RegisterUser $request)
    {
        $user = User::create([
            'username' => $request->input('user.username'),
            'email' => $request->input('user.email'),
            'password' => $request->input('user.password'),
            'followers' => 0,
            'image' => 'https://api.adorable.io/avatars/150/'.$request->input('user.email').'.png'
        ]);
        
        return $this->respondWithTransformer($user);
    }

    public function auth($provider)
    {
        return $this->socialLogin->authenticate($provider);
    }

    public function sociallogin($provider)
    {
        try {
            $user = $this->socialLogin->login($provider);
            $valUser = User::where('email', '=', $user->email)->first();
            if($valUser === null){
                $user = User::create([
                    'username' => $user->name,
                    'email' => $user->email,
                    'password' => $user->id,
                    'followers' => 0,
                    'image' => $user->avatar
                ]);
            }
            
            session(['Email' => $user->email]);
            return redirect('http://localhost:4200/sociallogin');
        } catch (SocialAuthException $e) {
            echo 'Not User';
        }
    }
    public function loginsocial()
    {
        session(['Email' => 'daniortizgar@gmail.com']);
        if (Session::has('Email')) {
            $user = User::where('email','=',Session::get('Email'))->first();
            $credentials = Session::get('Email');
            return $this->respondWithTransformer($user);
        }
    }
}
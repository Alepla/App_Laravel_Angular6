<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Requests;
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

        //$this->middleware('auth.api')->except(['index', 'show']);
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
            
            return redirect()->to('http://localhost:4200/sociallogin/'.$user->email);
            /*$user = User::find(1);
            Auth::login($user);*/
            //auth()->login($user);
            //return redirect('http://localhost:4200');
            /*session(['Email' => $user->email]);
            session(['user' => $user]);*/
            //return redirect('http://localhost:4200/sociallogin');
        } catch (SocialAuthException $e) {
            echo 'Not User';
        }
    }
    public function loginsocial(Request $request)
    {
        //return '{"user":{"email":"daniortizgar@gmail.com","token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjMzLCJpc3MiOiJodHRwczpcL1wvbG9jYWxob3N0OjgwMDBcL2xvZ2luc29jaWFsIiwiaWF0IjoxNTQ0NTQwMzYwLCJleHAiOjE1NDk3MjQzNjAsIm5iZiI6MTU0NDU0MDM2MCwianRpIjoiazhObjVIR01CQWVWRmd5cCJ9.AAnqj4rQF_5PmZOeqBOOyPhvnUrboDwzXjXVJLAyJCA","username":"Dani Ortiz","bio":null,"image":"https:\/\/lh5.googleusercontent.com\/-8VxDmCmO70M\/AAAAAAAAAAI\/AAAAAAAAAdg\/Tj0lMDMweFA\/photo.jpg?sz=50","followers":"0"}}';
        /*$user = User::find(1);
        Auth::login($user);*/
        $user = User::where('email', '=', $request->input("email"))->first();
        return $this->respondWithTransformer($user);
        //return $user;
        /*if (Session::has('Email')) {
            $user = User::where('email','=',Session::get('Email'))->first();
            return $this->respondWithTransformer($user);
        }
        return "Error";*/
    }
}
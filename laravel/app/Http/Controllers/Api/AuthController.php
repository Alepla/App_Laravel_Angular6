<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Requests;
use Auth;
use App\User;
use App\SocialLogin;
use Session;
use Illuminate\Support\Facades\Storage;
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
            
            Storage::disk('local')->put('file.txt',$this->respondWithTransformer($valUser));
            return redirect()->to('http://localhost:4200/sociallogin');
        } catch (SocialAuthException $e) {
            echo 'Not User';
        }
    }
    public function loginsocial(Request $request)
    {
        $exists = Storage::disk('local')->exists('file.txt');
        if($exists){
            $user = Storage::disk('local')->get('file.txt');
            Storage::disk('local')->delete('file.txt');
        }
        return explode('GMT',$user)[1];
    }
}
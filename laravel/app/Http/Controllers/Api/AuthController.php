<?php

namespace App\Http\Controllers\Api;
use Illuminate\Http\Request;
use Auth;
use App\User;
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
    public function __construct(UserTransformer $transformer)
    {
        $this->transformer = $transformer;
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
        
        //return response()->json($request->get('user'), 200, []);
        //return response()->json($request->input('user.email'), 200, []);
        //return response()->json(auth()->user(), 200, []);

        return $this->respondWithTransformer(auth()->user());
    }

    /**
     * Register a new user and return the user if successful.
     *
     * @param RegisterUser $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function register(RegisterUser $request)
    //public function register(Request $request)
    {
        
        $user = User::create([
            'email' => $request->input('user.email'),
            'password' => $request->input('user.password'),
            'username' => $request->input('user.username'),
            'follows' => 0
        ]);
        
        //return response()->json($request->get('user'), 200, []);
        //return response()->json($request->input('user.username'), 200, []);
        //return response()->json($user, 200, []);
        
        return $this->respondWithTransformer($user);
    }

    public function registerSocial(Request $request)
    //public function register(Request $request)
    {
        $email = User::where('email', '=', $request->input('user.email'))->first();
        if($email === null) {
            $user = User::create([
                'email' => $request->input('user.email'),
                'password' => $request->input('user.password'),
                'username' => $request->input('user.username'),
                'image' => $request->input('user.image'),
                'follows' => 0
            ]);
            return $this->respondWithTransformer($user);
        }else {
            return "This email already exists";
        }
        //return response()->json($request->get('user'), 200, []);
        //return response()->json($request->input('user.username'), 200, []);
        //return response()->json($user, 200, []);
    }
}

<?php

namespace App\Http\Controllers\Api;

use App\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\RealWorld\Transformers\ProfileTransformer;

class SubscribeController extends ApiController
{
    /**
     * LikeController constructor.
     *
     * @param UserTransformer $transformer
     */
    public function __construct(ProfileTransformer $transformer)
    {
        $this->transformer = $transformer;

        $this->middleware('auth.api');
    }

    public function get(Request $request)
    {
        $user = auth()->user();
        $subs = $users = DB::table('subscribes')->where([
            ['users_id', '=', $request->input('id')],
            ['user_id', '=', $user->id],
        ])->first();
        $count = DB::table('subscribes')->where('users_id', '=', $request->input('id'))->count();
        
        if($subs)
            return response()->json(['state' => true, 'followers' => $count]);
        else
            return response()->json(['state' => false, 'followers' => $count]);
    }

    /**
     * Like the video given by its slug and return the video if successful.
     *
     * @param User $video
     * @return \Illuminate\Http\JsonResponse
     */
    public function add(Request $request)
    {
        $users = auth()->user();

        $user = User::where('username', '=', $request->input('username'))->first();

        $users->subscribe($user);
        
        return $this->respondWithTransformer($user);
    }

    /**
     * Unlike the video given by its slug and return the video if successful.
     *
     * @param Video $video
     * @return \Illuminate\Http\JsonResponse
     */
    public function remove(Request $request)
    {
        $users = auth()->user();

        $user = User::where('username', '=', $request->input('username'))->first();

        $users->unSubscribe($user);

        return $this->respondWithTransformer($user);
    }
}

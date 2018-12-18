<?php

namespace App\Http\Controllers\Api;

use App\Video;
use App\User;
use Illuminate\Http\Request;
use App\RealWorld\Transformers\SearchTransformer;

class SearchController extends ApiController
{	
    public function __construct(SearchTransformer $transformer)
    {
        $this->transformer = $transformer;
    }

    public function index(Request $request){
        $userVideos = null;
        $videos = Video::where('title', 'like', "%" . $request->input("filter") . "%")
                         ->  orWhere('description', 'like', "%" . $request->input("filter") . "%")->get();
        $users = User::where('username', 'like', "%" . $request->input("filter") . "%")->orderBy('followers', 'desc')->get();

        if($users != null){
            foreach ($users as $key => $user) {
                if($key < 1)
                    $userVideos = Video::where('user_id', '=', $user->id)->orderBy('created_at', 'desc')->get();
            }
        }

        $search['videos'] = $this->respondWithTransformer($videos);
        $search['users'] = $this->respondWithTransformer($users);
        $search['userVideos'] = $this->respondWithTransformer($userVideos);

        return $search;
    }
    public function searchautofilter(Request $request){
        $videos = Video::where('title', 'like', "%" . $request->input("filter") . "%")/*->orderBy('views', 'desc')*/->get();
        $users = User::where('username', 'like', "%" . $request->input("filter") . "%")->orderBy('followers', 'desc')->get();

        $search['videos'] = $this->respondWithTransformer($videos);
        $search['users'] = $this->respondWithTransformer($users);

        return $search;
    }
}

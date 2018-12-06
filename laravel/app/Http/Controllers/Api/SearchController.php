<?php

namespace App\Http\Controllers\Api;

use App\Video;
use App\User;
use Illuminate\Http\Request;
use App\RealWorld\Transformers\VideoTransformer;

class SearchController extends ApiController
{	
    public function __construct(VideoTransformer $transformer)
    {
        $this->transformer = $transformer;
    }

    public function index(Request $request){
        $videos = Video::where('title', 'like', "%" . $request->input("filter") . "%")
                        ->  orWhere('description', 'like', "%" . $request->input("filter") . "%")->get();
        /*$users = User::where('username', 'like', "%lil%"); 
        foreach ($users as $user) {
            echo $user->username;
        } */
        return $this->respondWithTransformer($videos);
    }
}

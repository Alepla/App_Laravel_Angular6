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
        $videos = Video::where('title', 'like', "%" . $request->input("filter") . "%")
                        ->  orWhere('description', 'like', "%" . $request->input("filter") . "%")->get();
        $users = User::where('username', 'like', "%" . $request->input("filter") . "%")->get(); 
        $search['videos'] = $this->respondWithTransformer($videos);
        $search['users'] = $this->respondWithTransformer($users);

        return $search;
    }
}

<?php 

namespace App\Http\Controllers\Api;

use App\Videos;
use App\RealWorld\Transformers\VideoTransformer;

class VideoController extends ApiController { 	
    public function __construct(VideoTransformer $transformer)
    {
        $this->transformer = $transformer;
    }

    public function index()
    {
        $videos = Videos::all();
        return $this->respondWithTransformer($videos);
    }

    public function show(Videos $video)
    {
        //print_r($user);
        //print_r($this->respondWithTransformer($user));
        return $this->respondWithTransformer($video);
    }
}

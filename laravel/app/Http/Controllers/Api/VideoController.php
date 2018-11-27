<?php 

namespace App\Http\Controllers\Api;

use App\Video;
use App\RealWorld\Transformers\VideoTransformer;

class VideoController extends ApiController { 	
    public function __construct(VideoTransformer $transformer)
    {
        $this->transformer = $transformer;
    }

    public function index()
    {
        $videos = Video::all();
        return $this->respondWithTransformer($videos);
    }

    public function show(Videos $video)
    {
        return $this->respondWithTransformer($video);
    }
}

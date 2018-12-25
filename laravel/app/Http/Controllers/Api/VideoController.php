<?php 

namespace App\Http\Controllers\Api;
use App\Http\Requests\Api\UploadVideo;

use App\Video;
use App\RealWorld\Paginate\Paginate;
use App\RealWorld\Filters\VideoFilter;
use App\RealWorld\Transformers\VideoTransformer;
use Illuminate\Http\Request;

class VideoController extends ApiController { 	
    public function __construct(VideoTransformer $transformer)
    {
        $this->transformer = $transformer;
    }

    //https://laravel2-1-yomogan.c9users.io/conduit_laravel/public/api/articles?tag=corporis&limit=5&offset=2
    public function index(VideoFilter $filter)
    {
        $videos = new Paginate(Video::loadRelations()->filter($filter));
        return $this->respondWithPagination($videos);
    }

    public function show(Video $video)
    {
        return $this->respondWithTransformer($video);
    }

    public function indexOne()
    {   
        $video =  Video::where('id', 1)->first();
        return $this->respondWithTransformer($video);
    }

    public function upload(UploadVideo $request){
        
        $video = Video::create([
            'user_id' => $request->input('video.userid'),
            'title' => $request->input('video.title'),
            'slug' => $request->input('video.slug'),
            'description' => $request->input('video.description'),
            'video' => $request->input('video.video'),
            'category' => $request->input('video.category'),
            'state' => $request->input('video.state'),
            'category' => $request->input('video.category'),
            'thumbnail' => $request->input('video.image')
        ]);
        
        return $this->respondWithTransformer($video);
    }
}

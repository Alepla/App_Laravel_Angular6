<?php 

namespace App\Http\Controllers\Api;
use App\Http\Requests\Api\UploadVideo;

use App\Video;
use App\User;
use App\RealWorld\Paginate\Paginate;
use App\RealWorld\Filters\VideoFilter;
use App\RealWorld\Transformers\VideoTransformer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

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

    public function sumView(Request $request)
    {   

        $video  = Video::where('id', $request->input('video.id'))->first();

        $video->increment('views', 1, ['id' => $request->input('video.id')]);
        
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
            'views' => 0,
            'thumbnail' => $request->input('video.image')
        ]);
        
        return $this->respondWithTransformer($video);
    }

    public function getFollowing(Request $request)
    {
        $query = '';
        $users = DB::table('subscribes')
            ->select('users_id')
            ->where('user_id', '=', $request->input('user'))->get();
            
        foreach ($users as $key => $user) {
            if($key > 0)
                $query .= ", " . $user->users_id;
            else
                $query = $user->users_id;
        }

        $videos = Video::whereIn('user_id', explode(',', $query))->orderBy('created_at', 'desc')->get();

        return $this->respondWithTransformer($videos);
    }
}

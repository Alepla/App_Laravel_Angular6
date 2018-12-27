<?php

namespace App\Http\Controllers\Api;

use App\Video;
use App\RealWorld\Transformers\VideoTransformer;

class DisLikeController extends ApiController
{
    /**
     * LikeController constructor.
     *
     * @param VideoTransformer $transformer
     */
    public function __construct(VideoTransformer $transformer)
    {
        $this->transformer = $transformer;

        $this->middleware('auth.api');
    }

    /**
     * Like the video given by its slug and return the video if successful.
     *
     * @param Video $video
     * @return \Illuminate\Http\JsonResponse
     */
    public function add(Video $video)
    {
        $user = auth()->user();

        $user->dislike($video);

        return $this->respondWithTransformer($video);
    }

    /**
     * Unlike the video given by its slug and return the video if successful.
     *
     * @param Video $video
     * @return \Illuminate\Http\JsonResponse
     */
    public function remove(Video $video)
    {
        $user = auth()->user();

        $user->unDislike($video);

        return $this->respondWithTransformer($video);
    }
}

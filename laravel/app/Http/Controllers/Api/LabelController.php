<?php

namespace App\Http\Controllers\Api;

use App\Label;
use App\RealWorld\Transformers\LabelTransformer;

class LabelController extends ApiController
{
    public function __construct(LabelTransformer $transformer)
    {
        $this->transformer = $transformer;
    }

    public function index()
    {
        $labels = Label::all()->pluck('name');
        
        //print_r($tags);
        //print_r($this->respondWithTransformer($tags));
        return $this->respondWithTransformer($labels);
    }
}

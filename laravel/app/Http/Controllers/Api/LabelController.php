<?php

namespace App\Http\Controllers\Api;

use App\Label;
use App\RealWorld\Transformers\LabelTransformer;

class LabelController extends ApiController
{
    /**
     * TagController constructor.
     *
     * @param LabelTransformer $transformer
     */
    public function __construct(LabelTransformer $transformer)
    {
        $this->transformer = $transformer;
    }

    /**
     * Get all the label.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $label = Label::all()->pluck('name');
        
        return $this->respondWithTransformer($label);
    }
}

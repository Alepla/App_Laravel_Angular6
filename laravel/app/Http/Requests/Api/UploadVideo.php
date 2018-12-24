<?php

namespace App\Http\Requests\Api;

class UploadVideo extends ApiRequest
{
    /**
     * Get data to be validated from the request.
     *
     * @return array
     */
    protected function validationData()
    {
        return $this->get('video') ?: [];
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'title' => 'required|string|min:3|max:40',
            'state' => 'required',
            'category' => 'required|string',
            'tags' => 'required',
            'description' => 'required|string|min:30|max:200',
            'slug' => 'required|string',
            'userid' => 'required',
            'image' => 'required|string',
            'video' => 'required|string'
        ];
    }
}

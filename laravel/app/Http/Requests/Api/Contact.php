<?php

namespace App\Http\Requests\Api;

class Contact extends ApiRequest
{
    /**
     * Get data to be validated from the request.
     *
     * @return array
     */
    protected function validationData()
    {
        return $this->get('contactMail') ?: [];
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name' => 'required|string|max:30',
            'email' => 'required|email',
            'subject' => 'required|string',
            'message' => 'required|string|max:100',
        ];
    }
}

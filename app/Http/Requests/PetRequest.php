<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PetRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $rules = [
            'nombre' => ['required'],
            'color' => ['required'],
            'raza' => ['required'],
            'comportamiento' => ['required'],
        ];

        if ($this->isMethod('post')) {
            $rules['imagen'] = ['required', 'image'];
        }

        $rules['qr'] = ['nullable', 'image'];

        return $rules;
    }
}

<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class PetResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'nombre' => $this->nombre,
            'color' => $this->color,
            'imagen' => $this->imagen ? asset('storage/' . $this->imagen) : null,
            'raza' => $this->raza,
            'comportamiento' => $this->comportamiento,
            'user_id' => $this->user_id,
            'qr' => $this->qr ? asset('storage/' . $this->qr) : null,
        ];
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use SimpleSoftwareIO\QrCode\Facades\QrCode;

class Pet extends Model
{
    use HasFactory;

    protected $fillable = ['nombre', 'color', 'imagen', 'raza', 'comportamiento', 'user_id', 'qr'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function updateQrCode()
    {
        $ownerInfo = [
            'Nombre del dueño' => $this->user->name,
            'Teléfono' => $this->user->address,
        ];

        $petInfo = [
            'Nombre de la mascota' => $this->nombre,
            'Color' => $this->color,
            'Raza' => $this->raza,
            'Descripción' => $this->comportamiento,
        ];

        $qrContent = array_merge($petInfo, $ownerInfo);

        $qrPath = 'app/public/qrcodes/' . $this->id . '.svg';
        $qrPath1 = 'qrcodes/' . $this->id . '.svg';

        QrCode::format('svg')->size(600)->generate($this->formatQrContent($qrContent), storage_path($qrPath));

        $this->update(['qr' => $qrPath1]);
    }

    private function formatQrContent(array $content)
    {
        $formattedContent = '';

        foreach ($content as $label => $value) {
            $formattedContent .= "$label: $value\n";
        }

        return $formattedContent;
    }

}

<?php

namespace App\Http\Controllers;

use App\Http\Requests\PetRequest;
use App\Http\Resources\PetResource;
use App\Models\Pet;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use SimpleSoftwareIO\QrCode\Facades\QrCode;
use Web3\Contract;

class PetController extends Controller
{
    public function index()
    {
        if (Auth::check()) {
            $user = Auth::user();
            $pets = PetResource::collection($user->pets()->latest()->paginate(10));
        }

        return inertia('Pets/Index', [
            'pets' => $pets,
        ]);
    }

    public function store(PetRequest $request)
    {
        if (Auth::check()) {
            $user = Auth::user();

            $attributes = $request->validated();
            $attributes['user_id'] = $user->id;

            $ownerInfo = [
                'owner_name' => $user->name,
                'owner_phone' => $user->address,
            ];

            $attributes = array_merge($attributes, $ownerInfo);

            if ($request->hasFile('imagen')) {
                $imagenPath = $request->file('imagen')->store('pets', 'public');
                $attributes['imagen'] = $imagenPath;
            }

            $pet = Pet::create($attributes);

            $params = [
                $attributes['nombre'],
                $attributes['raza'],
                $attributes['color'],
                $attributes['comportamiento'],
                $ownerInfo['owner_name'],
                $ownerInfo['owner_phone'],
            ];

            $formattedParams = implode(' ', array_map('escapeshellarg', $params));

            $command = "node " . base_path("app/Http/Controllers/interactuarContrato.js") . " $formattedParams";
            exec($command, $output, $returnVar);

            $qrContent = "
            Nombre de la mascota: " . $attributes['nombre'] . "
            Raza: " . $attributes['raza'] . "
            Color: " . $attributes['color'] . "
            Descripción: " . $attributes['comportamiento'] . "
            Nombre del dueño: " . $ownerInfo['owner_name'] . "
            Teléfono: " . $ownerInfo['owner_phone'];

            $qrPath = 'app/public/qrcodes/' . $pet->id . '.svg';
            $qrPath1 = 'qrcodes/' . $pet->id . '.svg';

            QrCode::format('svg')->size(600)->generate($qrContent, storage_path($qrPath));

            $pet->update(['qr' => $qrPath1]);

            return back()->with([
                'type' => 'success',
                'message' => 'Pet has been created',
            ]);
        } else {
            return back()->with([
                'type' => 'error',
                'message' => 'You need to be logged in to create a pet',
            ]);
        }
    }


    public function update(PetRequest $request, Pet $pet)
    {
        $attributes = $request->validated();

        if ($request->hasFile('imagen')) {
            if ($pet->imagen) {
                Storage::disk('public')->delete($pet->imagen);
            }

            $imagenPath = $request->file('imagen')->store('pets', 'public');
            $attributes['imagen'] = $imagenPath;
        }

        if ($pet->qr) {
            Storage::disk('public')->delete($pet->qr);
        }

        $ownerInfo = [
            'owner_name' => $pet->user->name,
            'owner_phone' => $pet->user->address,
        ];

        $attributes = array_merge($attributes, $ownerInfo);

        $qrContent = "Información de la mascota: " . json_encode($attributes);
        $qrPath = 'app/public/qrcodes/' . $pet->id . '.svg';
        $qrPath1 = 'qrcodes/' . $pet->id . '.svg';

        QrCode::format('svg')->size(600)->generate($qrContent, storage_path($qrPath));

        $attributes['qr'] = $qrPath1;

        $pet->update($attributes);

        return redirect()->route('pets.index')->with([
            'type' => 'success',
            'message' => 'Pet has been updated',
        ]);
    }

    public function destroy(Pet $pet)
    {
        if ($pet->imagen) {
            Storage::disk('public')->delete($pet->imagen);
        }

        if ($pet->qr) {
            Storage::disk('public')->delete($pet->qr);
        }

        $pet->delete();

        return back()->with([
            'type' => 'success',
            'message' => 'Pet has been deleted',
        ]);
    }
}

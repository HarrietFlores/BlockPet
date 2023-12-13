<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use App\Models\Pet;

class UserController extends Controller
{

    public function index()
    {
        $users = UserResource::collection(User::latest()->paginate(10));
        return inertia('Users/Index', [
            'users' => $users,
        ]);
    }

    public function store(UserRequest $request)
    {
        $attr = $request->toArray();

        User::create($attr);

        return back()->with([
            'type' => 'success',
            'message' => 'User has been created',
        ]);
    }

    public function update(UserRequest $request, User $user)
    {
        $attr = $request->validated();

        $user->update($attr);

        $pets = $user->pets;

        foreach ($pets as $pet) {

            $pet->updateQrCode();
        }

        return back()->with([
            'type' => 'success',
            'message' => 'User and associated pets have been updated',
        ]);
    }

    public function destroy(User $user)
    {
        $user->delete();

        return back()->with([
            'type' => 'success',
            'message' => 'User has been deleted',
        ]);
    }
}

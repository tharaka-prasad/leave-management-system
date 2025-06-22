<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\RegisterRequest;
use App\Models\User;
use App\Providers\RouteServiceProvider;
use App\Repositories\All\User\UserInterface;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{

    protected $userInterface;

    public function __construct(UserInterface $userInterface)
    {
        $this->userInterface            = $userInterface;

    }

    public function store(RegisterRequest $request)
    {
        $validatedData                      = $request->validated();
        $validatedData['password']          = Hash::make($validatedData['password']);

        $user = $this->userInterface->create($validatedData);


        return response()->json([
            'message' => 'User registered successfully!',
            'user'    => $user,
        ], 201);
    }
}


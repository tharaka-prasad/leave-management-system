<?php
namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\RegisterRequest;
use App\Repositories\All\User\UserInterface;
use Illuminate\Support\Facades\Hash;
use Inertia\Response;

class RegisteredUserController extends Controller
{

    protected $userInterface;

    public function __construct(UserInterface $userInterface)
    {
        $this->userInterface = $userInterface;

    }

    public function store(RegisterRequest $request)
    {
        $validatedData             = $request->validated();
        $validatedData['password'] = Hash::make($validatedData['password']);

        $user = $this->userInterface->create($validatedData);

        return response()->json([
            'message' => 'User registered successfully!',
            'user'    => $user,
        ], 201);
    }
}

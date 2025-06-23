<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Repositories\All\User\UserInterface;
use Illuminate\Http\Request;

class userController extends Controller
{
protected $userInterface;

    public function __construct( UserInterface $userInterface)
    {
        $this->userInterface  = $userInterface;
    }

    public function allUsers()
    {
        return $this->userInterface->all();
    }

}

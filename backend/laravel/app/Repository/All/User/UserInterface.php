<?php
namespace App\Repositories\All\User;

use App\Repositories\Base\EloquentRepositoryInterface;

interface UserInterface extends EloquentRepositoryInterface
{
    public function findByEmail(string $email);
}

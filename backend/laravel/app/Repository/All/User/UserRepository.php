<?php
namespace App\Repositories\All\User;

use App\Models\User;
use App\Repositories\Base\BaseRepository;

// repository Class
class UserRepository extends BaseRepository implements UserInterface
{
    /**
     * @var User
     */
    protected $model;

    /**
     * BaseRepository constructor.
     */
    public function __construct(User $model)
    {
        $this->model = $model;
    }


}

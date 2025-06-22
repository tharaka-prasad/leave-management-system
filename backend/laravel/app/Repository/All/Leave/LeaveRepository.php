<?php
namespace App\Repositories\All\Leave;

use App\Models\Leave;
use App\Repositories\Base\BaseRepository;

// repository Class
class LeaveRepository extends BaseRepository implements LeaveInterface
{
    /**
     * @var Leave
     */
    protected $model;

    /**
     * BaseRepository constructor.
     */
    public function __construct(Leave $model)
    {
        $this->model = $model;
    }
   

}

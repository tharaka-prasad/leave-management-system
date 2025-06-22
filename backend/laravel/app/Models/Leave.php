<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Leave extends Model
{
    use HasFactory;

    protected $fillable = [
        'employee_id',
        'leave_type',
        'start_date',
        'end_date',
        'reason',
        'status',
        'created_by_id',
    ];

    public function employee()
    {
        return $this->belongsTo(User::class, 'employee_id', 'employee_id');
    }

    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by_id');
    }
}

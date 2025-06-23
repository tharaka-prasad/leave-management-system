<?php
namespace App\Http\Controllers\employee;

use App\Http\Controllers\Controller;
use App\Http\Requests\leave\LeaveRequest;
use App\Http\Requests\Leave\LeaveStatusUpdateRequest;
use App\Repositories\All\Leave\LeaveInterface;
use App\Repositories\All\User\UserInterface;
use Illuminate\Support\Facades\Auth;

class leaveController extends Controller
{
    protected $leaveInterface;
    protected $userInterface;

    public function __construct(LeaveInterface $leaveInterface, UserInterface $userInterface)
    {
        $this->leaveInterface = $leaveInterface;
        $this->userInterface  = $userInterface;
    }

    public function index()
    {
        $record = $this->leaveInterface->All()->sortByDesc('created_at')->sortByDesc('updated_at')->values();

        $record = $record->map(function ($leave) {

            try {
                $creator              = $this->userInterface->getById($leave->created_by_id);
                $leave->createdByUser = $creator ?? (object) ['name' => 'Unknown', 'id' => null];
            } catch (\Exception $e) {
                $leave->createdByUser = 'Unknown';
            }

            return $leave;
        });

        return response()->json($record, 200);
    }

    public function currentUserRecords()
    {
        $user = auth()->user();

        $record = $this->leaveInterface->All()
            ->where('created_by_id', $user->id)
            ->sortByDesc('created_at')
            ->sortByDesc('updated_at')
            ->values();

        $record = $record->map(function ($leave) {
            try {
                $creator              = $this->userInterface->getById($leave->created_by_id);
                $leave->createdByUser = $creator ?? (object) ['name' => 'Unknown', 'id' => null];
            } catch (\Exception $e) {
                $leave->createdByUser = 'Unknown';
            }

            return $leave;
        });

        return response()->json($record, 200);
    }

    public function store(LeaveRequest $request)
    {

        $user = Auth::user();
        if (! $user) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $userId                         = $user->id;
        $validatedData                  = $request->validated();
        $validatedData['created_by_id'] = $userId;

        $record = $this->leaveInterface->create($validatedData);

        return response()->json([
            'message' => 'Leave record created successfully!',
            'record'  => $record,
        ], 201);
    }

    public function update($id, LeaveRequest $request)
    {
        $record = $this->leaveInterface->findById($id);

        if (! $record) {
            return response()->json(['message' => 'Leave record not found.'], 404);
        }

        if ($record->status !== 'pending') {
            return response()->json(['message' => 'Only pending leave records can be updated.'], 403);
        }

        $validatedData = $request->validated();
        $updated       = $this->leaveInterface->update($id, $validatedData);

        if ($updated) {
            return response()->json([
                'message' => 'Leave record updated successfully!',
                'record'  => $this->leaveInterface->findById($id),
            ], 200);
        } else {
            return response()->json(['message' => 'Failed to update the leave record.'], 500);
        }
    }

    public function updateStatus($id, LeaveStatusUpdateRequest $request)
    {
        $record = $this->leaveInterface->findById($id);

        if (! $record) {
            return response()->json(['message' => 'Leave record not found.'], 404);
        }

        $updated = $this->leaveInterface->update($id, ['status' => $request->status]);

        return response()->json([
            'message' => $updated ? 'Leave status updated successfully!' : 'Failed to update status.',
            'record'  => $this->leaveInterface->findById($id),
        ], $updated ? 200 : 500);
    }

    public function destroy($id)
    {
        $deleted = $this->leaveInterface->deleteById($id);

        return response()->json([
            'message' => $deleted ? 'Record deleted successfully!' : 'Failed to delete record.',
        ], $deleted ? 200 : 500);
    }

    public function leaveStats()
    {
        $total    = $this->leaveInterface->All()->count();
        $approved = $this->leaveInterface->All()->where('status', 'approved')->count();
        $pending  = $this->leaveInterface->All()->where('status', 'pending')->count();
        $rejected = $this->leaveInterface->All()->where('status', 'rejected')->count();
        return response()->json([
            'total'    => $total,
            'approved' => $approved,
            'pending'  => $pending,
            'rejected' => $rejected,
        ]);
    }

}

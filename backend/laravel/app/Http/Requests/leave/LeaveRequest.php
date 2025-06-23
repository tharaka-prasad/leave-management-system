<?php
namespace App\Http\Requests\leave;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class LeaveRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'employee_id' => 'required|exists:users,employee_id',
            'leave_type'  => 'required|string',
            'start_date'  => 'required|string|after_or_equal:today',
            'end_date'    => 'required|string|after_or_equal:start_date',
            'reason'      => 'required|string|max:1000',
        ];
    }

    public function messages(): array
    {
        return [
            'employee_id.required'      => 'Employee ID is required.',
            'employee_id.exists'        => 'Employee not found.',
            'leave_type.required'       => 'Leave type is required.',
            'start_date.after_or_equal' => 'Start date must be today or later.',
            'end_date.after_or_equal'   => 'End date must be after or same as start date.',
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(
            response()->json([
                'message' => 'Validation failed',
                'errors'  => $validator->errors(),
            ], 422)
        );
    }
}

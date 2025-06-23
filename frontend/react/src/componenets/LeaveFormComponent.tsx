import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import { useMutation } from "@tanstack/react-query";
import { createLeave } from "../api/leaveApi";
import { leaveSchema } from "../api/leaveApi"; // adjust import if needed
import { z } from "zod";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const AddLeaveModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [leaveType, setLeaveType] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reason, setReason] = useState("");
  const [employeeId, setEmployeeId] = useState(""); // required by schema

  const [errors, setErrors] = useState<Record<string, string>>({});

  const mutation = useMutation({
    mutationFn: createLeave,
    onSuccess: () => {
      onClose();
      setLeaveType("");
      setStartDate("");
      setEndDate("");
      setReason("");
      setEmployeeId("");
      setErrors({});
    },
    onError: (error: any) => {
      console.error("Error submitting leave:", error);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const rawData = {
      id: 0, // backend usually ignores this on create
      employee_id: employeeId,
      leave_type: leaveType,
      start_date: startDate,
      end_date: endDate,
      reason: reason,
      status: "pending", // default on creation
      created_by_id: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const result = leaveSchema.safeParse(rawData);

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    mutation.mutate(result.data);
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
          <Dialog.Title className="text-lg font-semibold mb-4">Add Leave</Dialog.Title>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium">Employee ID</label>
              <input
                type="text"
                className="w-full border rounded p-2"
                value={employeeId}
                onChange={(e) => setEmployeeId(e.target.value)}
              />
              {errors.employee_id && <p className="text-sm text-red-500">{errors.employee_id}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium">Leave Type</label>
              <input
                type="text"
                className="w-full border rounded p-2"
                value={leaveType}
                onChange={(e) => setLeaveType(e.target.value)}
              />
              {errors.leave_type && <p className="text-sm text-red-500">{errors.leave_type}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium">Start Date</label>
              <input
                type="date"
                className="w-full border rounded p-2"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
              {errors.start_date && <p className="text-sm text-red-500">{errors.start_date}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium">End Date</label>
              <input
                type="date"
                className="w-full border rounded p-2"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
              {errors.end_date && <p className="text-sm text-red-500">{errors.end_date}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium">Reason</label>
              <textarea
                className="w-full border rounded p-2"
                rows={3}
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              ></textarea>
              {errors.reason && <p className="text-sm text-red-500">{errors.reason}</p>}
            </div>

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={mutation.isLoading}
                className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
              >
                {mutation.isLoading ? "Submitting..." : "Submit"}
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default AddLeaveModal;

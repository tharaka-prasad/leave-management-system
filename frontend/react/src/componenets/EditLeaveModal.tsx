import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import { updateLeaveRecord } from "../api/leaveApi";
import queryClient from "../state/queryClient";
import { X } from "lucide-react";

type LeaveFormInput = {
  employee_id: string;
  leave_type: string;
  start_date: string;
  end_date: string;
  reason: string;
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
  leave: any;
};

const EditLeaveModal: React.FC<Props> = ({ isOpen, onClose, leave }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LeaveFormInput>({
    defaultValues: {
      employee_id: leave.employee_id,
      leave_type: leave.leave_type,
      start_date: leave.start_date,
      end_date: leave.end_date,
      reason: leave.reason,
    },
  });
  const [selectedLeave, setSelectedLeave] = useState<any | null>(null);


  const { mutate, isPending } = useMutation({
    mutationFn: (data: LeaveFormInput) => updateLeaveRecord(leave.id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leave-details"] });
      enqueueSnackbar("Leave updated successfully!", { variant: "success" });
      reset();
      onClose();
    },
    onError: (error: any) => {
      enqueueSnackbar(
        error?.response?.data?.message || "Failed to update leave.",
        { variant: "error" }
      );
    },
  });

  const onSubmit = (data: LeaveFormInput) => {
    mutate(data);
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <Dialog.Title className="text-lg font-semibold">Edit Leave</Dialog.Title>
            <button onClick={onClose}><X className="w-5 h-5 text-gray-600" /></button>
          </div>
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label className="block text-sm font-medium">Employee ID</label>
              <input
                type="text"
                {...register("employee_id", { required: "Employee ID is required" })}
                className="w-full border rounded p-2"
              />
              {errors.employee_id && <p className="text-red-500 text-sm">{errors.employee_id.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium">Leave Type</label>
              <input
                type="text"
                {...register("leave_type", { required: "Leave type is required" })}
                className="w-full border rounded p-2"
              />
              {errors.leave_type && <p className="text-red-500 text-sm">{errors.leave_type.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium">Start Date</label>
              <input
                type="date"
                {...register("start_date", { required: "Start date is required" })}
                className="w-full border rounded p-2"
              />
              {errors.start_date && <p className="text-red-500 text-sm">{errors.start_date.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium">End Date</label>
              <input
                type="date"
                {...register("end_date", { required: "End date is required" })}
                className="w-full border rounded p-2"
              />
              {errors.end_date && <p className="text-red-500 text-sm">{errors.end_date.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium">Reason</label>
              <textarea
                {...register("reason", { required: "Reason is required" })}
                className="w-full border rounded p-2"
                rows={3}
              ></textarea>
              {errors.reason && <p className="text-red-500 text-sm">{errors.reason.message}</p>}
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
                disabled={isPending}
                className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
              >
                {isPending ? "Updating..." : "Update"}
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default EditLeaveModal;

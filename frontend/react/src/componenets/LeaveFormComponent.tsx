import React from "react";
import { Dialog } from "@headlessui/react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { enqueueSnackbar } from "notistack";
import queryClient from "../state/queryClient";
import { createLeaveRecord, type Leave } from "../api/leaveApi";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

type LeaveFormInput = Pick<
  Leave,
  "employee_id" | "leave_type" | "start_date" | "end_date" | "reason"
>;

const AddLeaveModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LeaveFormInput>({
    mode: "onChange",
  });

  const { mutate: createLeaveListReportMutation, isPending } = useMutation({
    mutationFn: createLeaveRecord,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leave-details"] });
      enqueueSnackbar("Leave Created Successfully!", { variant: "success" });
      reset();
      onClose();
    },
    onError: () => {
      enqueueSnackbar("Leave creation failed", { variant: "error" });
    },
  });

  const onSubmit = (data: LeaveFormInput) => {
    createLeaveListReportMutation({
      ...data,
      status: "pending",
      created_by_id: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
          <Dialog.Title className="text-lg font-semibold mb-4">Add Leave</Dialog.Title>
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label className="block text-sm font-medium">Employee ID</label>
              <input
                type="text"
                {...register("employee_id", { required: "Employee ID is required" })}
                className="w-full border rounded p-2"
              />
              {errors.employee_id && (
                <p className="text-sm text-red-500">{errors.employee_id.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium">Leave Type</label>
              <input
                type="text"
                {...register("leave_type", { required: "Leave type is required" })}
                className="w-full border rounded p-2"
              />
              {errors.leave_type && (
                <p className="text-sm text-red-500">{errors.leave_type.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium">Start Date</label>
              <input
                type="date"
                {...register("start_date", { required: "Start date is required" })}
                className="w-full border rounded p-2"
              />
              {errors.start_date && (
                <p className="text-sm text-red-500">{errors.start_date.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium">End Date</label>
              <input
                type="date"
                {...register("end_date", { required: "End date is required" })}
                className="w-full border rounded p-2"
              />
              {errors.end_date && (
                <p className="text-sm text-red-500">{errors.end_date.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium">Reason</label>
              <textarea
                {...register("reason", { required: "Reason is required" })}
                className="w-full border rounded p-2"
                rows={3}
              />
              {errors.reason && (
                <p className="text-sm text-red-500">{errors.reason.message}</p>
              )}
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
                className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
              >
                {isPending ? "Submitting..." : "Submit"}
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default AddLeaveModal;

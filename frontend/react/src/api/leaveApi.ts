import axios from "axios";
import { z } from "zod";
import { userSchema } from "./userApi";

export const leaveSchema = z.object({
    id: z.number(),
    user_id: z.number().optional(),
    employee_id: z.string(),
    leave_type: z.string(),
    start_date: z.string(),
    end_date: z.string(),
    reason: z.string(),
    status: z.enum(["pending", "approved", "rejected"]),
    created_by_id: z.number().nullable(),
    createdByUser: userSchema,
    created_at: z.string(),
    updated_at: z.string(),
});

export const leaveListSchema = z.array(leaveSchema);

export type Leave = z.infer<typeof leaveSchema>;
export type LeaveList = z.infer<typeof leaveListSchema>;

export async function getLeaves() {
    const res = await axios.get("/api/leaves-current-user");
    const parsed = leaveListSchema.parse(res.data);
    return parsed;
}
export async function getAllLeaves() {
    const res = await axios.get("/api/leaves");
    const parsed = leaveListSchema.parse(res.data);
    return parsed;
}

export const createLeaveRecord = async (data: LeaveList) => {
    const res = await axios.post("/api/leaves", data);
    console.log(data);
    return res.data;
};

export const updateLeaveRecord = async (id: number | string, data: LeaveList) => {
    const res = await axios.put(`/api/leaves/${id}/update`, data);
    return res.data;
};

export async function updateLeaveStatus(id: number | string, status: "approved" | "rejected") {
    try {
        const res = await axios.put(`/api/leaves/${id}/updateStatus`, { status });
        return res.data;
    } catch (error) {
        console.error("Error updating leave status:", error);
        throw error;
    }
}

export async function getLeaveStats(): Promise<{
  total: number;
  approved: number;
  pending: number;
  rejected: number;
}> {
  const res = await axios.get("/api/leave-stats");
  return res.data;
}

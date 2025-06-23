import axios from "axios";
import { z } from "zod";

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
  created_at: z.string(),
  updated_at: z.string(),
});

export const leaveListSchema = z.array(leaveSchema);

export type Leave = z.infer<typeof leaveSchema>;
export type LeaveList = z.infer<typeof leaveListSchema>;

export async function getLeaves() {
  const res = await axios.get("/api/leaves");
  const parsed = leaveListSchema.parse(res.data);
  return parsed;
}

export async function createLeave(data: LeaveList{
}): Promise<Leave> {
  const res = await axios.post("/api/leaves", data);
  const parsed = leaveSchema.parse(res.data.leave || res.data.data || res.data);
  return parsed;
}

export async function updateLeaveStatus(
  id: number,
  status: "pending" | "approved" | "rejected"
): Promise<Leave> {
  const res = await axios.put(`/api/leaves/${id}/status`, { status });
  const parsed = leaveSchema.parse(res.data.leave || res.data.data || res.data);
  return parsed;
}

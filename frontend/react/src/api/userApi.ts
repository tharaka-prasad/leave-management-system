import axios from "axios";
import { z } from "zod";
export const userSchema = z.object({
  id: z.number(),
  email: z.string(),
  userTypeId: z.number(),
  name: z.string(),
  mobile: z.string(),
  emailVerifiedAt: z.string().nullable(),
  role: z.string(),
  roleId: z.string(),
  gender: z.string(),
  availability: z.boolean(),
  responsibleSection: z.array(z.string()),
  status: z.string(),
  isCompanyEmployee: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
  department: z.string(),
  assignedFactory: z.array(z.string()),
  employeeNumber: z.string(),
  jobPosition: z.string(),
  assigneeLevel: z.number(),
});

export type User = z.infer<typeof userSchema>;

export async function validateUser() {
  const res = await axios.get("/api/user");
  return res.data;
}

export async function login({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const res = await axios.post("/api/login", {
    email,
    password,
  });
  return res.data;
}

export async function register({
  first_name,
  last_name,
  email,
  employee_id,
  password,
  password_confirmation,
}: {
  first_name: string;
  last_name: string;
  email: string;
  employee_id: string;
  password: string;
  password_confirmation: string;
}) {
  const res = await axios.post("/api/register", {
    first_name,
    last_name,
    email,
    employee_id,
    password,
    password_confirmation,
  });
  return res.data;
}

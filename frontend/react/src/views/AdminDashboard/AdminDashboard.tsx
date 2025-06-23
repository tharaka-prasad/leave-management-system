import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { FileText, BarChart3, CheckCircle, XCircle, AlertCircle, Users } from "lucide-react";
import { getAllLeaves, updateLeaveStatus, type LeaveList } from "../../api/leaveApi";
import { enqueueSnackbar } from "notistack";
import queryClient from "../../state/queryClient";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, CartesianGrid } from 'recharts';


type User = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
  status: string;
};

export default function UserLeaveDashboard() {
  const [selectedTab, setSelectedTab] = useState<"my_leaves" | "stats" | "users">("my_leaves");

  const { data: leavesData, refetch, isLoading, isError, error } = useQuery<LeaveList>({
    queryKey: ["leave-details"],
    queryFn: getAllLeaves,
  });

  const { data: usersData, isLoading: loadingUsers, isError: errorUsers } = useQuery<User[]>({
    queryKey: ["all-users"],
    queryFn: async () => {
      const res = await axios.get("/api/all-users");
      return res.data;
    },
  });

  const { mutate: mutateLeaveStatus } = useMutation({
    mutationFn: ({ id, status }: { id: number | string; status: "approved" | "rejected" }) =>
      updateLeaveStatus(id, status),
    onSuccess: (_data, variables) => {
      enqueueSnackbar(`Leave ${variables.status}`, { variant: "success" });
      queryClient.invalidateQueries({ queryKey: ["leave-details"] });
    },
    onError: () => {
      enqueueSnackbar("Failed to update leave status", { variant: "error" });
    },
  });

  const handleAction = (id: number | string, status: "approved" | "rejected") => {
    mutateLeaveStatus({ id, status });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "pending":
        return <AlertCircle className="w-4 h-4 text-yellow-500" />;
      case "rejected":
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        <div className="flex space-x-2 bg-white p-2 rounded-xl shadow-lg mb-8">
          <button
            onClick={() => setSelectedTab("my_leaves")}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${selectedTab === "my_leaves"
                ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`}
          >
            <FileText className="w-5 h-5" />
            <span>My Leaves</span>
          </button>

          <button
            onClick={() => setSelectedTab("stats")}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${selectedTab === "stats"
                ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`}
          >
            <BarChart3 className="w-5 h-5" />
            <span>Leave Stats</span>
          </button>

          <button
            onClick={() => setSelectedTab("users")}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${selectedTab === "users"
                ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`}
          >
            <Users className="w-5 h-5" />
            <span>Users</span>
          </button>
        </div>


        {selectedTab === "my_leaves" && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">My Leave Requests</h2>

            {isLoading && <p className="text-blue-600">Loading...</p>}
            {isError && (
              <p className="text-red-600">{(error as any)?.message || "Error fetching leaves"}</p>
            )}

            <div className="overflow-x-auto mt-4">
              <table className="w-full text-sm">
                <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
                  <tr>
                    <th className="px-6 py-3 text-left">Type</th>
                    <th className="px-6 py-3 text-left">Start</th>
                    <th className="px-6 py-3 text-left">End</th>
                    <th className="px-6 py-3 text-left">Status</th>
                    <th className="px-6 py-3 text-left">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {leavesData?.map((leave) => (
                    <tr key={leave.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">{leave.leave_type}</td>
                      <td className="px-6 py-4">{leave.start_date}</td>
                      <td className="px-6 py-4">{leave.end_date}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                            leave.status
                          )}`}
                        >
                          {getStatusIcon(leave.status)}
                          <span className="ml-1 capitalize">{leave.status}</span>
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          className="text-green-600 hover:underline mr-2"
                          onClick={() => handleAction(leave.id, "approved")}
                        >
                          Approve
                        </button>
                        <button
                          className="text-red-600 hover:underline"
                          onClick={() => handleAction(leave.id, "rejected")}
                        >
                          Reject
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {selectedTab === "stats" && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Leave Statistics</h2>

            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={[
                  { name: 'Approved', value: leavesData?.filter((l) => l.status === "approved").length ?? 0 },
                  { name: 'Pending', value: leavesData?.filter((l) => l.status === "pending").length ?? 0 },
                  { name: 'Rejected', value: leavesData?.filter((l) => l.status === "rejected").length ?? 0 },
                ]}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#3b82f6" /> 
              </BarChart>

              <div className="text-center text-xl text-gray-900 text-border-t ">
                <p className="text-gray-600 mb-4">Total Leaves: {leavesData?.length}</p>
              </div>
            </ResponsiveContainer>
          </div>
        )}

        {selectedTab === "users" && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
              <Users className="w-6 h-6 text-indigo-600" />
              <span>All Users</span>
            </h2>

            {loadingUsers && <p className="text-gray-600">Loading users...</p>}
            {errorUsers && <p className="text-red-600">Failed to load users</p>}

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
                  <tr>
                    <th className="px-6 py-3 text-left">Name</th>
                    <th className="px-6 py-3 text-left">Email</th>
                    <th className="px-6 py-3 text-left">Role</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {usersData?.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">{user.first_name} {user.last_name}</td>
                      <td className="px-6 py-4">{user.email}</td>
                      <td className="px-6 py-4 capitalize">{user.role}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

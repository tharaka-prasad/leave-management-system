import { useState } from "react";
import axios from "axios";
import {
  FileText,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react";
import { getAllLeaves, getLeaves, updateLeaveStatus } from "../../api/leaveApi";
import { useMutation, useQuery } from "@tanstack/react-query";
import AddLeaveModal from "../../componenets/LeaveFormComponent";
import { enqueueSnackbar } from "notistack";
import queryClient from "../../state/queryClient";

export default function UserLeaveDashboard() {
  const [selectedTab, setSelectedTab] = useState("my_leaves");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: leavesData, refetch, isLoading, isError, error } = useQuery({
    queryKey: ["leave-details"],
    queryFn: getAllLeaves,
  });

  const handleLeaveSubmit = async (formData: {
    type: string;
    startDate: string;
    endDate: string;
    reason: string;
  }) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://127.0.0.1:8000/api/leaves",
        {
          leave_type: formData.type,
          start_date: formData.startDate,
          end_date: formData.endDate,
          reason: formData.reason,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setIsModalOpen(false);
      await refetch(); // refresh data
    } catch (err) {
      console.error("Failed to submit leave:", err);
    }
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

  const { mutate: mutateLeaveStatus, isPending } = useMutation({
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


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex space-x-1 bg-white p-1 rounded-xl shadow-lg mb-8">
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
        </div>

        {isLoading && <p>Loading...</p>}
        {isError && (
          <p className="text-red-500">
            {(error as any)?.message || "Error fetching leaves"}
          </p>
        )}

        {selectedTab === "my_leaves" && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              My Leave Requests
            </h2>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
            >
              + Add Leave
            </button>

            {/* Modal Component */}
            <AddLeaveModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              onSubmit={handleLeaveSubmit}
            />

            <div className="overflow-x-auto mt-6">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Start Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      End Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {leavesData?.map((leave: any) => (
                    <tr key={leave.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {leave.leave_type}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {leave.start_date}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {leave.end_date}
                      </td>
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
                      <td className="px-6 py-4 text-sm text-gray-600">
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
      </div>
    </div>
  );
}

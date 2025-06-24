import React, { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { deleteMyLeaves, getLeaves, getMyLeaves } from "../../api/leaveApi";
import AddLeaveModal from "../../componenets/LeaveFormComponent";
import { FileText } from "lucide-react";
import EditLeaveModal from "../../componenets/EditLeaveModal";
import { closeSnackbar, enqueueSnackbar } from "notistack";
import queryClient from "../../state/queryClient";

const LeavesPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState("my_leaves");
  const [selectedLeave, setSelectedLeave] = useState<any | null>(null);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const { mutate: deleteLeaveMutation, isPending: isDeletePending } = useMutation({
    mutationFn: deleteMyLeaves,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leave-details"] });
      enqueueSnackbar("Leave deleted successfully", { variant: "success" });

    },
    onError: () => {
      enqueueSnackbar("Failed to delete leave", { variant: "error" });
    },
  });

  const handleDeleteClick = (id: number) => {
  enqueueSnackbar("Are you sure you want to delete this leave?", {
    variant: "warning",
    persist: true, // Keeps the snackbar until manually closed
    action: (snackbarId) => (
      <div>
        <button
          onClick={() => {
            deleteLeaveMutation(id); // Call mutation
            closeSnackbar(snackbarId);
          }}
          className="text-red-600 font-semibold mr-2"
        >
          Yes
        </button>
        <button
          onClick={() => closeSnackbar(snackbarId)}
          className="text-gray-500 font-semibold"
        >
          No
        </button>
      </div>
    ),
  });
};

  const handleEditClick = (leave: any) => {
    setSelectedLeave(leave);
    setIsEditModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsEditModalOpen(false);
    setSelectedLeave(null);
  };

  const { data: leavesData, isLoading, isError, error } = useQuery({
    queryKey: ["leave-details"],
    queryFn: getMyLeaves,
  });


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-6">
          <div className="flex space-x-2">
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

          <div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:text-blue-100 text-white px-5 py-2 rounded-lg shadow hover:shadow-md transition"
            >
              + Add Leave
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          {isLoading && (
            <p className="text-blue-600 text-sm">Loading leave requests...</p>
          )}

          <div className="overflow-x-auto mt-4">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
                <tr>
                  <th className="px-4 py-3">#</th>
                  <th className="px-4 py-3">Employee ID</th>
                  <th className="px-4 py-3">Leave Type</th>
                  <th className="px-4 py-3">Start Date</th>
                  <th className="px-4 py-3">End Date</th>
                  <th className="px-4 py-3">Reason</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Created By</th>
                  <th className="px-4 py-3">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {leavesData?.map((leave, index) => (
                  <tr key={leave.id} className="hover:bg-blue-50">
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2">{leave.employee_id}</td>
                    <td className="px-4 py-2">{leave.leave_type}</td>
                    <td className="px-4 py-2">{leave.start_date}</td>
                    <td className="px-4 py-2">{leave.end_date}</td>
                    <td className="px-4 py-2">{leave.reason}</td>
                    <td className="px-4 py-2 capitalize font-medium">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold
                    ${leave.status === "approved"
                            ? "bg-green-100 text-green-800"
                            : leave.status === "rejected"
                              ? "bg-red-100 text-red-800"
                              : "bg-yellow-100 text-yellow-800"}
                  `}
                      >
                        {leave.status}
                      </span>
                    </td>
                    <td className="px-4 py-2">{leave.created_by_id}</td>
                    <td className="px-6 py-4">
                      <button
                        className="text-green-600 hover:underline mr-2 disabled:text-gray-400 disabled:cursor-not-allowed"
                        onClick={() => handleEditClick(leave)}
                        disabled={leave.status === "approved" || leave.status === "rejected"}
                      >
                        Edit
                      </button>
                      <button
                        className="text-red-600 hover:underline disabled:text-gray-400 disabled:cursor-not-allowed"
                        disabled={leave.status === "approved" || leave.status === "rejected" || isDeletePending}
                        onClick={() => handleDeleteClick(leave.id)}
                      >
                        Delete
                      </button>

                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Edit Modal */}
            {selectedLeave && (
              <EditLeaveModal
                isOpen={isEditModalOpen}
                onClose={handleCloseModal}
                leave={selectedLeave}
              />
            )}
          </div>
        </div>

        <AddLeaveModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        {selectedLeave && (
          <EditLeaveModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            leave={selectedLeave}
          />
        )}
      </div>
    </div>
  );
};

export default LeavesPage;

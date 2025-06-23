import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getLeaves } from "../../api/leaveApi";
import AddLeaveModal from "../../componenets/LeaveFormComponent";

const LeavesPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: leavesData, isLoading, isError } = useQuery({
    queryKey: ["leave-details"],
    queryFn: getLeaves,
  });

  return (
    <div className="min-h-screen bg-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-blue-800">Leave Requests</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            + Add Leave
          </button>
        </div>

        <div className="overflow-x-auto bg-white rounded-lg shadow border border-blue-200">
          <table className="min-w-full bg-white">
            <thead className="bg-blue-100">
              <tr>
                <th className="px-4 py-2 border">#</th>
                <th className="px-4 py-2 border">Employee ID</th>
                <th className="px-4 py-2 border">Leave Type</th>
                <th className="px-4 py-2 border">Start Date</th>
                <th className="px-4 py-2 border">End Date</th>
                <th className="px-4 py-2 border">Reason</th>
                <th className="px-4 py-2 border">Status</th>
                <th className="px-4 py-2 border">Created By</th>
                <th className="px-4 py-2 border">Created At</th>
              </tr>
            </thead>
            <tbody>
              {isLoading && (
                <tr>
                  <td colSpan={9} className="text-center py-4 text-blue-600">
                    Loading...
                  </td>
                </tr>
              )}
              {isError && (
                <tr>
                  <td colSpan={9} className="text-center py-4 text-red-600">
                    Failed to load leave data.
                  </td>
                </tr>
              )}
              {leavesData?.map((leave, index) => (
                <tr key={leave.id} className="text-sm hover:bg-blue-50">
                  <td className="px-4 py-2 border text-center">{index + 1}</td>
                  <td className="px-4 py-2 border">{leave.employee_id}</td>
                  <td className="px-4 py-2 border">{leave.leave_type}</td>
                  <td className="px-4 py-2 border">{leave.start_date}</td>
                  <td className="px-4 py-2 border">{leave.end_date}</td>
                  <td className="px-4 py-2 border">{leave.reason}</td>
                  <td className="px-4 py-2 border capitalize">{leave.status}</td>
                  <td className="px-4 py-2 border">{leave.created_by_id}</td>
                  <td className="px-4 py-2 border">
                    {new Date(leave.created_at).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <AddLeaveModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </div>
    </div>
  );
};

export default LeavesPage;

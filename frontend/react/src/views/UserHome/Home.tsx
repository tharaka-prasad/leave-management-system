import { useState, useEffect } from "react";
import axios from "axios";
import {
  Calendar,
  Clock,
  FileText,
  CheckCircle,
  XCircle,
  AlertCircle,
  BarChart3,
  Settings,
} from "lucide-react";
import { getLeaves, type LeaveList } from "../../api/leaveApi";
import { useQuery } from "@tanstack/react-query";
import AddLeaveModal from "../../componenets/LeaveFormComponent";

export default function UserLeaveDashboard() {
  const [selectedTab, setSelectedTab] = useState("overview");
  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const [leaveForm, setLeaveForm] = useState({
    type: "",
    startDate: "",
    endDate: "",
    reason: "",
  });
  const [recentLeaves, setRecentLeaves] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchLeaves = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://127.0.0.1:8000/api/leaves", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRecentLeaves(
        res.data.map((leave) => ({
          id: leave.id,
          type: leave.leave_type,
          startDate: leave.start_date,
          endDate: leave.end_date,
          status: leave.status,
          days:
            (new Date(leave.end_date) - new Date(leave.start_date)) /
            (1000 * 60 * 60 * 24) +
            1,
        }))
      );
    } catch (err) {
      setError("Failed to load leaves");
    } finally {
      setLoading(false);
    }
  };

  const { data: leavesData } = useQuery({
    queryKey: ['leaves'],
    queryFn: getLeaves
  })

  useEffect(() => {
    if (selectedTab === "overview" || selectedTab === "history" || selectedTab === "my_leaves") {
      fetchLeaves();
    }
  }, [selectedTab]);

  const handleLeaveSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://127.0.0.1:8000/api/leaves",
        {
          leave_type: leaveForm.type,
          start_date: leaveForm.startDate,
          end_date: leaveForm.endDate,
          reason: leaveForm.reason,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setShowLeaveModal(false);
      setLeaveForm({ type: "", startDate: "", endDate: "", reason: "" });
      fetchLeaves();
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to submit leave request"
      );
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status) => {
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

  const getStatusColor = (status) => {
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
        <div className="flex space-x-1 bg-white p-1 rounded-xl shadow-lg mb-8">
          {[
            { id: "overview", label: "Overview", icon: BarChart3 },
            { id: "history", label: "Leave History", icon: FileText },
            { id: "my_leaves", label: "My Leaves", icon: FileText },
            { id: "calendar", label: "Calendar", icon: Calendar },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${selectedTab === tab.id
                ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
            >
              <tab.icon className="w-5 h-5" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {(loading || error) && (
          <div className="mb-4">
            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}
          </div>
        )}

        {selectedTab === "overview" && (
          <div> {/* existing overview UI unchanged */}
            {/* ... your overview code ... */}
          </div>
        )}

        {selectedTab === "history" && (
          <div> {/* existing history UI unchanged */}
            {/* ... your history code ... */}
          </div>
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

            <AddLeaveModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Start Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      End Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {recentLeaves.map((leavesData) => (
                    <tr key={leavesData.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {leavesData.type}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {leavesData.startDate}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {leavesData.endDate}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(leave.status)}`}>
                          {getStatusIcon(leaves.status)}
                          <span className="ml-1">
                            {leavesData.status.charAt(0).toUpperCase() + leavesData.status.slice(1)}
                          </span>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {selectedTab === "calendar" && (
          <div> {/* existing calendar UI unchanged */}
            {/* ... your calendar code ... */}
          </div>
        )}
      </div>

      {showLeaveModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Request Leave
            </h3>
            <div className="space-y-4">
              {/* Leave form fields unchanged */}
            </div>
            <div className="flex space-x-4 mt-6">
              <button
                onClick={() => setShowLeaveModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                onClick={handleLeaveSubmit}
                className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200"
                disabled={loading}
              >
                {loading ? 'Submitting...' : 'Submit Request'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

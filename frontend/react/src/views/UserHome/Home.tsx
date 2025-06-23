import { useState } from "react";
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

export default function UserLeaveDashboard() {
  const [selectedTab, setSelectedTab] = useState("overview");
  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const [leaveForm, setLeaveForm] = useState({
    type: "",
    startDate: "",
    endDate: "",
    reason: "",
  });

  const user = {
    name: "Sarah Johnson",
    id: "EMP001",
    department: "Software Development",
    position: "Senior Developer",
    avatar: "👩‍💻",
  };

  const leaveBalance = {
    annual: { used: 8, total: 25 },
    sick: { used: 3, total: 12 },
    personal: { used: 2, total: 5 },
  };

  const recentLeaves = [
    {
      id: 1,
      type: "Annual Leave",
      dates: "Dec 15-20, 2024",
      status: "approved",
      days: 4,
    },
    {
      id: 2,
      type: "Sick Leave",
      dates: "Nov 28, 2024",
      status: "approved",
      days: 1,
    },
    {
      id: 3,
      type: "Personal Leave",
      dates: "Oct 12-13, 2024",
      status: "pending",
      days: 2,
    },
  ];

  const upcomingLeaves = [
    { id: 1, type: "Annual Leave", dates: "Jan 15-19, 2025", days: 5 },
    { id: 2, type: "Personal Leave", dates: "Feb 14, 2025", days: 1 },
  ];

  const handleLeaveSubmit = () => {
    console.log("Leave request submitted:", leaveForm);
    setShowLeaveModal(false);
    setLeaveForm({ type: "", startDate: "", endDate: "", reason: "" });
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
      {/* Header */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="flex space-x-1 bg-white p-1 rounded-xl shadow-lg mb-8">
          {[
            { id: "overview", label: "Overview", icon: BarChart3 },
            { id: "history", label: "Leave History", icon: FileText },
            { id: "calendar", label: "Calendar", icon: Calendar },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                selectedTab === tab.id
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              <tab.icon className="w-5 h-5" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {selectedTab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Leave Balance Cards */}
            <div className="lg:col-span-2 space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Leave Balance
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    type: "Annual Leave",
                    ...leaveBalance.annual,
                    color: "from-blue-500 to-blue-600",
                    bgColor: "bg-blue-50",
                  },
                  {
                    type: "Sick Leave",
                    ...leaveBalance.sick,
                    color: "from-red-500 to-red-600",
                    bgColor: "bg-red-50",
                  },
                  {
                    type: "Personal Leave",
                    ...leaveBalance.personal,
                    color: "from-purple-500 to-purple-600",
                    bgColor: "bg-purple-50",
                  },
                ].map((leave, index) => (
                  <div
                    key={index}
                    className={`${leave.bgColor} rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-200`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-gray-800">
                        {leave.type}
                      </h3>
                      <Clock className="w-5 h-5 text-gray-600" />
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Used</span>
                        <span className="font-medium">{leave.used} days</span>
                      </div>
                      <div className="w-full bg-white rounded-full h-2">
                        <div
                          className={`bg-gradient-to-r ${leave.color} h-2 rounded-full transition-all duration-500`}
                          style={{
                            width: `${(leave.used / leave.total) * 100}%`,
                          }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Remaining</span>
                        <span className="font-bold text-gray-800">
                          {leave.total - leave.used} days
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Recent Leave Requests */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                  Recent Requests
                </h3>
                <div className="space-y-4">
                  {recentLeaves.map((leave) => (
                    <div
                      key={leave.id}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        {getStatusIcon(leave.status)}
                        <div>
                          <p className="font-medium text-gray-900">
                            {leave.type}
                          </p>
                          <p className="text-sm text-gray-600">
                            {leave.dates} • {leave.days} day
                            {leave.days > 1 ? "s" : ""}
                          </p>
                        </div>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          leave.status
                        )}`}
                      >
                        {leave.status.charAt(0).toUpperCase() +
                          leave.status.slice(1)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Upcoming Leaves Sidebar */}
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                  Upcoming Leaves
                </h3>
                <div className="space-y-4">
                  {upcomingLeaves.map((leave) => (
                    <div
                      key={leave.id}
                      className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200"
                    >
                      <p className="font-medium text-gray-900">{leave.type}</p>
                      <p className="text-sm text-gray-600 mt-1">
                        {leave.dates}
                      </p>
                      <p className="text-sm text-green-700 font-medium mt-2">
                        {leave.days} day{leave.days > 1 ? "s" : ""}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
                <h3 className="text-lg font-bold mb-4">Quick Stats</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Total Leaves Used</span>
                    <span className="font-bold">13 days</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Remaining Balance</span>
                    <span className="font-bold">29 days</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Pending Requests</span>
                    <span className="font-bold">1</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {selectedTab === "history" && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Leave History
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Dates
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Days
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {recentLeaves.map((leave) => (
                    <tr key={leave.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {leave.type}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {leave.dates}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {leave.days}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                            leave.status
                          )}`}
                        >
                          {getStatusIcon(leave.status)}
                          <span>
                            {leave.status.charAt(0).toUpperCase() +
                              leave.status.slice(1)}
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
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Leave Calendar
            </h2>
            <div className="text-center py-12 text-gray-500">
              <Calendar className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <p>Calendar view coming soon...</p>
            </div>
          </div>
        )}
      </div>

      {/* Leave Request Modal */}
      {showLeaveModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Request Leave
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Leave Type
                </label>
                <select
                  value={leaveForm.type}
                  onChange={(e) =>
                    setLeaveForm({ ...leaveForm, type: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select leave type</option>
                  <option value="annual">Annual Leave</option>
                  <option value="sick">Sick Leave</option>
                  <option value="personal">Personal Leave</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={leaveForm.startDate}
                    onChange={(e) =>
                      setLeaveForm({ ...leaveForm, startDate: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    End Date
                  </label>
                  <input
                    type="date"
                    value={leaveForm.endDate}
                    onChange={(e) =>
                      setLeaveForm({ ...leaveForm, endDate: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Reason
                </label>
                <textarea
                  value={leaveForm.reason}
                  onChange={(e) =>
                    setLeaveForm({ ...leaveForm, reason: e.target.value })
                  }
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Please provide a reason for your leave request..."
                />
              </div>
            </div>
            <div className="flex space-x-4 mt-6">
              <button
                onClick={() => setShowLeaveModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleLeaveSubmit}
                className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200"
              >
                Submit Request
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

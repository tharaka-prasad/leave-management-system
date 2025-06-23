import React, { useState } from 'react';
import { 
  Users, 
  Calendar, 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  Search,
  Filter,
  Download,
  Plus,
  Eye,
  Edit,
  Trash2,
  MoreVertical,
  UserPlus,
  Settings,
  Bell,
  BarChart3,
  PieChart,
  Activity,
  Building,
  Award,
  Target,
  Mail,
  Phone
} from 'lucide-react';

export default function AdminDashboard() {
  const [selectedTab, setSelectedTab] = useState('overview');
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

  // Mock data
  const dashboardStats = {
    totalEmployees: 247,
    pendingRequests: 23,
    approvedToday: 8,
    totalLeaveDays: 1842
  };

  const leaveRequests = [
    {
      id: 1,
      employee: { name: 'Sarah Johnson', id: 'EMP001', avatar: '👩‍💻', department: 'Engineering' },
      type: 'Annual Leave',
      dates: 'Jan 15-19, 2025',
      days: 5,
      status: 'pending',
      reason: 'Family vacation',
      appliedDate: '2025-01-10',
      manager: 'John Smith'
    },
    {
      id: 2,
      employee: { name: 'Mike Chen', id: 'EMP002', avatar: '👨‍💼', department: 'Marketing' },
      type: 'Sick Leave',
      dates: 'Jan 12, 2025',
      days: 1,
      status: 'approved',
      reason: 'Medical appointment',
      appliedDate: '2025-01-11',
      manager: 'Lisa Wang'
    },
    {
      id: 3,
      employee: { name: 'Emma Davis', id: 'EMP003', avatar: '👩‍🎨', department: 'Design' },
      type: 'Personal Leave',
      dates: 'Jan 20-21, 2025',
      days: 2,
      status: 'pending',
      reason: 'Personal matters',
      appliedDate: '2025-01-08',
      manager: 'David Kim'
    },
    {
      id: 4,
      employee: { name: 'Alex Rodriguez', id: 'EMP004', avatar: '👨‍🔬', department: 'Research' },
      type: 'Annual Leave',
      dates: 'Feb 5-9, 2025',
      days: 5,
      status: 'rejected',
      reason: 'Project deadline conflict',
      appliedDate: '2025-01-05',
      manager: 'Sarah Brown'
    }
  ];

  const departmentStats = [
    { name: 'Engineering', employees: 45, pending: 8, approved: 32, color: 'from-blue-500 to-blue-600' },
    { name: 'Marketing', employees: 32, pending: 5, approved: 18, color: 'from-green-500 to-green-600' },
    { name: 'Design', employees: 28, pending: 4, approved: 15, color: 'from-purple-500 to-purple-600' },
    { name: 'Sales', employees: 38, pending: 6, approved: 22, color: 'from-orange-500 to-orange-600' },
    { name: 'HR', employees: 15, pending: 2, approved: 8, color: 'from-pink-500 to-pink-600' }
  ];

  const recentActivity = [
    { id: 1, action: 'Leave approved', user: 'Sarah Johnson', time: '2 hours ago', type: 'approval' },
    { id: 2, action: 'New leave request', user: 'Mike Chen', time: '4 hours ago', type: 'request' },
    { id: 3, action: 'Leave rejected', user: 'Alex Rodriguez', time: '6 hours ago', type: 'rejection' },
    { id: 4, action: 'Employee added', user: 'Emma Wilson', time: '1 day ago', type: 'employee' }
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'pending': return <AlertCircle className="w-4 h-4 text-yellow-500" />;
      case 'rejected': return <XCircle className="w-4 h-4 text-red-500" />;
      default: return null;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleRequestAction = (requestId, action) => {
    console.log(`${action} request ${requestId}`);
    // Here you would typically make an API call
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <div className="bg-white shadow-lg border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Admin Dashboard
              </h1>
              <p className="text-gray-600 mt-1">Manage your organization's leave requests and attendance</p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-lg hover:shadow-xl">
                <UserPlus className="w-5 h-5" />
                <span>Add Employee</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl">
                <Download className="w-5 h-5" />
                <span>Export Report</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="flex space-x-1 bg-white p-1 rounded-xl shadow-lg mb-8">
          {[
            { id: 'overview', label: 'Overview', icon: BarChart3 },
            { id: 'requests', label: 'Leave Requests', icon: Calendar },
            { id: 'employees', label: 'Employees', icon: Users },
            { id: 'reports', label: 'Reports', icon: PieChart }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                selectedTab === tab.id
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {selectedTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { 
                  title: 'Total Employees', 
                  value: dashboardStats.totalEmployees, 
                  icon: Users, 
                  color: 'from-blue-500 to-blue-600',
                  bgColor: 'bg-blue-50',
                  change: '+12%',
                  changeType: 'positive'
                },
                { 
                  title: 'Pending Requests', 
                  value: dashboardStats.pendingRequests, 
                  icon: Clock, 
                  color: 'from-yellow-500 to-yellow-600',
                  bgColor: 'bg-yellow-50',
                  change: '-5%',
                  changeType: 'negative'
                },
                { 
                  title: 'Approved Today', 
                  value: dashboardStats.approvedToday, 
                  icon: CheckCircle, 
                  color: 'from-green-500 to-green-600',
                  bgColor: 'bg-green-50',
                  change: '+23%',
                  changeType: 'positive'
                },
                { 
                  title: 'Total Leave Days', 
                  value: dashboardStats.totalLeaveDays, 
                  icon: Calendar, 
                  color: 'from-purple-500 to-purple-600',
                  bgColor: 'bg-purple-50',
                  change: '+8%',
                  changeType: 'positive'
                }
              ].map((stat, index) => (
                <div key={index} className={`${stat.bgColor} rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 bg-gradient-to-r ${stat.color} rounded-lg shadow-lg`}>
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                    <span className={`text-sm font-medium px-2 py-1 rounded-full ${
                      stat.changeType === 'positive' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {stat.change}
                    </span>
                  </div>
                  <h3 className="text-gray-600 text-sm font-medium mb-2">{stat.title}</h3>
                  <p className="text-3xl font-bold text-gray-900">{stat.value.toLocaleString()}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Department Statistics */}
              <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Department Overview</h3>
                <div className="space-y-4">
                  {departmentStats.map((dept, index) => (
                    <div key={index} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className={`w-4 h-4 bg-gradient-to-r ${dept.color} rounded`}></div>
                          <h4 className="font-semibold text-gray-900">{dept.name}</h4>
                        </div>
                        <span className="text-sm text-gray-600">{dept.employees} employees</span>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Pending:</span>
                          <span className="font-medium text-yellow-600">{dept.pending}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Approved:</span>
                          <span className="font-medium text-green-600">{dept.approved}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Recent Activity</h3>
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className={`p-2 rounded-lg ${
                        activity.type === 'approval' ? 'bg-green-100' :
                        activity.type === 'request' ? 'bg-blue-100' :
                        activity.type === 'rejection' ? 'bg-red-100' : 'bg-purple-100'
                      }`}>
                        <Activity className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                        <p className="text-sm text-gray-600">{activity.user}</p>
                        <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {selectedTab === 'requests' && (
          <div className="space-y-6">
            {/* Search and Filter Bar */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 items-center justify-between">
                <div className="flex space-x-4 w-full sm:w-auto">
                  <div className="relative flex-1 sm:w-64">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search requests..."
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
                    />
                  </div>
                  <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    <Filter className="w-4 h-4" />
                    <span>Filter</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Leave Requests Table */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-xl font-bold text-gray-900">Leave Requests</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Leave Type</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dates</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Days</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {leaveRequests.map((request) => (
                      <tr key={request.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center space-x-3">
                            <div className="text-2xl">{request.employee.avatar}</div>
                            <div>
                              <div className="text-sm font-medium text-gray-900">{request.employee.name}</div>
                              <div className="text-sm text-gray-500">{request.employee.department}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{request.type}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{request.dates}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{request.days}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                            {getStatusIcon(request.status)}
                            <span>{request.status.charAt(0).toUpperCase() + request.status.slice(1)}</span>
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => {
                                setSelectedRequest(request);
                                setShowRequestModal(true);
                              }}
                              className="text-blue-600 hover:text-blue-700 p-1 hover:bg-blue-50 rounded transition-colors"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            {request.status === 'pending' && (
                              <>
                                <button
                                  onClick={() => handleRequestAction(request.id, 'approve')}
                                  className="text-green-600 hover:text-green-700 p-1 hover:bg-green-50 rounded transition-colors"
                                >
                                  <CheckCircle className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => handleRequestAction(request.id, 'reject')}
                                  className="text-red-600 hover:text-red-700 p-1 hover:bg-red-50 rounded transition-colors"
                                >
                                  <XCircle className="w-4 h-4" />
                                </button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {selectedTab === 'employees' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Employee Management</h3>
            <div className="text-center py-12 text-gray-500">
              <Users className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <p>Employee management interface coming soon...</p>
            </div>
          </div>
        )}

        {selectedTab === 'reports' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Reports & Analytics</h3>
            <div className="text-center py-12 text-gray-500">
              <PieChart className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <p>Advanced reporting dashboard coming soon...</p>
            </div>
          </div>
        )}
      </div>

      {/* Request Details Modal */}
      {showRequestModal && selectedRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Leave Request Details</h3>
              <button
                onClick={() => setShowRequestModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                <div className="text-3xl">{selectedRequest.employee.avatar}</div>
                <div>
                  <h4 className="font-semibold text-gray-900">{selectedRequest.employee.name}</h4>
                  <p className="text-sm text-gray-600">{selectedRequest.employee.id} • {selectedRequest.employee.department}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Leave Type</label>
                  <p className="text-gray-900">{selectedRequest.type}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                  <p className="text-gray-900">{selectedRequest.days} day{selectedRequest.days > 1 ? 's' : ''}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Dates</label>
                  <p className="text-gray-900">{selectedRequest.dates}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedRequest.status)}`}>
                    {getStatusIcon(selectedRequest.status)}
                    <span>{selectedRequest.status.charAt(0).toUpperCase() + selectedRequest.status.slice(1)}</span>
                  </span>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Reason</label>
                <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{selectedRequest.reason}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Applied Date</label>
                  <p className="text-gray-900">{selectedRequest.appliedDate}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Manager</label>
                  <p className="text-gray-900">{selectedRequest.manager}</p>
                </div>
              </div>
            </div>
            
            {selectedRequest.status === 'pending' && (
              <div className="flex space-x-4 mt-6 pt-6 border-t border-gray-200">
                <button
                  onClick={() => {
                    handleRequestAction(selectedRequest.id, 'approve');
                    setShowRequestModal(false);
                  }}
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200"
                >
                  Approve
                </button>
                <button
                  onClick={() => {
                    handleRequestAction(selectedRequest.id, 'reject');
                    setShowRequestModal(false);
                  }}
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-200"
                >
                  Reject
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
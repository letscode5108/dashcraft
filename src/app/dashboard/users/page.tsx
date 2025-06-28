"use client";

import React, { useState } from 'react';
import { ArrowLeft, Users, UserPlus, Search, MoreVertical, Mail, Phone, MapPin, Calendar } from 'lucide-react';

const UsersDetailPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterActive, setFilterActive] = useState('all');

  // Sample user data based on your dashboard metrics
  const users = [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@email.com",
      phone: "+1 (555) 123-4567",
      location: "New York, USA",
      joinDate: "2025-06-24",
      status: "active",
      plan: "Pro",
      lastActive: "2 hours ago"
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@email.com",
      phone: "+1 (555) 987-6543",
      location: "Los Angeles, USA",
      joinDate: "2025-06-23",
      status: "active",
      plan: "Basic",
      lastActive: "5 minutes ago"
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike.j@email.com",
      phone: "+1 (555) 456-7890",
      location: "Chicago, USA",
      joinDate: "2025-06-22",
      status: "inactive",
      plan: "Pro",
      lastActive: "2 days ago"
    },
    {
      id: 4,
      name: "Sarah Wilson",
      email: "sarah.w@email.com",
      phone: "+1 (555) 321-0987",
      location: "Miami, USA",
      joinDate: "2025-06-21",
      status: "active",
      plan: "Enterprise",
      lastActive: "1 hour ago"
    },
    {
      id: 5,
      name: "Alex Brown",
      email: "alex.brown@email.com",
      phone: "+1 (555) 654-3210",
      location: "Seattle, USA",
      joinDate: "2025-06-20",
      status: "active",
      plan: "Basic",
      lastActive: "30 minutes ago"
    }
  ];

  const stats = {
    totalUsers: 12345,
    newToday: 78,
    activeUsers: 5678,
    growthRate: "+12%"
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterActive === 'all' || user.status === filterActive;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string): string => {
    return status === 'active' ? 'bg-green-500' : 'bg-gray-500';
  };

  const getPlanColor = (plan: string): string => {
    switch (plan) {
      case 'Enterprise': return 'bg-purple-500';
      case 'Pro': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => window.history.back()}
              className="bg-white/10 hover:bg-white/20 backdrop-blur-xl p-3 rounded-xl transition-all duration-300 hover:scale-110 text-white border border-white/10"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">User Management</h1>
              <p className="text-blue-200/80">Manage and view all user accounts</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { title: "Total Users", value: stats.totalUsers.toLocaleString(), icon: Users, color: "from-blue-600 to-blue-400" },
            { title: "New Today", value: stats.newToday, icon: UserPlus, color: "from-green-600 to-green-400" },
            { title: "Active Users", value: stats.activeUsers.toLocaleString(), icon: Users, color: "from-purple-600 to-purple-400" },
            { title: "Growth Rate", value: stats.growthRate, icon: Users, color: "from-cyan-600 to-cyan-400" }
          ].map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div key={index} className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-200/70 text-sm font-medium mb-2">{stat.title}</p>
                    <p className="text-2xl font-bold text-white">{stat.value}</p>
                  </div>
                  <div className={`bg-gradient-to-r ${stat.color} p-3 rounded-xl`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Search and Filter */}
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 mb-6 border border-white/10">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
              <input
                type="text"
                placeholder="Search users by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-xl pl-10 pr-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-blue-400 transition-colors"
              />
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex bg-white/10 rounded-xl p-1 border border-white/20">
                {['all', 'active', 'inactive'].map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setFilterActive(filter)}
                    className={`px-4 py-2 rounded-lg capitalize transition-all duration-300 ${
                      filterActive === filter 
                        ? 'bg-blue-500 text-white' 
                        : 'text-white/70 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-white/5 border-b border-white/10">
                <tr>
                  <th className="text-left p-6 text-white font-semibold">User</th>
                  <th className="text-left p-6 text-white font-semibold">Contact</th>
                  <th className="text-left p-6 text-white font-semibold">Plan</th>
                  <th className="text-left p-6 text-white font-semibold">Status</th>
                  <th className="text-left p-6 text-white font-semibold">Last Active</th>
                  
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="p-6">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full flex items-center justify-center text-white font-semibold">
                          {user.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-white font-medium">{user.name}</p>
                          <p className="text-white/60 text-sm flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            Joined {new Date(user.joinDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="p-6">
                      <div className="space-y-1">
                        <p className="text-white/80 text-sm flex items-center">
                          <Mail className="w-4 h-4 mr-2" />
                          {user.email}
                        </p>
                        <p className="text-white/60 text-sm flex items-center">
                          <Phone className="w-4 h-4 mr-2" />
                          {user.phone}
                        </p>
                        <p className="text-white/60 text-sm flex items-center">
                          <MapPin className="w-4 h-4 mr-2" />
                          {user.location}
                        </p>
                      </div>
                    </td>
                    <td className="p-6">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium text-white ${getPlanColor(user.plan)}`}>
                        {user.plan}
                      </span>
                    </td>
                    <td className="p-6">
                      <div className="flex items-center space-x-2">
                        <div className={`w-2 h-2 rounded-full ${getStatusColor(user.status)}`}></div>
                        <span className="text-white/80 capitalize">{user.status}</span>
                      </div>
                    </td>
                    <td className="p-6">
                      <p className="text-white/80">{user.lastActive}</p>
                    </td>
                    <td className="p-6">
                      <button className="text-white/60 hover:text-white transition-colors">
                        <MoreVertical className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Results Summary */}
        <div className="mt-6 text-center">
          <p className="text-white/60">
            Showing {filteredUsers.length} of {users.length} users
          </p>
        </div>
      </div>
    </div>
  );
};

export default UsersDetailPage;
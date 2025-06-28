"use client"

import React, { useState } from 'react';
import { ArrowLeft, Activity, UserPlus, DollarSign, TrendingUp, Settings, Clock, User, Filter, Search, Calendar } from 'lucide-react';

const ActivitiesDetailPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [timeFilter, setTimeFilter] = useState('today');

  // Extended activity data based on your dashboard
  const activities = [
    {
      id: "act1",
      type: "New User",
      description: "User 'JohnDoe' signed up with Pro plan",
      timestamp: "2025-06-24T09:30:00Z",
      user: "JohnDoe",
      details: "Signed up via organic search",
      importance: "high"
    },
    {
      id: "act2",
      type: "Transaction",
      description: "Sale of Pro Plan to 'Acme Corp'",
      timestamp: "2025-06-24T09:15:00Z",
      user: "Acme Corp",
      details: "$299/month subscription",
      importance: "high"
    },
    {
      id: "act3",
      type: "Login",
      description: "User 'JaneSmith' logged in from mobile app",
      timestamp: "2025-06-24T08:50:00Z",
      user: "JaneSmith",
      details: "iOS App v2.1.0",
      importance: "medium"
    },
    {
      id: "act4",
      type: "Update",
      description: "Dashboard settings updated by 'AdminUser'",
      timestamp: "2025-06-24T08:20:00Z",
      user: "AdminUser",
      details: "Changed notification preferences",
      importance: "low"
    },
    {
      id: "act5",
      type: "Transaction",
      description: "Payment received from 'TechCorp'",
      timestamp: "2025-06-24T07:45:00Z",
      user: "TechCorp",
      details: "$150 monthly payment",
      importance: "high"
    },
    {
      id: "act6",
      type: "New User",
      description: "User 'AliceWonder' created account",
      timestamp: "2025-06-24T07:20:00Z",
      user: "AliceWonder",
      details: "Signed up via referral link",
      importance: "medium"
    },
    {
      id: "act7",
      type: "Login",
      description: "User 'BobBuilder' logged in",
      timestamp: "2025-06-24T06:55:00Z",
      user: "BobBuilder",
      details: "Desktop browser session",
      importance: "low"
    },
    {
      id: "act8",
      type: "Update",
      description: "Profile updated by 'CarolSinger'",
      timestamp: "2025-06-24T06:30:00Z",
      user: "CarolSinger",
      details: "Updated contact information",
      importance: "low"
    }
  ];

 
 
 
 
 
 

  const getActivityIcon = (type) => {
    switch (type) {
      case 'New User': return <UserPlus className="w-5 h-5" />;
      case 'Transaction': return <DollarSign className="w-5 h-5" />;
      case 'Login': return <User className="w-5 h-5" />;
      case 'Update': return <Settings className="w-5 h-5" />;
      default: return <Activity className="w-5 h-5" />;
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'New User': return 'from-green-500 to-emerald-400';
      case 'Transaction': return 'from-blue-500 to-cyan-400';
      case 'Login': return 'from-purple-500 to-pink-400';
      case 'Update': return 'from-orange-500 to-yellow-400';
      default: return 'from-gray-500 to-gray-400';
    }
  };

  const getImportanceColor = (importance) => {
    switch (importance) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return {
      time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      date: date.toLocaleDateString()
    };
  };

  const filteredActivities = activities.filter(activity => {
    const matchesSearch = activity.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         activity.user.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || activity.type === filterType;
    return matchesSearch && matchesType;
  });

  const activityTypes = ['all', 'New User', 'Transaction', 'Login', 'Update'];

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
              <h1 className="text-3xl font-bold text-white mb-2">Activity Timeline</h1>
              <p className="text-blue-200/80">Track all user activities and system events</p>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 mb-6 border border-white/10">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
              <input
                type="text"
                placeholder="Search activities by description or user..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-xl pl-10 pr-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-blue-400 transition-colors"
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex bg-white/10 rounded-xl p-1 border border-white/20">
                {activityTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => setFilterType(type)}
                    className={`px-3 py-2 rounded-lg text-sm transition-all duration-300 whitespace-nowrap ${
                      filterType === type 
                        ? 'bg-blue-500 text-white' 
                        : 'text-white/70 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
              <select 
                value={timeFilter}
                onChange={(e) => setTimeFilter(e.target.value)}
                className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-400 transition-colors"
              >
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
              </select>
            </div>
          </div>
        </div>

        {/* Activities Timeline */}
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
          <div className="space-y-4">
            {filteredActivities.map((activity, index) => {
              const timestamp = formatTimestamp(activity.timestamp);
              return (
                <div 
                  key={activity.id} 
                  className="group flex items-start space-x-4 p-6 bg-white/5 rounded-2xl hover:bg-white/10 transition-all duration-300 border border-white/5 hover:border-white/10"
                >
                  {/* Time Column */}
                  <div className="flex flex-col items-center text-center min-w-[80px]">
                    <span className="text-white font-semibold text-lg">{timestamp.time}</span>
                    <span className="text-white/60 text-sm">{timestamp.date}</span>
                  </div>

                  {/* Activity Icon */}
                  <div className={`bg-gradient-to-r ${getActivityColor(activity.type)} p-3 rounded-xl transition-all duration-300 group-hover:scale-110 shadow-lg`}>
                    {getActivityIcon(activity.type)}
                  </div>

                  {/* Activity Details */}
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <span className={`bg-gradient-to-r ${getActivityColor(activity.type)} px-3 py-1 rounded-full text-sm font-semibold text-white shadow-sm`}>
                          {activity.type}
                        </span>
                        <div className={`w-2 h-2 rounded-full ${getImportanceColor(activity.importance)}`}></div>
                      </div>
                      <span className="text-white/60 text-sm">{activity.user}</span>
                    </div>
                    <p className="text-white/90 mb-2 group-hover:text-white transition-colors">
                      {activity.description}
                    </p>
                    <p className="text-blue-300/70 text-sm">
                      {activity.details}
                    </p>
                  </div>

                  {/* Importance Indicator */}
                  <div className="flex flex-col items-center">
                    <div className={`w-3 h-3 rounded-full ${getImportanceColor(activity.importance)} mb-1`}></div>
                    <span className="text-white/50 text-xs capitalize">{activity.importance}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Results Summary */}
          <div className="mt-6 pt-6 border-t border-white/10 text-center">
            <p className="text-white/60">
              Showing {filteredActivities.length} of {activities.length} activities
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivitiesDetailPage;
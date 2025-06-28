"use client";

import React, { useState, useEffect } from 'react';
import { Bell, Users, UserPlus, Activity, DollarSign, TrendingUp, X, ArrowRight, Eye, ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

// Types (keeping your existing types)
interface Activity {
  id: string;
  type: string;
  description: string;
  timestamp: string;
}

interface AnalyticsSummary {
  widgetTitle: string;
  totalUsers: number;
  newSignupsToday: number;
  activeUsers: number;
  revenueToday: string;
  conversionRate: string;
  recentActivities: Activity[];
}

interface Notification {
  id: string;
  message: string;
  severity: 'high' | 'info' | 'low';
  read: boolean;
}

interface DashboardData {
  analyticsSummary: AnalyticsSummary;
  notifications: Notification[];
}

// API functions (keeping your existing structure)
const API_BASE_URL = 'https://satisfying-shell-megaraptor.glitch.me/';

async function fetchAnalyticsSummary(): Promise<AnalyticsSummary> {
  try {
    const response = await fetch(`${API_BASE_URL}/analyticsSummary`);
    if (!response.ok) {
      throw new Error('Failed to fetch analytics summary');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching analytics summary:', error);
    throw error;
  }
}

async function fetchNotifications(): Promise<Notification[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/notifications`);
    if (!response.ok) {
      throw new Error('Failed to fetch notifications');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching notifications:', error);
    throw error;
  }
}

async function fetchDashboardData(): Promise<DashboardData> {
  try {
    const [analyticsSummary, notifications] = await Promise.all([
      fetchAnalyticsSummary(),
      fetchNotifications()
    ]);
    
    return {
      analyticsSummary,
      notifications
    };
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    throw error;
  }
}

export default function DashboardWidget() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [animateCards, setAnimateCards] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const dashboardData = await fetchDashboardData();
        setData(dashboardData);
        setTimeout(() => setAnimateCards(true), 100);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'New User': return <UserPlus className="w-4 h-4" />;
      case 'Transaction': return <DollarSign className="w-4 h-4" />;
      case 'Login': return <Activity className="w-4 h-4" />;
      default: return <TrendingUp className="w-4 h-4" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-500';
      case 'info': return 'bg-blue-400';
      default: return 'bg-gray-400';
    }
  };

  // Navigation functions for "View More" actions
  const handleViewUserDetails = () => {
    router.push('/dashboard/users');
  };

  const handleViewActivityDetails = () => {
    router.push('/dashboard/activities');
  };

  const handleViewRevenueDetails = () => {
    router.push('/dashboard/revenue');
  };

 
 
 

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 p-6 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-cyan-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex items-center justify-center h-64">
            <div className="relative">
              <div className="animate-spin rounded-full h-20 w-20 border-4 border-blue-200/30"></div>
              <div className="animate-spin rounded-full h-20 w-20 border-b-4 border-white absolute top-0 left-0 animate-pulse"></div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div 
                key={i} 
                className="bg-white/5 backdrop-blur-xl rounded-3xl p-6 h-36 border border-white/10 animate-pulse-slow"
                style={{ animationDelay: `${i * 0.2}s` }}
              >
                <div className="animate-shimmer space-y-4">
                  <div className="h-4 bg-gradient-to-r from-blue-200/20 to-cyan-200/20 rounded-lg w-3/4"></div>
                  <div className="h-8 bg-gradient-to-r from-blue-200/20 to-cyan-200/20 rounded-lg w-1/2"></div>
                  <div className="h-3 bg-gradient-to-r from-blue-200/20 to-cyan-200/20 rounded-lg w-2/3"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-red-500/10 backdrop-blur-xl border border-red-400/30 rounded-3xl p-8 text-white animate-shake">
            <h3 className="text-2xl font-bold mb-4 text-red-300">Error Loading Data</h3>
            <p className="mb-6 text-red-200">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="bg-red-500/20 hover:bg-red-500/30 px-6 py-3 rounded-xl transition-all duration-500 transform hover:scale-105 active:scale-95 hover:shadow-lg border border-red-400/30"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!data) return null;

  const { analyticsSummary, notifications } = data;
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 p-6 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-cyan-400 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-12 animate-slide-down">
          <div className="text-center flex-1">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-white via-blue-200 to-cyan-300 bg-clip-text text-transparent mb-4 animate-fade-in-scale">
              {analyticsSummary.widgetTitle}
            </h1>
            <p className="text-blue-200/80 text-lg animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              Real-time insights and analytics
            </p>
          </div>
          
          {/* Notification Bell with View More */}
          <div className="relative animate-bounce-in" style={{ animationDelay: '0.5s' }}>
            <button
              onClick={() => setShowNotifications(true)}
              className="relative bg-white/10 hover:bg-white/20 backdrop-blur-xl p-4 rounded-2xl transition-all duration-500 hover:scale-110 active:scale-95 group border border-white/10 hover:border-white/20 hover:shadow-xl"
            >
              <Bell className="w-7 h-7 text-white transition-all duration-500 group-hover:animate-wiggle" />
              {unreadCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-sm font-bold rounded-full w-7 h-7 flex items-center justify-center animate-pulse-glow shadow-lg">
                  {unreadCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Metrics Cards with View More buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {[
            { 
              title: "TOTAL USERS", 
              value: analyticsSummary.totalUsers.toLocaleString(), 
              change: "↗ +234 from yesterday", 
              icon: Users,
              gradient: "from-blue-600 to-blue-400",
              delay: "0s",
              onClick: handleViewUserDetails
            },
            { 
              title: "NEW SIGNUPS TODAY", 
              value: analyticsSummary.newSignupsToday, 
              change: "↗ +12% vs last week", 
              icon: UserPlus,
              gradient: "from-cyan-600 to-cyan-400",
              delay: "0.1s",
              onClick: handleViewUserDetails
            },
            { 
              title: "ACTIVE USERS", 
              value: analyticsSummary.activeUsers.toLocaleString(), 
              change: "↗ +5.2% increase", 
              icon: Activity,
              gradient: "from-indigo-600 to-indigo-400",
              delay: "0.2s",
              onClick: handleViewActivityDetails
            },
            { 
              title: "REVENUE TODAY", 
              value: analyticsSummary.revenueToday, 
              change: "↗ +18% above target", 
              icon: DollarSign,
              gradient: "from-blue-700 to-blue-500",
              delay: "0.3s",
              
            }
          ].map((card, index) => {
            const IconComponent = card.icon;
            return (
              <div 
                key={index}
                className={`group bg-white/5 backdrop-blur-xl rounded-3xl p-8 text-white border border-white/10 hover:border-white/20 transition-all duration-700 hover:scale-105 hover:shadow-2xl transform cursor-pointer ${
                  animateCards ? 'animate-slide-up-stagger' : 'opacity-0 translate-y-8'
                } hover:bg-white/10`}
                style={{ animationDelay: card.delay }}
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex-1">
                    <p className="text-blue-200/70 text-sm font-semibold tracking-wider transition-colors duration-500 group-hover:text-white mb-3">
                      {card.title}
                    </p>
                    <p className="text-4xl font-bold mb-2 transform transition-all duration-500 group-hover:scale-110 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                      {card.value}
                    </p>
                    <p className="text-emerald-400 text-sm font-medium transition-all duration-500 group-hover:text-emerald-300">
                      {card.change}
                    </p>
                  </div>
                  <div className={`bg-gradient-to-r ${card.gradient} p-4 rounded-2xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-12 shadow-lg`}>
                    <IconComponent className="w-8 h-8 transition-transform duration-500 group-hover:scale-110" />
                  </div>
                </div>
                
                {/* View More Button */}
                <button
                  onClick={card.onClick}
                  className="w-full bg-white/10 hover:bg-white/20 text-white py-3 px-4 rounded-xl transition-all duration-500 transform hover:scale-105 active:scale-95 flex items-center justify-center space-x-2 group-hover:bg-gradient-to-r group-hover:from-blue-500/20 group-hover:to-cyan-500/20 border border-white/10 hover:border-white/20"
                >
                  <Eye className="w-4 h-4" />
                  <span className="font-medium">View Details</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activities with View More */}
          <div className="lg:col-span-2 bg-white/5 backdrop-blur-xl rounded-3xl p-8 text-white border border-white/10 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center">
                <div className="bg-gradient-to-r from-blue-500 to-cyan-400 p-3 rounded-xl mr-4">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold">Recent Activities</h3>
              </div>
              
              {/* View All Activities Button */}
              <button
                onClick={handleViewActivityDetails}
                className="bg-white/10 hover:bg-white/20 text-white py-2 px-4 rounded-xl transition-all duration-500 transform hover:scale-105 active:scale-95 flex items-center space-x-2 border border-white/10 hover:border-white/20"
              >
                <span className="text-sm font-medium">View All</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            
            <div className="space-y-4">
              {analyticsSummary.recentActivities.slice(0, 3).map((activity, index) => (
                <div 
                  key={activity.id} 
                  className="group flex items-center space-x-6 p-6 bg-white/5 rounded-2xl hover:bg-white/10 transition-all duration-500 transform hover:scale-102 hover:translate-x-2 border border-white/5 hover:border-white/10 animate-slide-in-right cursor-pointer"
                  style={{ animationDelay: `${0.8 + index * 0.1}s` }}
                  onClick={handleViewActivityDetails}
                >
                  <div className="bg-gradient-to-r from-blue-500 to-cyan-400 p-3 rounded-xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-12 shadow-lg">
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="bg-gradient-to-r from-blue-500 to-cyan-400 px-3 py-1 rounded-full text-sm font-semibold transition-all duration-500 group-hover:scale-105 shadow-sm">
                        {activity.type}
                      </span>
                    </div>
                    <p className="text-white/90 mb-1 transition-colors duration-500 group-hover:text-white">
                      {activity.description}
                    </p>
                    <p className="text-blue-300/70 text-sm transition-colors duration-500 group-hover:text-blue-200">
                      {formatTimestamp(activity.timestamp)}
                    </p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-white/40 group-hover:text-white transition-all duration-500 group-hover:translate-x-1" />
                </div>
              ))}
            </div>
          </div>

          {/* Conversion Rate */}
          <div className="bg-gradient-to-br from-emerald-500 via-cyan-500 to-blue-500 rounded-3xl p-8 text-white hover:shadow-2xl transition-all duration-700 transform hover:scale-105 hover:rotate-1 group animate-fade-in-up border border-white/20" style={{ animationDelay: '0.8s' }}>
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-6 transition-transform duration-500 group-hover:scale-105">
                Conversion Rate
              </h3>
              <div className="text-6xl font-bold mb-4 transition-all duration-700 group-hover:scale-110 drop-shadow-lg">
                {analyticsSummary.conversionRate}
              </div>
              <p className="text-white/80 text-lg transition-colors duration-500 group-hover:text-white mb-6">
                Current performance
              </p>
              <div className="w-full bg-white/20 rounded-full h-2 mb-6">
                <div className="bg-white h-2 rounded-full w-1/3 animate-progress-fill"></div>
              </div>
              
              {/* View Conversion Details Button */}
              <button
                onClick={handleViewRevenueDetails}
                className="w-full bg-white/20 hover:bg-white/30 text-white py-3 px-4 rounded-xl transition-all duration-500 transform hover:scale-105 active:scale-95 flex items-center justify-center space-x-2 border border-white/20 hover:border-white/30"
              >
                <Eye className="w-4 h-4" />
                <span className="font-medium">View Analysis</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Enhanced Notifications Sidebar */}
        {showNotifications && (
          <div className="fixed inset-0 z-50 flex">
            <div 
              className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in" 
              onClick={() => setShowNotifications(false)}
            ></div>
            <div className="bg-white/10 backdrop-blur-xl w-96 ml-auto h-full overflow-auto animate-slide-in-right border-l border-white/20">
              <div className="p-8 border-b border-white/20">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-white">Notifications</h3>
                  <button
                    onClick={() => setShowNotifications(false)}
                    className="text-white hover:text-blue-300 transition-all duration-500 transform hover:scale-110 hover:rotate-90 active:scale-95 p-2 rounded-xl hover:bg-white/10"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>
              
              <div className="p-8">
                {notifications.length === 0 ? (
                  <div className="text-center py-12 animate-fade-in">
                    <Bell className="w-16 h-16 text-white/30 mx-auto mb-6 animate-float" />
                    <p className="text-white/60 text-lg">No notifications</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {notifications.slice(0, 5).map((notification, index) => (
                      <div 
                        key={notification.id} 
                        className="group bg-white/5 rounded-2xl p-6 hover:bg-white/10 transition-all duration-500 transform hover:scale-102 border border-white/10 hover:border-white/20 animate-slide-in-up"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <div className="flex items-start space-x-4">
                          <div className={`w-3 h-3 rounded-full mt-2 transition-all duration-500 ${notification.read ? 'bg-white/30' : 'bg-red-500 animate-pulse-glow'}`}></div>
                          <div className="flex-1">
                            <p className="text-white/90 transition-colors duration-500 group-hover:text-white mb-3">
                              {notification.message}
                            </p>
                            <div className="flex items-center space-x-3">
                              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getSeverityColor(notification.severity)} text-white transition-transform duration-500 group-hover:scale-105 shadow-sm`}>
                                {notification.severity.toUpperCase()}
                              </span>
                              {!notification.read && (
                                <span className="bg-gradient-to-r from-red-500 to-pink-500 px-3 py-1 rounded-full text-xs font-semibold text-white animate-pulse-glow shadow-sm">
                                  NEW
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    

                
                
                
                
                
                  </div>
                )}
                
                {notifications.length > 0 && (
                  <button className="w-full mt-8 bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 text-white py-4 rounded-2xl transition-all duration-500 transform hover:scale-105 active:scale-95 font-semibold shadow-lg">
                    Mark all as read
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        
        @keyframes wiggle {
          0%, 7% { transform: rotateZ(0); }
          15% { transform: rotateZ(-15deg); }
          20% { transform: rotateZ(10deg); }
          25% { transform: rotateZ(-10deg); }
          30% { transform: rotateZ(6deg); }
          35% { transform: rotateZ(-4deg); }
          40%, 100% { transform: rotateZ(0); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 5px rgba(239, 68, 68, 0.5); }
          50% { box-shadow: 0 0 20px rgba(239, 68, 68, 0.8); }
        }
        
        @keyframes progress-fill {
          0% { width: 0%; }
          100% { width: 33%; }
        }
        
        @keyframes fade-in-scale {
          0% { opacity: 0; transform: scale(0.8); }
          100% { opacity: 1; transform: scale(1); }
        }
        
        @keyframes slide-down {
          0% { opacity: 0; transform: translateY(-30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes bounce-in {
          0% { opacity: 0; transform: scale(0.3); }
          50% { opacity: 1; transform: scale(1.05); }
          70% { transform: scale(0.9); }
          100% { opacity: 1; transform: scale(1); }
        }
        
        @keyframes slide-up-stagger {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
          20%, 40%, 60%, 80% { transform: translateX(5px); }
        }

        .animate-blob { animation: blob 7s infinite; }
        .animate-wiggle { animation: wiggle 1s ease-in-out; }
        .animate-float { animation: float 3s ease-in-out infinite; }
        .animate-shimmer { animation: shimmer 1.5s infinite; }
        .animate-pulse-glow { animation: pulse-glow 2s infinite; }
        .animate-progress-fill { animation: progress-fill 2s ease-out; }
        .animate-fade-in-scale { animation: fade-in-scale 1s ease-out; }
        .animate-slide-down { animation: slide-down 0.8s ease-out; }
        .animate-bounce-in { animation: bounce-in 0.8s ease-out; }
        .animate-slide-up-stagger { animation: slide-up-stagger 0.6s ease-out forwards; }
        .animate-shake { animation: shake 0.8s ease-in-out; }
        .animate-pulse-slow { animation: pulse 3s infinite; }
        
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
        
        .hover\\:scale-102:hover { transform: scale(1.02); }
      `}</style>
    </div>
  );
}
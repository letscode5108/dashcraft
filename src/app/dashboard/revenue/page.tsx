"use client";
import React, { useState } from 'react';
import { ArrowLeft, DollarSign, TrendingUp, Users,  CreditCard, Wallet, PieChart } from 'lucide-react';

const RevenuePage = () => {
  const [timeFilter, setTimeFilter] = useState('today');
 

  // Revenue data
  const revenueStats = {
    totalRevenue: 45680,
    todayRevenue: 1240,
    monthlyRevenue: 28450,
    averagePerUser: 89.50,
    growth: 12.5,
    transactions: 342
  };

  const revenueBreakdown = [
    {
      id: 1,
      plan: "Pro Plan",
      revenue: 18500,
      users: 185,
      percentage: 40.5,
      color: "from-blue-600 to-blue-400"
    },
    {
      id: 2,
      plan: "Basic Plan",
      revenue: 12200,
      users: 488,
      percentage: 26.7,
      color: "from-green-600 to-green-400"
    },
    {
      id: 3,
      plan: "Enterprise",
      revenue: 14980,
      users: 45,
      percentage: 32.8,
      color: "from-purple-600 to-purple-400"
    }
  ];


  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount);
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
              <h1 className="text-3xl font-bold text-white mb-2">Revenue Analytics</h1>
              <p className="text-blue-200/80">Track earnings, transactions, and revenue growth</p>
            </div>
          </div>

        </div>

        {/* Revenue Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { 
              title: "Total Revenue", 
              value: formatCurrency(revenueStats.totalRevenue), 
              icon: DollarSign, 
              color: "from-green-600 to-green-400",
              change: `+${revenueStats.growth}%`
            },
            { 
              title: "Today's Revenue", 
              value: formatCurrency(revenueStats.todayRevenue), 
              icon: Wallet, 
              color: "from-blue-600 to-blue-400",
              change: "+8.2%"
            },
            { 
              title: "Monthly Revenue", 
              value: formatCurrency(revenueStats.monthlyRevenue), 
              icon: TrendingUp, 
              color: "from-purple-600 to-purple-400",
              change: "+15.3%"
            },
            { 
              title: "Avg Per User", 
              value: formatCurrency(revenueStats.averagePerUser), 
              icon: Users, 
              color: "from-cyan-600 to-cyan-400",
              change: "+5.7%"
            }
          ].map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div key={index} className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
                <div className="flex items-center justify-between mb-4">
                  <div className={`bg-gradient-to-r ${stat.color} p-3 rounded-xl`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-green-400 text-sm font-semibold flex items-center">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    {stat.change}
                  </span>
                </div>
                <p className="text-blue-200/70 text-sm font-medium mb-2">{stat.title}</p>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
              </div>
            );
          })}
        </div>

        {/* Revenue Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Plan Revenue Breakdown */}
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white flex items-center">
                <PieChart className="w-5 h-5 mr-2" />
                Revenue by Plan
              </h3>
              <select 
                value={timeFilter}
                onChange={(e) => setTimeFilter(e.target.value)}
                className="bg-white/10 border border-white/20 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-400"
              >
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
              </select>
            </div>
            <div className="space-y-4">
              {revenueBreakdown.map((plan) => (
                <div key={plan.id} className="bg-white/5 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${plan.color}`}></div>
                      <span className="text-white font-semibold">{plan.plan}</span>
                    </div>
                    <span className="text-white/60 text-sm">{plan.users} users</span>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl font-bold text-white">{formatCurrency(plan.revenue)}</span>
                    <span className="text-blue-300 text-sm font-semibold">{plan.percentage}%</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full bg-gradient-to-r ${plan.color}`}
                      style={{ width: `${plan.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2" />
              Quick Insights
            </h3>
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                <div>
                  <p className="text-white/70 text-sm">Total Transactions</p>
                  <p className="text-2xl font-bold text-white">{revenueStats.transactions}</p>
                </div>
                <CreditCard className="w-8 h-8 text-blue-400" />
              </div>
              <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                <div>
                  <p className="text-white/70 text-sm">Growth Rate</p>
                  <p className="text-2xl font-bold text-green-400">+{revenueStats.growth}%</p>
                </div>
                <TrendingUp className="w-8 h-8 text-green-400" />
              </div>
              <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                <div>
                  <p className="text-white/70 text-sm">Conversion Rate</p>
                  <p className="text-2xl font-bold text-white">4.2%</p>
                </div>
                <Users className="w-8 h-8 text-purple-400" />
              </div>
            </div>
          </div>
        </div>




        
      </div>
    </div>
  );
};

export default RevenuePage;
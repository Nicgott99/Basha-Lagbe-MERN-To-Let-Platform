import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import {
  HomeIcon,
  UsersIcon,
  ClipboardDocumentListIcon,
  BellIcon,
  ChartBarIcon,
  CurrencyDollarIcon,
  EyeIcon,
  PlusIcon,
  ArrowTrendingUpIcon,
  BuildingOfficeIcon,
  CheckCircleIcon,
  ClockIcon,
  ExclamationTriangleIcon
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const { currentUser } = useSelector((state) => state.user);
  const [stats, setStats] = useState({
    totalProperties: 0,
    activeListings: 0,
    totalApplications: 0,
    totalRevenue: 0,
    viewsThisMonth: 0,
    pendingReviews: 0
  });

  const [recentActivities, setRecentActivities] = useState([
    { id: 1, type: 'application', message: 'New application received for Modern Apartment', time: '2 hours ago', status: 'new' },
    { id: 2, type: 'inquiry', message: 'Inquiry from John Doe about Luxury Villa', time: '4 hours ago', status: 'pending' },
    { id: 3, type: 'property', message: 'Property "Cozy Studio" approved', time: '1 day ago', status: 'approved' },
    { id: 4, type: 'review', message: 'New review received - 5 stars', time: '2 days ago', status: 'positive' }
  ]);

  const quickActions = [
    { name: 'Add Property', icon: PlusIcon, href: '/add-property', color: 'bg-blue-500 hover:bg-blue-600' },
    { name: 'View Applications', icon: ClipboardDocumentListIcon, href: '/applications', color: 'bg-green-500 hover:bg-green-600' },
    { name: 'Manage Inquiries', icon: UsersIcon, href: '/inquiries', color: 'bg-purple-500 hover:bg-purple-600' },
    { name: 'Profile Settings', icon: EyeIcon, href: '/profile', color: 'bg-indigo-500 hover:bg-indigo-600' }
  ];

  const statCards = [
    { name: 'Total Properties', value: stats.totalProperties, icon: HomeIcon, color: 'bg-gradient-to-r from-blue-500 to-blue-600', change: '+12%' },
    { name: 'Active Listings', value: stats.activeListings, icon: BuildingOfficeIcon, color: 'bg-gradient-to-r from-green-500 to-green-600', change: '+8%' },
    { name: 'Applications', value: stats.totalApplications, icon: ClipboardDocumentListIcon, color: 'bg-gradient-to-r from-purple-500 to-purple-600', change: '+23%' },
    { name: 'Total Revenue', value: `$${stats.totalRevenue.toLocaleString()}`, icon: CurrencyDollarIcon, color: 'bg-gradient-to-r from-amber-500 to-amber-600', change: '+15%' },
    { name: 'Monthly Views', value: stats.viewsThisMonth.toLocaleString(), icon: EyeIcon, color: 'bg-gradient-to-r from-pink-500 to-pink-600', change: '+31%' },
    { name: 'Pending Reviews', value: stats.pendingReviews, icon: ChartBarIcon, color: 'bg-gradient-to-r from-indigo-500 to-indigo-600', change: '-5%' }
  ];

  useEffect(() => {
    // Simulate loading stats
    setStats({
      totalProperties: 12,
      activeListings: 8,
      totalApplications: 34,
      totalRevenue: 45680,
      viewsThisMonth: 1240,
      pendingReviews: 3
    });
  }, []);

  const getActivityIcon = (type, status) => {
    switch (type) {
      case 'application':
        return <ClipboardDocumentListIcon className="w-5 h-5 text-blue-500" />;
      case 'inquiry':
        return <UsersIcon className="w-5 h-5 text-green-500" />;
      case 'property':
        return status === 'approved' ? <CheckCircleIcon className="w-5 h-5 text-green-500" /> : <ClockIcon className="w-5 h-5 text-yellow-500" />;
      case 'review':
        return <ChartBarIcon className="w-5 h-5 text-purple-500" />;
      default:
        return <BellIcon className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Welcome back, {currentUser?.fullName || currentUser?.username || 'User'}!
              </h1>
              <p className="text-gray-600 mt-1">Here's what's happening with your properties today.</p>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to="/add-property"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <PlusIcon className="w-5 h-5 mr-2" />
                Add Property
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {statCards.map((stat, index) => (
            <motion.div
              key={stat.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className={`${stat.color} p-6 text-white`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100 text-sm font-medium">{stat.name}</p>
                    <p className="text-3xl font-bold mt-2">{stat.value}</p>
                    <div className="flex items-center mt-2">
                      <ArrowTrendingUpIcon className="w-4 h-4 mr-1" />
                      <span className="text-sm">{stat.change} from last month</span>
                    </div>
                  </div>
                  <div className="bg-white bg-opacity-20 rounded-full p-3">
                    <stat.icon className="w-8 h-8" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                {quickActions.map((action, index) => (
                  <motion.div
                    key={action.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      to={action.href}
                      className={`${action.color} text-white p-4 rounded-xl flex items-center space-x-3 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105`}
                    >
                      <action.icon className="w-6 h-6" />
                      <span className="font-medium">{action.name}</span>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Activities */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Recent Activities</h3>
                <Link
                  to="/notifications"
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
                >
                  View All
                  <BellIcon className="w-4 h-4 ml-1" />
                </Link>
              </div>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start space-x-4 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex-shrink-0">
                      {getActivityIcon(activity.type, activity.status)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">{activity.message}</p>
                      <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                    </div>
                    <div className="flex-shrink-0">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        activity.status === 'new' ? 'bg-blue-100 text-blue-800' :
                        activity.status === 'approved' ? 'bg-green-100 text-green-800' :
                        activity.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-purple-100 text-purple-800'
                      }`}>
                        {activity.status}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Performance Chart Placeholder */}
        <div className="mt-8">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Property Performance</h3>
            <div className="h-64 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl flex items-center justify-center">
              <div className="text-center">
                <ChartBarIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Analytics chart will be displayed here</p>
                <p className="text-sm text-gray-400 mt-2">Track your property views, applications, and revenue over time</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { 
  Users, 
  FileCheck, 
  Zap, 
  TrendingUp, 
  Clock, 
  Activity,
  Layers,
  PieChart as PieIcon
} from "lucide-react";
import StatsCard from "./StatsCard";
import { UploadActivityChart, SkillsChart, StatusDonut } from "./DashboardCharts";
import { toast } from "react-hot-toast";

const Profile = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activities, setActivities] = useState([]);

  const backendURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [statsRes, resumesRes] = await Promise.all([
          axios.get(`${backendURL}/api/resume/stats`, { withCredentials: true }),
          axios.get(`${backendURL}/api/resume/getallresume`, { withCredentials: true })
        ]);

        if (statsRes.data.success) {
          setStats(statsRes.data.data);
        }
        
        // Use last 5 resumes as recent activity
        setActivities(resumesRes.data.slice(0, 5).map(r => ({
          id: r._id,
          type: 'upload',
          message: `New resume uploaded: ${r.metadata?.filename || 'Unnamed'}`,
          time: r.metadata?.uploadedAt
        })));

      } catch (err) {
        toast.error("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-gray-500 font-medium animate-pulse">Initializing Dashboard...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 pt-24 pb-12 px-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight">
              Executive Overview
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1 font-medium italic">
              AI-driven insights for your talent pipeline
            </p>
          </div>
          <div className="flex items-center gap-3 bg-white dark:bg-gray-800 p-2 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
            <span className="flex h-3 w-3 relative ml-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            <span className="text-sm font-bold text-gray-700 dark:text-gray-300 mr-2">System Active</span>
          </div>
        </div>

        {/* KPI Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard 
            title="Total Resumes" 
            value={stats?.totalResumes || 0} 
            icon={Users} 
            trend={12} 
            color="bg-indigo-600"
          />
          <StatsCard 
            title="Processed Today" 
            value={stats?.processedToday || 0} 
            icon={FileCheck} 
            trend={-5} 
            color="bg-green-600"
          />
          <StatsCard 
            title="Avg. Match Score" 
            value={`${Math.round((stats?.avgMatchScore || 0) * 100)}%`} 
            icon={Zap} 
            color="bg-amber-500"
          />
          <StatsCard 
            title="In-Pipe" 
            value={stats?.statusDistribution?.find(s => s._id === 'pending')?.count || 0} 
            icon={Clock} 
            color="bg-purple-600"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Charts */}
          <div className="lg:col-span-2 space-y-8">
            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               className="bg-white dark:bg-gray-800 p-8 rounded-[2.5rem] shadow-xl border border-gray-100 dark:border-gray-700"
            >
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-3">
                  <TrendingUp className="text-indigo-600" />
                  Upload Velocity
                </h3>
              </div>
              <UploadActivityChart data={stats?.dailyUploads || []} />
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-white dark:bg-gray-800 p-8 rounded-[2.5rem] shadow-xl border border-gray-100 dark:border-gray-700"
              >
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-3">
                  <Layers className="text-purple-600" />
                  Top Skills
                </h3>
                <SkillsChart data={stats?.topSkills || []} />
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="bg-white dark:bg-gray-800 p-8 rounded-[2.5rem] shadow-xl border border-gray-100 dark:border-gray-700 text-center"
              >
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2 flex items-center justify-center gap-3">
                  <PieIcon className="text-green-600" />
                  Status Mix
                </h3>
                <StatusDonut data={stats?.statusDistribution || []} />
              </motion.div>
            </div>
          </div>

          {/* Activity Feed Sidebar */}
          <div className="lg:col-span-1">
            <motion.div 
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               className="bg-white dark:bg-gray-800 p-8 rounded-[2.5rem] shadow-xl border border-gray-100 dark:border-gray-700 h-full"
            >
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-8 flex items-center gap-3">
                <Activity className="text-rose-500" />
                Live Feed
              </h3>
              <div className="space-y-8 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-100 dark:before:bg-gray-700">
                {activities.map((act, i) => (
                  <div key={act.id} className="relative pl-10">
                    <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-white dark:bg-gray-800 border-4 border-indigo-600 shadow-md"></div>
                    <p className="text-sm font-bold text-gray-800 dark:text-white mb-1 leading-tight">
                      {act.message}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-gray-400 font-medium">
                      <Clock className="w-3 h-3" />
                      {new Date(act.time).toLocaleTimeString()} • {new Date(act.time).toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-10 py-4 bg-gray-50 dark:bg-gray-900 rounded-2xl text-indigo-600 font-bold hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-all border border-transparent hover:border-indigo-100">
                View All Events
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

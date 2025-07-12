import React, { useEffect, useState} from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  BarChart3, 
  MessageCircle, 
  Calendar,
  Flame,
  TrendingUp,
  Smile,
  Heart,
  Plus
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/shared/Button';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import api from "../Api/api";

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState([]);
  const [recentEntries, setRecentEntries] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        
        const response = await api.get("/dashboard/dashboard-stats", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const apiData = response.data;

        const formattedStats = [
          {
            icon: BookOpen,
            label: "Journal Entries",
            value: apiData.totalJournals,
            trend: "More to go!",
            color: "text-blue-600",
          },
          {
            icon: Flame,
            label: "Current Streak",
            value: `${apiData.currentStreak} days`,
            trend: "Keep it up!",
            color: "text-orange-600",
          },
          {
            icon: TrendingUp,
            label: "Mood Score",
            value: apiData.moodScore?.toUpperCase(),
            color: "text-green-600",
          },
          {
            icon: MessageCircle,
            label: "Chat Sessions",
            value: apiData.chatSessions,
            color: "text-purple-600",
          },
        ];

        setStats(formattedStats);
      } catch (error) {
        console.error("Failed to fetch dashboard stats:", error);
        toast.error("Unable to load dashboard data.");
      }
    };

    fetchStats();
  }, []);

  useEffect(() => {
    const fetchRecentEntries = async () => {
      try {
        const response = await api.get('/dashboard/recent-entries', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        // Enhance mood with icon & color
        const enriched = response.data.map((entry) => {
          const mood = entry.mood?.toUpperCase();
          const moodData = moodIconMap[mood] || { icon: Smile, color: 'text-neutral-500' };
          return {
            ...entry,
            preview: entry.content.slice(0, 100) + '...',
            moodIcon: moodData.icon,
            moodColor: moodData.color,
          };
        });

        setRecentEntries(enriched);
      } catch (err) {
        toast.error('Failed to load recent entries');
        console.error(err);
      }
    };

    fetchRecentEntries();
  }, []);


  const quickActions = [
    {
      icon: Plus,
      label: 'New Entry',
      description: 'Write in your journal',
      path: '/journal',
      color: 'bg-blue-500'
    },
    {
      icon: MessageCircle,
      label: 'Chat with AI',
      description: 'Get support and insights',
      path: '/chat',
      color: 'bg-purple-500'
    },
    {
      icon: BarChart3,
      label: 'View Analytics',
      description: 'Track your progress',
      path: '/analytics',
      color: 'bg-green-500'
    }
  ];

  const moodIconMap = {
  HAPPY: { icon: Smile, color: 'text-yellow-500' },
  CALM: { icon: Heart, color: 'text-pink-500' },
  MOTIVATED: { icon: TrendingUp, color: 'text-blue-500' },
  SAD: { icon: Heart, color: 'text-gray-500' },
  ANXIOUS: { icon: Heart, color: 'text-red-500' },
  NEUTRAL: { icon: Heart, color: 'text-pink-400' },
 
};

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
          Welcome back, {user?.name?.split(' ')[0]}!
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400">
          Here's your wellness journey overview
        </p>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {Array.isArray(stats) && stats.length > 0 ? (
  stats.map((stat, index) => (
    <div
      key={index}
      className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-700"
    >
      <div className="flex items-center justify-between mb-4">
        <div
          className={`p-2 rounded-lg bg-neutral-100 dark:bg-neutral-700 ${stat.color}`}
        >
          {stat.icon && <stat.icon className="w-5 h-5" />}
        </div>
      </div>
      <div>
        <p className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-1">
          {stat.value}
        </p>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-1">
          {stat.label}
        </p>
        <p className="text-xs text-green-600 dark:text-green-400">
          {stat.trend}
        </p>
      </div>
    </div>
  ))
) : (
  <p className="col-span-4 text-center text-neutral-500">No stats available.</p>
)}
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-white dark:bg-neutral-800 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-700 p-6"
      >
        <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {quickActions.map((action, index) => (
            <Link
              key={index}
              to={action.path}
              className="flex items-center p-4 rounded-lg border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors group"
            >
              <div className={`p-3 rounded-lg ${action.color} text-white mr-4`}>
                <action.icon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-medium text-neutral-900 dark:text-neutral-100 group-hover:text-primary transition-colors">
                  {action.label}
                </h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  {action.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </motion.div>

      {/* Recent Entries */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="bg-white dark:bg-neutral-800 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-700 p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
            Recent Entries
          </h2>
          <Link to="/journal">
            <Button variant="outline" size="sm">
              View All
            </Button>
          </Link>
        </div>
        <div className="space-y-4">
          {recentEntries.map((entry) => (
            <div key={entry.id} className="flex items-start space-x-4 p-4 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors">
              <div className="flex-shrink-0">
                <div className={`p-2 rounded-lg bg-neutral-100 dark:bg-neutral-700 ${entry.moodColor}`}>
                  <entry.moodIcon className="w-5 h-5" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-neutral-900 dark:text-neutral-100">
                    {entry.title}
                  </h3>
                  <span className="text-sm text-neutral-500 dark:text-neutral-400">
                    {new Date(entry.date).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2">
                  {entry.preview}
                </p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
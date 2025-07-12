import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  TrendingUp,
  BarChart3,
  Activity,
  Download,
  BookOpen,
  MessageCircle,
  Flame,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";

import axios from "axios";
import api from "../Api/api";

const AnalyticsPage = () => {
  const [stats, setStats] = useState([]);
  const [weeklyData, setWeeklyData] = useState([]);
  const [moodDistribution, setMoodDistribution] = useState([]);

  const COLORS = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6"];
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchStats = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await api.get(
          "/dashboard/dashboard-stats",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

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
      }
    };

    fetchStats();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchWeeklyData = async () => {
      try {
        const response = await api.get(
          "/analytics/weekly",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = response.data.map((item) => ({
          ...item,
          day: item.day.substring(0, 3), // Optional: shorten "Monday" to "Mon"
        }));

        setWeeklyData(data);
      } catch (error) {
        console.error("Error fetching weekly data:", error);
      }
    };

    fetchWeeklyData();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchMoodDistribution = async () => {
      try {
        const response = await api.get(
          "/analytics/mood-distribution",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const dataWithColors = response.data.map((item, index) => ({
          ...item,
          color: COLORS[index % COLORS.length],
          count: item.percentage, // required for dataKey
        }));

        setMoodDistribution(dataWithColors);
      } catch (error) {
        console.error("Failed to fetch mood distribution", error);
      }
    };

    fetchMoodDistribution();
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">
            Analytics
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400">
            Track your wellness journey progress
          </p>
        </div>
      </motion.div>

      {/* Key Metrics */}
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
          <p className="col-span-4 text-center text-neutral-500">
            No stats available.
          </p>
        )}
      </motion.div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Activity */}

        {weeklyData.some((d) => d.entries > 0) ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white dark:bg-neutral-800 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-700 p-6"
          >
            <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-6">
              Weekly Activity
            </h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="day" tick={{ fill: "#6b7280" }} />
                  <YAxis tick={{ fill: "#6b7280" }} />
                  <Tooltip />
                  <Bar dataKey="entries" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white dark:bg-neutral-800 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-700 p-6 flex items-center justify-center h-64"
          >
            <p className="text-neutral-500 dark:text-neutral-400">
              No journal activity yet this week.
            </p>
          </motion.div>
        )}

        {/* Mood Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white dark:bg-neutral-800 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-700 p-6"
        >
          <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-6">
            Mood Distribution
          </h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={moodDistribution}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="count"
                  label={({ mood, percent }) =>
                    `${mood} ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {moodDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AnalyticsPage;

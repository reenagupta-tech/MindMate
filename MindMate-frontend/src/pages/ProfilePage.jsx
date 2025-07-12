import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Camera,
  Edit2,
  Save,
  X,
  Mail,
  User,
  Calendar,
  Shield,
  Bell,
  Moon,
  Sun,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";
import Button from "../components/shared/Button";
import toast from "react-hot-toast";

const ProfilePage = () => {
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const [formData] = useState({ 
    username : user?.username || "",
    email: user?.email || "",
    bio: "Mental wellness enthusiast on a journey of self-discovery and growth.",
    joinDate: "2024-01-01",
  });

  const [settings, setSettings] = useState({
    notifications: true,
    emailUpdates: false,
    publicProfile: false,
    dataSharing: false,
  });

  const handleSettingChange = (key) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">
          Profile
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400">
          Manage your account and preferences
        </p>
      </motion.div>

      {/* Profile Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-white dark:bg-neutral-800 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-700 p-6"
      >
        <div className="flex items-center gap-6 mb-6">
          {/* Profile Picture */}
          <div className="relative w-20 h-20 rounded-full bg-neutral-200 dark:bg-neutral-700 flex items-center justify-center border-2 border-neutral-300 dark:border-neutral-600">
            <User className="w-10 h-10 text-neutral-600 dark:text-neutral-300" />
          </div>

          {/* Email and Bio */}
          <div>
             <p className= "text-neutral-600 dark:text-neutral-400 text-sm">
              {formData.username}
            </p>
            <p className="text-neutral-600 dark:text-neutral-400 text-sm">
              {formData.email}
            </p>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-2">
              {formData.bio}
            </p>
           
          </div>
        </div>

        {/* Notification Settings */}
        <div className="space-y-4">
          <h3 className="font-medium text-neutral-900 dark:text-neutral-100">
            Settings
          </h3>

          {Object.entries(settings).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <div>
                <p className="font-medium text-neutral-900 dark:text-neutral-100 capitalize">
                  {key.replace(/([A-Z])/g, " $1").trim()}
                </p>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  {key === "notifications" &&
                    "Receive push notifications for reminders"}
                  {key === "emailUpdates" &&
                    "Get wellness tips and updates via email"}
                  {key === "publicProfile" &&
                    "Allow others to see your profile"}
                  {key === "dataSharing" &&
                    "Share anonymized data for research"}
                </p>
              </div>
              <button
                onClick={() => handleSettingChange(key)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  value ? "bg-primary" : "bg-neutral-200 dark:bg-neutral-700"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    value ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};
export default ProfilePage;

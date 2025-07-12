import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Home, 
  BookOpen, 
  BarChart3, 
  MessageCircle, 
  User, 
  LogOut,
  Sun,
  Moon,
  Brain
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';

const Navigation = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  const navItems = [
    { path: '/dashboard', icon: Home, label: 'Dashboard' },
    { path: '/journal', icon: BookOpen, label: 'Journal' },
    { path: '/analytics', icon: BarChart3, label: 'Analytics' },
    { path: '/chat', icon: MessageCircle, label: 'AI Chat' },
    { path: '/profile', icon: User, label: 'Profile' }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <aside className="hidden lg:flex fixed left-0 top-0 h-full w-64 bg-white dark:bg-neutral-800 border-r border-neutral-200 dark:border-neutral-700 flex-col transition-colors">
      {/* Logo */}
      <div className="p-6 border-b border-neutral-200 dark:border-neutral-700">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
            MindMate
          </h1>
        </div>
      </div>


      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 ${
              isActive(item.path)
                ? 'bg-primary text-white shadow-lg'
                : 'text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700'
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium">{item.label}</span>
          </Link>
        ))}
      </nav>

      {/* User Section */}
      <div className="p-4 border-t border-neutral-200 dark:border-neutral-700">
        <div className="flex items-center space-x-3 mb-4">
           <div className="relative w-15 h-15 rounded-full bg-neutral-200 dark:bg-neutral-700 flex items-center justify-center border-2 border-neutral-300 dark:border-neutral-600">
                      <User className="w-5 h-5 text-neutral-600 dark:text-neutral-300" />
                    </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100 truncate">
              {user?.name}
            </p>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 truncate">
              {user?.email}
            </p>
          </div>
        </div>
        
        <div className="flex space-x-2">
          <button
            onClick={toggleTheme}
            className="flex-1 flex items-center justify-center p-2 rounded-lg text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </button>
          <button
            onClick={logout}
            className="flex-1 flex items-center justify-center p-2 rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
            aria-label="Logout"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Navigation;
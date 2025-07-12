import React from 'react';
import { motion } from 'framer-motion';
import Navigation from './Navigation';
import MobileNavigation from './MobileNavigation';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 transition-colors">
      <Navigation />
      <main className="lg:ml-64 min-h-screen">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="p-4 lg:p-8 pb-20 lg:pb-8"
        >
          {children}
        </motion.div>
      </main>
      <MobileNavigation />
    </div>
  );
};

export default Layout;
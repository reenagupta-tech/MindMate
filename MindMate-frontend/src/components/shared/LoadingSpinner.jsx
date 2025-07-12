import React from 'react';
import { motion } from 'framer-motion';
import { Brain } from 'lucide-react';

const LoadingSpinner = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-neutral-900">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-4"
        >
          <Brain className="w-8 h-8 text-white" />
        </motion.div>
        <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
          MindMate
        </h2>
        <p className="text-neutral-600 dark:text-neutral-400">
          Loading your wellness journey...
        </p>
      </motion.div>
    </div>
  );
};

export default LoadingSpinner;
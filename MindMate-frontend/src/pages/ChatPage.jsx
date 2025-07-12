import React from 'react';
import { motion } from 'framer-motion';
import ChatWindow from '../components/chat/ChatWindow';

const ChatPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="h-full"
    >
      <ChatWindow />
    </motion.div>
  );
};

export default ChatPage;
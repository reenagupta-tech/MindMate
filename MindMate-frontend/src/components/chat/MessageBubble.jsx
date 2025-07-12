import React from 'react';
import { motion } from 'framer-motion';
import { Bot, User } from 'lucide-react';

const MessageBubble = ({ message, user }) => {
  const isUser = message.sender === 'user';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex items-start gap-2 ${isUser ? 'flex-row-reverse' : ''}`}
    >
      {/* Avatar */}
      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
        isUser ? 'bg-secondary' : 'bg-primary'
      }`}>
        {isUser ? (
          user?.avatar ? (
            <img
              src={user.avatar}
              alt={user.name}
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            <User className="w-4 h-4 text-white" />
          )
        ) : (
          <Bot className="w-4 h-4 text-white" />
        )}
      </div>

      {/* Message */}
      <div className={`max-w-xs sm:max-w-md lg:max-w-lg ${isUser ? 'ml-12' : 'mr-12'}`}>
        <div className={`rounded-2xl px-4 py-2 ${
          isUser 
            ? 'bg-primary text-white' 
            : 'bg-neutral-100 dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100'
        }`}>
          <p className="text-sm whitespace-pre-wrap">{message.text}</p>
        </div>
        
        {/* Timestamp */}
        <p className={`text-xs text-neutral-500 dark:text-neutral-400 mt-1 ${
          isUser ? 'text-right' : 'text-left'
        }`}>
          {new Date(message.timestamp).toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit' 
          })}
        </p>
      </div>
    </motion.div>
  );
};

export default MessageBubble;
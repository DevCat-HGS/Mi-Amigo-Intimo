import React from 'react';
import { motion } from 'framer-motion';

type ChatMessageProps = {
  content: string;
  sender: 'user' | 'ai';
};

const ChatMessage: React.FC<ChatMessageProps> = ({ content, sender }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex ${sender === 'user' ? 'justify-end' : 'justify-start'} mb-4`}
    >
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-2 ${
          sender === 'user'
            ? 'bg-purple-600 text-white rounded-br-none'
            : 'bg-white text-gray-800 rounded-bl-none'
        } shadow-md`}
      >
        <p className="text-sm">{content}</p>
      </div>
    </motion.div>
  );
};

export default ChatMessage;
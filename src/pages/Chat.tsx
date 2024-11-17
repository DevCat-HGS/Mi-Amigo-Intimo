import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Sparkles, Loader2 } from 'lucide-react';
import ChatMessage from '../components/ChatMessage';
import { useChatStore } from '../store/chatStore';

const Chat = () => {
  const [input, setInput] = useState('');
  const { messages, isLoading, sendMessage } = useChatStore();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const message = input.trim();
    setInput('');
    await sendMessage(message);
  };

  return (
    <div className="flex flex-col h-screen pt-16 pb-24 md:pt-24 md:pb-16">
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="max-w-2xl mx-auto">
          {messages.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-12"
            >
              <Sparkles className="w-12 h-12 mx-auto text-purple-500 mb-4" />
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                Welcome to Your Safe Space
              </h2>
              <p className="text-gray-600">
                Share your thoughts and feelings. I'm here to listen and support you.
              </p>
            </motion.div>
          ) : (
            messages.map((message) => (
              <ChatMessage
                key={message.id}
                content={message.content}
                sender={message.sender}
              />
            ))
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="fixed bottom-16 left-0 right-0 bg-white/80 backdrop-blur-lg border-t border-gray-200 p-4 md:bottom-0">
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 rounded-full px-4 py-2 border border-gray-300 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading}
            className="bg-purple-600 text-white rounded-full p-2 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
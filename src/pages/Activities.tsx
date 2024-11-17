import React from 'react';
import { motion } from 'framer-motion';
import { Gamepad2 } from 'lucide-react';
import BubbleGame from '../components/games/BubbleGame';

const Activities = () => {
  return (
    <div className="min-h-screen pt-16 pb-24 md:pt-24 md:pb-16 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <Gamepad2 className="w-12 h-12 mx-auto text-purple-500 mb-4" />
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Emotional Games
          </h1>
          <p className="text-gray-600">
            Play games that help you understand and process your emotions
          </p>
        </motion.div>

        <div className="grid gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Emotion Bubbles
            </h2>
            <p className="text-gray-600 mb-4">
              Pop the bubbles that match how you're feeling. Each color represents a different emotion.
            </p>
            <BubbleGame />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Activities;
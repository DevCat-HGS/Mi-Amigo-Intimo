import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Wind, Timer, Heart } from 'lucide-react';

const exercises = [
  {
    id: 1,
    title: 'Breathing Exercise',
    description: 'Follow the circle to breathe in and out',
    duration: 180, // 3 minutes
    type: 'breathing'
  },
  {
    id: 2,
    title: 'Body Scan',
    description: 'Guided meditation to relax your body',
    duration: 300, // 5 minutes
    type: 'meditation'
  },
  {
    id: 3,
    title: 'Gratitude Practice',
    description: 'Focus on things you're grateful for',
    duration: 120, // 2 minutes
    type: 'gratitude'
  }
];

const Mindfulness = () => {
  const [selectedExercise, setSelectedExercise] = useState<typeof exercises[0] | null>(null);
  const [isExercising, setIsExercising] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isExercising && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsExercising(false);
    }
    return () => clearInterval(timer);
  }, [isExercising, timeLeft]);

  const startExercise = (exercise: typeof exercises[0]) => {
    setSelectedExercise(exercise);
    setTimeLeft(exercise.duration);
    setIsExercising(true);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen pt-16 pb-24 md:pt-24 md:pb-16 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <Wind className="w-12 h-12 mx-auto text-purple-500 mb-4" />
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Mindfulness Exercises
          </h1>
          <p className="text-gray-600">
            Take a moment to center yourself and find peace
          </p>
        </motion.div>

        {isExercising && selectedExercise ? (
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <h2 className="text-2xl font-semibold mb-4">{selectedExercise.title}</h2>
            <div className="relative w-48 h-48 mx-auto mb-6">
              <motion.div
                className="absolute inset-0 border-4 border-purple-500 rounded-full"
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <Timer className="w-8 h-8 text-purple-500" />
                <span className="ml-2 text-2xl font-bold">{formatTime(timeLeft)}</span>
              </div>
            </div>
            <button
              onClick={() => setIsExercising(false)}
              className="bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-700 transition-colors"
            >
              End Exercise
            </button>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {exercises.map((exercise) => (
              <motion.div
                key={exercise.id}
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-xl shadow-lg p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-gray-800">
                    {exercise.title}
                  </h2>
                  {exercise.type === 'breathing' ? (
                    <Wind className="text-purple-500" />
                  ) : exercise.type === 'meditation' ? (
                    <Heart className="text-purple-500" />
                  ) : (
                    <Timer className="text-purple-500" />
                  )}
                </div>
                <p className="text-gray-600 mb-4">{exercise.description}</p>
                <p className="text-sm text-gray-500 mb-4">
                  Duration: {formatTime(exercise.duration)}
                </p>
                <button
                  onClick={() => startExercise(exercise)}
                  className="w-full bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Start Exercise
                </button>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Mindfulness;
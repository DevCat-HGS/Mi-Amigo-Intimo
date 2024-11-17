import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Target, Plus, Check, Trash2 } from 'lucide-react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useGoalsStore, Goal } from '../store/goalsStore';
import Confetti from 'react-confetti';

const Goals = () => {
  const [showNewGoal, setShowNewGoal] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [newGoal, setNewGoal] = useState({
    title: '',
    description: '',
    targetDate: '',
    milestones: [{ id: crypto.randomUUID(), title: '', completed: false }]
  });

  const { goals, addGoal, updateProgress, completeMilestone, deleteGoal } = useGoalsStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addGoal(newGoal);
    setShowNewGoal(false);
    setNewGoal({
      title: '',
      description: '',
      targetDate: '',
      milestones: [{ id: crypto.randomUUID(), title: '', completed: false }]
    });
  };

  const handleMilestoneComplete = (goal: Goal, milestoneId: string) => {
    completeMilestone(goal.id, milestoneId);
    if (goal.milestones.every((m) => m.completed || m.id === milestoneId)) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000);
    }
  };

  return (
    <div className="min-h-screen pt-16 pb-24 md:pt-24 md:pb-16 px-4">
      {showConfetti && <Confetti />}
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <Target className="w-12 h-12 mx-auto text-purple-500 mb-4" />
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Emotional Goals
          </h1>
          <p className="text-gray-600">Set and track your emotional growth goals</p>
        </motion.div>

        <div className="grid gap-6">
          <motion.button
            whileHover={{ scale: 1.02 }}
            onClick={() => setShowNewGoal(true)}
            className="bg-white rounded-xl shadow-lg p-6 flex items-center justify-center gap-2 text-purple-600 hover:bg-purple-50 transition-colors"
          >
            <Plus />
            <span>New Goal</span>
          </motion.button>

          {showNewGoal && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Goal Title
                  </label>
                  <input
                    type="text"
                    value={newGoal.title}
                    onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={newGoal.description}
                    onChange={(e) => setNewGoal({ ...newGoal, description: e.target.value })}
                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                    rows={3}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Target Date
                  </label>
                  <input
                    type="date"
                    value={newGoal.targetDate}
                    onChange={(e) => setNewGoal({ ...newGoal, targetDate: e.target.value })}
                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Milestones
                  </label>
                  {newGoal.milestones.map((milestone, index) => (
                    <div key={milestone.id} className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={milestone.title}
                        onChange={(e) => {
                          const updatedMilestones = [...newGoal.milestones];
                          updatedMilestones[index].title = e.target.value;
                          setNewGoal({ ...newGoal, milestones: updatedMilestones });
                        }}
                        className="flex-1 rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                        placeholder={`Milestone ${index + 1}`}
                        required
                      />
                      {index === newGoal.milestones.length - 1 && (
                        <button
                          type="button"
                          onClick={() =>
                            setNewGoal({
                              ...newGoal,
                              milestones: [
                                ...newGoal.milestones,
                                { id: crypto.randomUUID(), title: '', completed: false }
                              ]
                            })
                          }
                          className="p-2 text-purple-600 hover:text-purple-700"
                        >
                          <Plus className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowNewGoal(false)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                  >
                    Create Goal
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          {goals.map((goal) => (
            <motion.div
              key={goal.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">{goal.title}</h3>
                  <p className="text-gray-600">{goal.description}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    Target: {new Date(goal.targetDate).toLocaleDateString()}
                  </p>
                </div>
                <div className="w-20">
                  <CircularProgressbar
                    value={goal.progress}
                    text={`${goal.progress}%`}
                    styles={buildStyles({
                      pathColor: '#9333EA',
                      textColor: '#9333EA',
                      trailColor: '#E9D5FF'
                    })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                {goal.milestones.map((milestone) => (
                  <div
                    key={milestone.id}
                    className="flex items-center justify-between p-2 rounded-lg bg-gray-50"
                  >
                    <span className={milestone.completed ? 'text-gray-500 line-through' : ''}>
                      {milestone.title}
                    </span>
                    <button
                      onClick={() => handleMilestoneComplete(goal, milestone.id)}
                      className={`p-1 rounded-full ${
                        milestone.completed
                          ? 'bg-purple-100 text-purple-600'
                          : 'bg-gray-200 text-gray-600 hover:bg-purple-100 hover:text-purple-600'
                      }`}
                    >
                      <Check className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              {goal.completed && (
                <div className="mt-4 p-2 bg-purple-50 text-purple-700 rounded-lg text-center">
                  🎉 Goal Completed! Congratulations!
                </div>
              )}

              <div className="mt-4 flex justify-end">
                <button
                  onClick={() => deleteGoal(goal.id)}
                  className="text-red-600 hover:text-red-700 flex items-center gap-1"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Delete Goal</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Goals;
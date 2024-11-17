import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Book, Calendar, BarChart2, PlusCircle } from 'lucide-react';
import { format } from 'date-fns';
import { ResponsiveCalendar } from '@nivo/calendar';
import { ResponsiveLine } from '@nivo/line';
import { useJournalStore, Emotion } from '../store/journalStore';

const emotions: { value: Emotion; label: string; color: string }[] = [
  { value: 'happy', label: 'Happy', color: '#FCD34D' },
  { value: 'sad', label: 'Sad', color: '#60A5FA' },
  { value: 'angry', label: 'Angry', color: '#F87171' },
  { value: 'anxious', label: 'Anxious', color: '#818CF8' },
  { value: 'calm', label: 'Calm', color: '#34D399' },
  { value: 'excited', label: 'Excited', color: '#F472B6' },
  { value: 'grateful', label: 'Grateful', color: '#A78BFA' }
];

const Journal = () => {
  const [showNewEntry, setShowNewEntry] = useState(false);
  const [selectedEmotion, setSelectedEmotion] = useState<Emotion | null>(null);
  const [intensity, setIntensity] = useState(5);
  const [note, setNote] = useState('');
  const [activities, setActivities] = useState<string[]>([]);

  const { entries, addEntry, getEmotionStats } = useJournalStore();
  const stats = getEmotionStats();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEmotion) return;

    addEntry({
      date: format(new Date(), 'yyyy-MM-dd'),
      emotion: selectedEmotion,
      intensity,
      note,
      activities
    });

    setShowNewEntry(false);
    setSelectedEmotion(null);
    setIntensity(5);
    setNote('');
    setActivities([]);
  };

  const calendarData = entries.map((entry) => ({
    day: entry.date,
    value: entry.intensity
  }));

  const lineData = emotions.map((emotion) => ({
    id: emotion.label,
    color: emotion.color,
    data: entries
      .filter((entry) => entry.emotion === emotion.value)
      .map((entry) => ({
        x: entry.date,
        y: entry.intensity
      }))
  }));

  return (
    <div className="min-h-screen pt-16 pb-24 md:pt-24 md:pb-16 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <Book className="w-12 h-12 mx-auto text-purple-500 mb-4" />
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Emotional Journal
          </h1>
          <p className="text-gray-600">Track your emotional journey</p>
        </motion.div>

        <div className="grid gap-6">
          {/* New Entry Form */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            onClick={() => setShowNewEntry(true)}
            className="bg-white rounded-xl shadow-lg p-6 flex items-center justify-center gap-2 text-purple-600 hover:bg-purple-50 transition-colors"
          >
            <PlusCircle />
            <span>New Journal Entry</span>
          </motion.button>

          {showNewEntry && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    How are you feeling?
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {emotions.map((emotion) => (
                      <button
                        key={emotion.value}
                        type="button"
                        onClick={() => setSelectedEmotion(emotion.value)}
                        className={`p-2 rounded-lg border transition-colors ${
                          selectedEmotion === emotion.value
                            ? 'border-purple-500 bg-purple-50 text-purple-700'
                            : 'border-gray-200 hover:border-purple-200'
                        }`}
                        style={{ borderColor: selectedEmotion === emotion.value ? emotion.color : undefined }}
                      >
                        {emotion.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Intensity (1-10)
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={intensity}
                    onChange={(e) => setIntensity(Number(e.target.value))}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>Mild</span>
                    <span>Strong</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Notes
                  </label>
                  <textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                    rows={4}
                  />
                </div>

                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowNewEntry(false)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                  >
                    Save Entry
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          {/* Calendar View */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Calendar className="text-purple-500" />
              Emotion Calendar
            </h2>
            <div className="h-48">
              <ResponsiveCalendar
                data={calendarData}
                from={format(new Date().setMonth(new Date().getMonth() - 2), 'yyyy-MM-dd')}
                to={format(new Date(), 'yyyy-MM-dd')}
                emptyColor="#f5f5f5"
                colors={['#fee2e2', '#fca5a5', '#f87171', '#ef4444', '#dc2626']}
                margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                yearSpacing={40}
                monthBorderColor="#ffffff"
                dayBorderWidth={2}
                dayBorderColor="#ffffff"
              />
            </div>
          </div>

          {/* Trends */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <BarChart2 className="text-purple-500" />
              Emotional Trends
            </h2>
            <div className="h-64">
              <ResponsiveLine
                data={lineData}
                margin={{ top: 20, right: 20, bottom: 50, left: 50 }}
                xScale={{ type: 'time', format: '%Y-%m-%d' }}
                yScale={{ type: 'linear', min: 0, max: 10 }}
                axisBottom={{
                  format: '%b %d',
                  tickRotation: -45
                }}
                pointSize={8}
                pointColor={{ theme: 'background' }}
                pointBorderWidth={2}
                pointBorderColor={{ from: 'serieColor' }}
                enableSlices="x"
                useMesh={true}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Journal;
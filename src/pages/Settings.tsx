import React from 'react';
import { motion } from 'framer-motion';
import { Settings as SettingsIcon, Bell, Moon, Sun, Volume2 } from 'lucide-react';
import { useSettingsStore } from '../store/settingsStore';

const Settings = () => {
  const {
    theme,
    notifications,
    soundEnabled,
    aiResponseTone,
    toggleTheme,
    toggleNotifications,
    toggleSound,
    setAITone
  } = useSettingsStore();

  return (
    <div className="min-h-screen pt-16 pb-24 md:pt-24 md:pb-16 px-4">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <SettingsIcon className="w-12 h-12 mx-auto text-purple-500 mb-4" />
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Settings</h1>
          <p className="text-gray-600">Customize your experience</p>
        </motion.div>

        <div className="space-y-6">
          {/* Theme Toggle */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {theme === 'dark' ? <Moon className="text-purple-500" /> : <Sun className="text-purple-500" />}
                <div>
                  <h3 className="font-semibold text-gray-800">Theme</h3>
                  <p className="text-sm text-gray-600">Switch between light and dark mode</p>
                </div>
              </div>
              <button
                onClick={toggleTheme}
                className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                  theme === 'dark' ? 'bg-purple-600' : 'bg-gray-200'
                }`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                  theme === 'dark' ? 'translate-x-6' : 'translate-x-1'
                }`} />
              </button>
            </div>
          </div>

          {/* Notifications Toggle */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bell className="text-purple-500" />
                <div>
                  <h3 className="font-semibold text-gray-800">Notifications</h3>
                  <p className="text-sm text-gray-600">Get reminders for mindfulness and activities</p>
                </div>
              </div>
              <button
                onClick={toggleNotifications}
                className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                  notifications ? 'bg-purple-600' : 'bg-gray-200'
                }`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                  notifications ? 'translate-x-6' : 'translate-x-1'
                }`} />
              </button>
            </div>
          </div>

          {/* Sound Toggle */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Volume2 className="text-purple-500" />
                <div>
                  <h3 className="font-semibold text-gray-800">Sound Effects</h3>
                  <p className="text-sm text-gray-600">Enable or disable sound effects</p>
                </div>
              </div>
              <button
                onClick={toggleSound}
                className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                  soundEnabled ? 'bg-purple-600' : 'bg-gray-200'
                }`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                  soundEnabled ? 'translate-x-6' : 'translate-x-1'
                }`} />
              </button>
            </div>
          </div>

          {/* AI Response Tone */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="font-semibold text-gray-800 mb-4">AI Response Tone</h3>
            <div className="grid grid-cols-2 gap-3">
              {['Friendly', 'Professional', 'Empathetic', 'Motivational'].map((tone) => (
                <button
                  key={tone}
                  onClick={() => setAITone(tone.toLowerCase())}
                  className={`p-2 rounded-lg border transition-colors ${
                    aiResponseTone === tone.toLowerCase()
                      ? 'border-purple-500 bg-purple-50 text-purple-700'
                      : 'border-gray-200 hover:border-purple-200'
                  }`}
                >
                  {tone}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
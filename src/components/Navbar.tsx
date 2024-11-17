import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Heart, MessageCircle, Book, Target, Gamepad2, Settings as SettingsIcon, Wind } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  const navItems = [
    { path: '/', icon: Heart, label: 'Home' },
    { path: '/chat', icon: MessageCircle, label: 'Chat' },
    { path: '/journal', icon: Book, label: 'Journal' },
    { path: '/goals', icon: Target, label: 'Goals' },
    { path: '/activities', icon: Gamepad2, label: 'Activities' },
    { path: '/mindfulness', icon: Wind, label: 'Mindfulness' },
    { path: '/settings', icon: SettingsIcon, label: 'Settings' }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-lg border-t border-gray-200 px-4 py-2 md:top-0 md:bottom-auto">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-around items-center">
          {navItems.map(({ path, icon: Icon, label }) => (
            <Link
              key={path}
              to={path}
              className={`flex flex-col items-center p-2 rounded-lg transition-all duration-200 ${
                isActive(path)
                  ? 'text-purple-600 scale-110'
                  : 'text-gray-600 hover:text-purple-500 hover:scale-105'
              }`}
            >
              <Icon className="w-6 h-6" />
              <span className="text-xs mt-1">{label}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
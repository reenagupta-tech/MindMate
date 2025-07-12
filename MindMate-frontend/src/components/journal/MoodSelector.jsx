import React from 'react';
import { Smile, Meh, Frown, Heart, Zap } from 'lucide-react';

const MoodSelector = ({ selectedMood, onMoodChange }) => {
  const moods = [
    { value: 'happy', icon: Smile, label: 'Happy', color: 'text-yellow-500' },
    { value: 'calm', icon: Heart, label: 'Calm', color: 'text-pink-500' },
    { value: 'motivated', icon: Zap, label: 'Motivated', color: 'text-blue-500' },
    { value: 'neutral', icon: Meh, label: 'Neutral', color: 'text-gray-500' },
    { value: 'sad', icon: Frown, label: 'Sad', color: 'text-blue-600' }
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {moods.map((mood) => (
        <button
          key={mood.value}
          type="button"
          onClick={() => onMoodChange(mood.value)}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-all ${
            selectedMood === mood.value
              ? 'border-primary bg-primary/10 text-primary'
              : 'border-neutral-300 dark:border-neutral-600 hover:border-primary/50 text-neutral-700 dark:text-neutral-300'
          }`}
        >
          <mood.icon className={`w-4 h-4 ${selectedMood === mood.value ? 'text-primary' : mood.color}`} />
          <span className="text-sm">{mood.label}</span>
        </button>
      ))}
    </div>
  );
};

export default MoodSelector;
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import {
  Plus, Search, Filter, Calendar,
  Smile, Meh, Frown, Heart, Zap, Edit, Trash2
} from 'lucide-react';
import Button from '../components/shared/Button';
import JournalEditor from '../components/journal/JournalEditor';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-hot-toast';
import api from "../Api/api";


const JournalPage = () => {
  const [showEditor, setShowEditor] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMood, setSelectedMood] = useState('all');
  const [entries, setEntries] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  

  const moodIcons = {
    HAPPY: { icon: Smile, color: 'text-yellow-500', bg: 'bg-yellow-100 dark:bg-yellow-900' },
    CALM: { icon: Heart, color: 'text-pink-500', bg: 'bg-pink-100 dark:bg-pink-900' },
    MOTIVATED: { icon: Zap, color: 'text-blue-500', bg: 'bg-blue-100 dark:bg-blue-900' },
    NEUTRAL: { icon: Meh, color: 'text-gray-500', bg: 'bg-gray-100 dark:bg-gray-900' },
    SAD: { icon: Frown, color: 'text-blue-600', bg: 'bg-blue-100 dark:bg-blue-900' },
    ANXIOUS: { icon: Frown, color: 'text-red-600', bg: 'bg-red-100 dark:bg-red-900' }
  };
 const token = localStorage.getItem("token");

  useEffect(() => {
    
    const fetchEntries = async () => {
      const token = localStorage.getItem("token");
      console.log(token);
      try {
        const response = await api.get('/journal', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const formatted = response.data.map(entry => ({
          ...entry,
          wordCount: entry.content.split(/\s+/).filter(Boolean).length,
          tags: [] // Add logic later if you support tags
        }));
        setEntries(formatted);
      } catch (error) {
        console.error('Failed to fetch entries:', error);
      }
    };
    fetchEntries();
  }, [token]);

  const filteredEntries = entries.filter(entry => {
    const matchesSearch = entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          entry.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesMood = selectedMood === 'all' || entry.mood === selectedMood.toUpperCase();
    return matchesSearch && matchesMood;
  });



  const handleNewEntry = () => {
    setSelectedEntry(null);
    setShowEditor(true);
  };

 const handleEditEntry = (entry) => {
  setSelectedEntry(entry);      // Load the selected entry into editor
  setShowEditor(true);          // Show editor
};

  const handleDeleteEntry = async (entryId) => {
    try {
      await api.delete(`/journal/delete/${entryId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEntries(prev => prev.filter(e => e.id !== entryId));
      toast.success("Deleted Successfully!");
    } catch (error) {
      console.error('Error deleting entry:', error);
    }
  };

  const handleSaveEntry = (newEntry) => {
    console.log("onSave triggered from JournalPage");
  setEntries(prev => [...prev, {
    ...newEntry,
    wordCount: newEntry.content.split(/\s+/).filter(Boolean).length,
    tags: []
  }]);
  setShowEditor(false);
  setSelectedEntry(null);
};

  if (showEditor) {
    return (
      <JournalEditor
        entry={selectedEntry}
        onSave={handleSaveEntry}
        onCancel={() => {
          setShowEditor(false);
          setSelectedEntry(null);
        }}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">Journal</h1>
          <p className="text-neutral-600 dark:text-neutral-400">Your personal wellness journey</p>
        </div>
        <Button onClick={handleNewEntry} variant="primary">
          <Plus className="w-4 h-4 mr-2" />
          New Entry
        </Button>
      </motion.div>

      {/* Filters */}
      <div className="flex gap-4 mt-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search entries..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full border rounded-lg"
          />
        </div>
        <div>
          <select
            value={selectedMood}
            onChange={(e) => setSelectedMood(e.target.value)}
            className="px-3 py-2 border rounded-lg"
          >
            <option value="all">All Moods</option>
            {Object.keys(moodIcons).map(mood => (
              <option key={mood} value={mood.toLowerCase()}>{mood}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Entries */}
      <div className="space-y-4 mt-6  text-neutral-900 dark:text-neutral-100">
        {filteredEntries.length === 0 ? (
          <div className="text-center text-gray-500">No entries found.</div>
        ) : (
          filteredEntries.map((entry, index) => {
            const MoodIcon = moodIcons[entry.mood] || moodIcons.NEUTRAL;
            return (
              <motion.div
                key={entry.id}
                className="p-4 border rounded-xl shadow-sm dark:bg-neutral-800"
              >
                <div className="flex justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full ${MoodIcon.bg}`}>
                      <MoodIcon.icon className={`w-5 h-5 ${MoodIcon.color}`} />
                    </div>
                    <div>
                      <h3 className="font-semibold">{entry.title}</h3>
                      <p className="text-sm text-gray-500">
                        {new Date(entry.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={() => handleEditEntry(entry.id)} variant="ghost" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button onClick={() => handleDeleteEntry(entry.id)} variant="ghost" size="sm">
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </Button>
                  </div>
                </div>
                <p className="mt-2 text-gray-700">{entry.content}</p>
                <p className="text-sm text-gray-500 mt-2">{entry.wordCount} words</p>
              </motion.div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default JournalPage;

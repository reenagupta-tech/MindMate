import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Save, Tag, Calendar, Smile, Meh, Frown, Heart, Zap } from 'lucide-react';
import Button from '../shared/Button';
import MoodSelector from './MoodSelector';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import api from "../../Api/api";

const JournalEditor = ({ entry, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
  title: entry?.title || '',
  content: entry?.content || '',
  mood: entry?.mood || 'neutral',
  tags: entry?.tags || [],
  date: entry?.date || new Date().toISOString().split('T')[0]
});

  const [tagInput, setTagInput] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
 

const handleSave = async () => {
  const token = localStorage.getItem("token");
  setIsSaving(true);
  const isEditing = Boolean(entry?.id);

  try {
    const url = isEditing
      ? `/journal/update/${entry.id}`
      : `/journal`;

    const response = await api.post(url, {
      title: formData.title,
      content: formData.content,
      mood: formData.mood.toUpperCase()
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    const data = response.data;
    toast.success(isEditing ? "Entry updated!" : "Entry created!");

    if (onSave) onSave(data);
    navigate('/journal');

  } catch (error) {
    console.error("Save error:", error);
    toast.error("Failed to save entry. Try again.");
  } finally {
    setIsSaving(false);
  }
};


  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && e.target.name === 'tag') {
      e.preventDefault();
      handleAddTag();
    }
  };


  const wordCount = formData.content.split(/\s+/).filter(word => word.length > 0).length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            onClick={onCancel}
            variant="ghost"
            size="sm"
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
              {entry ? 'Edit Entry' : 'New Entry'}
            </h1>
            <p className="text-neutral-600 dark:text-neutral-400">
              Express your thoughts and feelings
            </p>
          </div>
        </div>
        <Button
          onClick={handleSave}
          variant="primary"
          loading={isSaving}
          disabled={!formData.title.trim() || !formData.content.trim()}
          className="flex items-center gap-2"
        >
          <Save className="w-4 h-4" />
          Save Entry
        </Button>
      </div>

      {/* Editor */}
      <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-700 p-6">
        <div className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
              Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Give your entry a title..."
              className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 placeholder-neutral-500 dark:placeholder-neutral-400"
            />
          </div>

          {/* Date and Mood */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                <Calendar className="w-4 h-4 inline mr-2" />
                Date
              </label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                <Smile className="w-4 h-4 inline mr-2" />
                Mood
              </label>
              <MoodSelector
                selectedMood={formData.mood}
                onMoodChange={(mood) => setFormData({ ...formData, mood })}
              />
            </div>
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
              Content
            </label>
            <textarea
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              placeholder="Write about your day, thoughts, feelings, or anything that comes to mind..."
              rows={12}
              className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 placeholder-neutral-500 dark:placeholder-neutral-400 resize-none"
            />
            <div className="flex justify-between items-center mt-2">
              <span className="text-sm text-neutral-500 dark:text-neutral-400">
                {wordCount} words
              </span>
              <span className="text-xs text-neutral-400 dark:text-neutral-500">
                Tip: Be honest and authentic in your writing
              </span>
            </div>
          </div>

    
         
        </div>
      </div>
    </motion.div>
  );
};

export default JournalEditor;
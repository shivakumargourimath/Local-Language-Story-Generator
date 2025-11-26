/**
 * Story Form Component
 * Form to collect child's details for story generation
 */

import React, { useState } from 'react';

const StoryForm = ({ onSubmit, isLoading }) => {
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    language: 'Kannada',
    moral: 'Kindness'
  });

  // Language options
  const languages = [
    'Kannada',
    'Hindi',
    'Malayalam',
    'Tamil',
    'Telugu',
    'Marathi',
    'Bengali',
    'Gujarati',
    'English'
  ];

  // Moral values options
  const morals = [
    'Kindness',
    'Honesty',
    'Bravery',
    'Teamwork',
    'Sharing',
    'Patience',
    'Respect',
    'Gratitude',
    'Perseverance',
    'Friendship'
  ];

  /**
   * Handle input changes
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  /**
   * Handle form submission
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name.trim()) {
      alert('Please enter child\'s name');
      return;
    }
    
    if (!formData.age || formData.age < 1 || formData.age > 12) {
      alert('Please enter a valid age (1-12)');
      return;
    }

    onSubmit(formData);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        ✨ Create Your Story
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Child's Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            Child's Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter child's name"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition"
            required
            disabled={isLoading}
          />
        </div>

        {/* Age */}
        <div>
          <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-2">
            Age <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            placeholder="Enter age (1-12)"
            min="1"
            max="12"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition"
            required
            disabled={isLoading}
          />
        </div>

        {/* Language */}
        <div>
          <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-2">
            Story Language <span className="text-red-500">*</span>
          </label>
          <select
            id="language"
            name="language"
            value={formData.language}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition"
            required
            disabled={isLoading}
          >
            {languages.map(lang => (
              <option key={lang} value={lang}>{lang}</option>
            ))}
          </select>
        </div>

        {/* Moral Value */}
        <div>
          <label htmlFor="moral" className="block text-sm font-medium text-gray-700 mb-2">
            Moral/Value to Teach <span className="text-red-500">*</span>
          </label>
          <select
            id="moral"
            name="moral"
            value={formData.moral}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition"
            required
            disabled={isLoading}
          >
            {morals.map(moral => (
              <option key={moral} value={moral}>{moral}</option>
            ))}
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-4 px-6 rounded-lg font-semibold text-white transition-all duration-200 ${
            isLoading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-primary hover:bg-indigo-700 hover:shadow-lg transform hover:-translate-y-0.5'
          }`}
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating...
            </span>
          ) : (
            '🎨 Generate Story'
          )}
        </button>
      </form>
    </div>
  );
};

export default StoryForm;

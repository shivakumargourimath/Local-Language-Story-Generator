/**
 * Story History Page
 * Displays list of all saved stories
 */

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import LoadingSpinner from '../components/LoadingSpinner';
import { getStoryHistory, deleteStory } from '../services/api';

const HistoryPage = () => {
  const [stories, setStories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [deletingId, setDeletingId] = useState(null);

  /**
   * Load story history on component mount
   */
  useEffect(() => {
    loadStories();
  }, []);

  /**
   * Fetch stories from API
   */
  const loadStories = async () => {
    try {
      setError('');
      setIsLoading(true);

      const response = await getStoryHistory();
      
      if (response.success) {
        setStories(response.stories);
      }
    } catch (err) {
      setError(err.message || 'Failed to load story history');
      console.error('Load history error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handle story deletion
   */
  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this story?')) {
      return;
    }

    try {
      setDeletingId(id);
      await deleteStory(id);
      
      // Remove from local state
      setStories(stories.filter(s => s.id !== id));
    } catch (err) {
      setError(err.message || 'Failed to delete story');
      console.error('Delete story error:', err);
    } finally {
      setDeletingId(null);
    }
  };

  /**
   * Format date for display
   */
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  /**
   * Truncate story text for preview
   */
  const truncateText = (text, maxLength = 150) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Page Header */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold text-gray-800 mb-2">
                📚 Story History
              </h1>
              <p className="text-gray-600">
                {stories.length === 0 
                  ? 'No stories saved yet' 
                  : `${stories.length} ${stories.length === 1 ? 'story' : 'stories'} saved`}
              </p>
            </div>
            
            <Link
              to="/generate"
              className="mt-4 md:mt-0 inline-flex items-center px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <span className="mr-2">✨</span>
              Create New Story
            </Link>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="py-12">
              <LoadingSpinner message="Loading your stories..." />
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded mb-6">
              <p className="text-red-700">{error}</p>
            </div>
          )}

          {/* Empty State */}
          {!isLoading && stories.length === 0 && !error && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">📖</div>
              <h2 className="text-2xl font-bold text-gray-700 mb-3">
                No Stories Yet
              </h2>
              <p className="text-gray-600 mb-6">
                Start creating magical bedtime stories for your children!
              </p>
              <Link
                to="/generate"
                className="inline-flex items-center px-8 py-3 bg-primary text-white font-bold rounded-lg hover:bg-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <span className="mr-2">✨</span>
                Generate Your First Story
              </Link>
            </div>
          )}

          {/* Stories Grid */}
          {!isLoading && stories.length > 0 && (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {stories.map((story) => (
                <div
                  key={story.id}
                  className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
                >
                  {/* Story Header */}
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-4">
                    <h3 className="text-xl font-bold text-white mb-1 truncate">
                      {story.name}'s Story
                    </h3>
                    <p className="text-white/80 text-sm">
                      {formatDate(story.createdAt)}
                    </p>
                  </div>

                  {/* Story Content */}
                  <div className="p-6">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        👶 Age {story.age}
                      </span>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        🌍 {story.language}
                      </span>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                        💡 {story.moral}
                      </span>
                    </div>

                    {/* Story Preview */}
                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                      {truncateText(story.story)}
                    </p>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <Link
                        to={`/story/${story.id}`}
                        className="flex-1 text-center px-4 py-2 bg-primary text-white font-medium rounded-lg hover:bg-indigo-700 transition-all duration-200"
                      >
                        Read Story
                      </Link>
                      
                      <button
                        onClick={() => handleDelete(story.id)}
                        disabled={deletingId === story.id}
                        className="px-4 py-2 bg-red-100 text-red-600 font-medium rounded-lg hover:bg-red-200 transition-all duration-200 disabled:opacity-50"
                        title="Delete story"
                      >
                        {deletingId === story.id ? '...' : '🗑️'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default HistoryPage;

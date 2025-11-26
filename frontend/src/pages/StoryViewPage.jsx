/**
 * Story View Page
 * Individual story reading page with full content
 */

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Layout from '../components/Layout';
import LoadingSpinner from '../components/LoadingSpinner';
import AudioPlayer from '../components/AudioPlayer';
import { getStoryById, generateAudio } from '../services/api';

const StoryViewPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [story, setStory] = useState(null);
  const [audioUrl, setAudioUrl] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isGeneratingAudio, setIsGeneratingAudio] = useState(false);
  const [error, setError] = useState('');

  /**
   * Load story on component mount
   */
  useEffect(() => {
    loadStory();
  }, [id]);

  /**
   * Fetch story from API
   */
  const loadStory = async () => {
    try {
      setError('');
      setIsLoading(true);

      const response = await getStoryById(id);
      
      if (response.success) {
        setStory(response.story);
      }
    } catch (err) {
      setError(err.message || 'Failed to load story');
      console.error('Load story error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handle audio generation
   */
  const handleGenerateAudio = async () => {
    if (!story) return;

    try {
      setError('');
      setAudioUrl('');
      setIsGeneratingAudio(true);

      const audioBlob = await generateAudio(story.story, story.language);
      const url = URL.createObjectURL(audioBlob);
      setAudioUrl(url);
    } catch (err) {
      setError(err.message || 'Failed to generate audio');
      console.error('Audio generation error:', err);
    } finally {
      setIsGeneratingAudio(false);
    }
  };

  /**
   * Format date for display
   */
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <div className="mb-6">
            <button
              onClick={() => navigate('/history')}
              className="inline-flex items-center text-gray-600 hover:text-primary transition-colors duration-200"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to History
            </button>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="py-12">
              <LoadingSpinner message="Loading story..." />
            </div>
          )}

          {/* Error State */}
          {error && !isLoading && (
            <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg mb-6">
              <h3 className="text-lg font-semibold text-red-700 mb-2">Error</h3>
              <p className="text-red-600">{error}</p>
              <Link
                to="/history"
                className="inline-block mt-4 text-red-700 hover:text-red-900 font-medium"
              >
                ← Return to History
              </Link>
            </div>
          )}

          {/* Story Content */}
          {story && !isLoading && (
            <>
              {/* Story Header Card */}
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl shadow-2xl p-8 mb-8 text-white">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="text-5xl mb-4">📖</div>
                    <h1 className="text-4xl font-bold mb-3">
                      {story.name}'s Magical Story
                    </h1>
                    <p className="text-white/80 text-sm">
                      Created on {formatDate(story.createdAt)}
                    </p>
                  </div>
                </div>

                {/* Story Metadata Tags */}
                <div className="flex flex-wrap gap-3 mt-6">
                  <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-white/20 backdrop-blur-md">
                    👶 Age {story.age}
                  </span>
                  <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-white/20 backdrop-blur-md">
                    🌍 {story.language}
                  </span>
                  <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-white/20 backdrop-blur-md">
                    💡 {story.moral}
                  </span>
                </div>
              </div>

              {/* Story Content Card */}
              <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
                <div className="prose max-w-none">
                  <div className="text-gray-800 leading-relaxed whitespace-pre-wrap text-lg">
                    {story.story}
                  </div>
                </div>
              </div>

              {/* Audio Section */}
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  🎧 Audio Narration
                </h2>

                {!audioUrl && !isGeneratingAudio && (
                  <div>
                    <p className="text-gray-600 mb-4">
                      Convert this story to audio for a magical listening experience!
                    </p>
                    <button
                      onClick={handleGenerateAudio}
                      className="w-full py-3 px-6 bg-secondary text-white font-semibold rounded-lg hover:bg-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                    >
                      🔊 Generate Audio
                    </button>
                  </div>
                )}

                {isGeneratingAudio && (
                  <LoadingSpinner message="Converting story to audio..." />
                )}

                {audioUrl && (
                  <AudioPlayer audioUrl={audioUrl} />
                )}

                {error && (
                  <div className="mt-4 bg-red-50 border-l-4 border-red-500 p-4 rounded">
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link
                  to="/history"
                  className="flex-1 text-center px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-all duration-200"
                >
                  📚 Back to History
                </Link>
                
                <Link
                  to="/generate"
                  className="flex-1 text-center px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  ✨ Generate Another Story
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default StoryViewPage;

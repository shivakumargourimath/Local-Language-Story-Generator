/**
 * Generate Story Page
 * Page for generating new stories with improved UI
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import StoryForm from '../components/StoryForm';
import StoryDisplay from '../components/StoryDisplay';
import AudioPlayer from '../components/AudioPlayer';
import LoadingSpinner from '../components/LoadingSpinner';
import { generateStory, generateAudio, saveStoryToHistory } from '../services/api';

const GenerateStoryPage = () => {
  const navigate = useNavigate();
  
  // State management
  const [story, setStory] = useState('');
  const [storyMetadata, setStoryMetadata] = useState(null);
  const [audioUrl, setAudioUrl] = useState('');
  const [savedStoryId, setSavedStoryId] = useState(null);
  const [isGeneratingStory, setIsGeneratingStory] = useState(false);
  const [isGeneratingAudio, setIsGeneratingAudio] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  /**
   * Handle story generation
   */
  const handleGenerateStory = async (formData) => {
    try {
      setError('');
      setSuccessMessage('');
      setStory('');
      setAudioUrl('');
      setSavedStoryId(null);
      setIsGeneratingStory(true);

      const response = await generateStory(formData);

      if (response.success) {
        setStory(response.story);
        setStoryMetadata(response.metadata);
      } else {
        setError(response.error || 'Failed to generate story');
      }
    } catch (err) {
      setError(err.message || 'An error occurred while generating the story');
      console.error('Story generation error:', err);
    } finally {
      setIsGeneratingStory(false);
    }
  };

  /**
   * Handle audio generation
   */
  const handleGenerateAudio = async () => {
    if (!story || !storyMetadata) {
      setError('Please generate a story first');
      return;
    }

    try {
      setError('');
      setSuccessMessage('');
      setAudioUrl('');
      setIsGeneratingAudio(true);

      const audioBlob = await generateAudio(story, storyMetadata.language);
      const url = URL.createObjectURL(audioBlob);
      setAudioUrl(url);
      setSuccessMessage('Audio generated successfully! 🎧');
    } catch (err) {
      setError(err.message || 'An error occurred while generating audio');
      console.error('Audio generation error:', err);
    } finally {
      setIsGeneratingAudio(false);
    }
  };

  /**
   * Save story to history
   */
  const handleSaveStory = async () => {
    if (!story || !storyMetadata) {
      setError('No story to save');
      return;
    }

    try {
      setError('');
      setSuccessMessage('');
      setIsSaving(true);

      const response = await saveStoryToHistory({
        name: storyMetadata.name,
        age: storyMetadata.age,
        language: storyMetadata.language,
        moral: storyMetadata.moral,
        story: story
      });

      if (response.success) {
        setSavedStoryId(response.story.id);
        setSuccessMessage('Story saved to history! 💾');
      }
    } catch (err) {
      setError(err.message || 'Failed to save story');
      console.error('Save story error:', err);
    } finally {
      setIsSaving(false);
    }
  };

  /**
   * Navigate to story history
   */
  const handleViewHistory = () => {
    navigate('/history');
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-3">
              ✨ Generate Your Story
            </h1>
            <p className="text-gray-600 text-lg">
              Fill in the details below to create a magical bedtime story
            </p>
          </div>

          {/* Story Input Form */}
          <StoryForm 
            onSubmit={handleGenerateStory} 
            isLoading={isGeneratingStory} 
          />

          {/* Loading Spinner */}
          {isGeneratingStory && (
            <div className="mt-8">
              <LoadingSpinner message="Creating your magical story..." />
            </div>
          )}

          {/* Success Message */}
          {successMessage && (
            <div className="mt-8 bg-green-50 border-l-4 border-green-500 p-4 rounded">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-green-700">{successMessage}</p>
                </div>
              </div>
            </div>
          )}

          {/* Error Display */}
          {error && (
            <div className="mt-8 bg-red-50 border-l-4 border-red-500 p-4 rounded">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}

          {/* Story Display */}
          {story && (
            <div className="mt-8">
              <StoryDisplay 
                story={story} 
                metadata={storyMetadata}
                onGenerateAudio={handleGenerateAudio}
                isGeneratingAudio={isGeneratingAudio}
              />

              {/* Save to History Button */}
              {!savedStoryId && (
                <div className="mt-6">
                  <button
                    onClick={handleSaveStory}
                    disabled={isSaving}
                    className={`w-full py-3 px-6 rounded-lg font-semibold text-white transition-all duration-200 ${
                      isSaving
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-green-600 hover:bg-green-700 hover:shadow-lg transform hover:-translate-y-0.5'
                    }`}
                  >
                    {isSaving ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Saving...
                      </span>
                    ) : (
                      '💾 Save to History'
                    )}
                  </button>
                </div>
              )}

              {/* View History Button (after saving) */}
              {savedStoryId && (
                <div className="mt-6">
                  <button
                    onClick={handleViewHistory}
                    className="w-full py-3 px-6 rounded-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
                  >
                    📖 View Story History
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Audio Loading */}
          {isGeneratingAudio && (
            <div className="mt-8">
              <LoadingSpinner message="Converting story to audio..." />
            </div>
          )}

          {/* Audio Player */}
          {audioUrl && (
            <div className="mt-8">
              <AudioPlayer audioUrl={audioUrl} />
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default GenerateStoryPage;

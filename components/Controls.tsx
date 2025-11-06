import React from 'react';
import { Language } from '../types';
import { LANGUAGES } from '../constants';
import { PlayIcon, PauseIcon, NextIcon, PrevIcon, LoadingSpinner, HomeIcon } from './icons';

interface ControlsProps {
  onNext: () => void;
  onPrev: () => void;
  onPlayPause: () => void;
  onLanguageChange: (lang: Language) => void;
  onGoHome: () => void;
  currentLanguage: Language;
  slideIndex: number;
  totalSlides: number;
  isLoadingAudio: boolean;
  isPlaying: boolean;
}

const Controls: React.FC<ControlsProps> = ({
  onNext,
  onPrev,
  onPlayPause,
  onLanguageChange,
  onGoHome,
  currentLanguage,
  slideIndex,
  totalSlides,
  isLoadingAudio,
  isPlaying,
}) => {
  const isFirstSlide = slideIndex === 0;
  const isLastSlide = slideIndex === totalSlides - 1;

  const playPauseButtonClasses = `
    text-white rounded-full p-4 focus:outline-none shadow-lg transform hover:scale-105 
    transition-all duration-200 w-20 h-20 flex items-center justify-center
    disabled:opacity-75 disabled:cursor-wait
    ${
      isPlaying
        ? 'bg-orange-500 hover:bg-orange-600 focus:ring-4 focus:ring-orange-300'
        : 'bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300'
    }
  `;

  return (
    <div className="sticky bottom-0 left-0 right-0 w-full bg-white/70 backdrop-blur-md shadow-t-lg p-4 z-10">
      <div className="max-w-4xl mx-auto">
        {/* Top Row: Language */}
        <div className="flex justify-center items-center gap-4 mb-4">
          <div className="flex justify-center items-center gap-2">
            {LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                onClick={() => onLanguageChange(lang.code)}
                className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors duration-200 ${
                  currentLanguage === lang.code
                    ? 'bg-blue-500 text-white shadow-md'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {lang.name}
              </button>
            ))}
          </div>
        </div>

        {/* Playback Controls */}
        <div className="flex justify-center items-center gap-4 md:gap-8">
           <button
            onClick={onGoHome}
            aria-label="Go to Home"
            className="text-gray-700 p-3 rounded-full hover:bg-gray-200 transition-colors absolute left-4 md:left-8"
          >
            <HomeIcon />
          </button>

          <button
            onClick={onPrev}
            disabled={isFirstSlide}
            aria-label="Previous slide"
            className="text-gray-700 disabled:text-gray-300 disabled:cursor-not-allowed p-3 rounded-full hover:bg-gray-200 transition-colors"
          >
            <PrevIcon />
          </button>

          <button
            onClick={onPlayPause}
            aria-label={isPlaying ? "Pause audio" : "Play audio"}
            className={playPauseButtonClasses}
            disabled={isLoadingAudio}
          >
            {isLoadingAudio ? <LoadingSpinner /> : isPlaying ? <PauseIcon /> : <PlayIcon />}
          </button>

          <button
            onClick={onNext}
            disabled={isLastSlide}
            aria-label="Next slide"
            className="text-gray-700 disabled:text-gray-300 disabled:cursor-not-allowed p-3 rounded-full hover:bg-gray-200 transition-colors"
          >
            <NextIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Controls;

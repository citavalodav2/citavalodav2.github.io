
import React from 'react';
import { Slide, Language } from '../types';

interface StoryViewerProps {
  slide: Slide;
  language: Language;
}

const StoryViewer: React.FC<StoryViewerProps> = ({ slide, language }) => {
  return (
    <div className="flex flex-col items-center justify-center p-4 md:p-6 flex-grow w-full">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden aspect-video mb-6 transition-all duration-500 ease-in-out">
        <img src={slide.image} alt="Story visual" className="w-full h-full object-cover" />
      </div>
      <div className="w-full max-w-4xl bg-white/80 backdrop-blur-sm p-5 md:p-6 rounded-2xl shadow-lg">
        <p className="text-2xl md:text-3xl lg:text-4xl text-center text-gray-800 font-serif leading-relaxed">
          {slide.text[language]}
        </p>
      </div>
    </div>
  );
};

export default StoryViewer;

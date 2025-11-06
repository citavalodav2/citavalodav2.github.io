import React, { useState, useRef, useCallback } from 'react';
import { Language, Story } from '../types';
import { generateSpeech } from '../services/geminiService';
import StoryViewer from '../components/StoryViewer';
import Controls from '../components/Controls';

// Helper to decode base64 string to Uint8Array
function decode(base64: string): Uint8Array {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

// Helper to decode raw PCM audio data into an AudioBuffer
async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

interface AudiobookPlayerProps {
    story: Story;
    onGoHome: () => void;
}

const AudiobookPlayer: React.FC<AudiobookPlayerProps> = ({ story, onGoHome }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [language, setLanguage] = useState<Language>(Language.EN);
  const [isLoadingAudio, setIsLoadingAudio] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const audioContextRef = useRef<AudioContext | null>(null);
  const audioSourceRef = useRef<AudioBufferSourceNode | null>(null);

  const stopAudio = useCallback(() => {
    if (audioSourceRef.current) {
      audioSourceRef.current.stop();
      audioSourceRef.current.disconnect();
      audioSourceRef.current = null;
    }
    setIsPlaying(false);
  }, []);

  const handlePlayPause = async () => {
    if (isPlaying) {
      stopAudio();
      return;
    }

    setIsLoadingAudio(true);
    setIsPlaying(false);

    try {
      if (!audioContextRef.current) {
        const AudioCtxt = window.AudioContext || (window as any).webkitAudioContext;
        audioContextRef.current = new AudioCtxt({ sampleRate: 24000 });
      }
      if (audioContextRef.current.state === 'suspended') {
        await audioContextRef.current.resume();
      }

      const textToSpeak = story.slides[currentSlideIndex].text[language];
      const base64Audio = await generateSpeech(textToSpeak);
      
      const audioBytes = decode(base64Audio);
      const audioBuffer = await decodeAudioData(audioBytes, audioContextRef.current, 24000, 1);
      
      stopAudio(); // Stop any previous sound before playing a new one

      const source = audioContextRef.current.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(audioContextRef.current.destination);
      source.onended = () => {
        setIsPlaying(false);
        audioSourceRef.current = null;
      };

      source.start();
      audioSourceRef.current = source;
      setIsPlaying(true);
    } catch (error) {
      console.error("Failed to play audio:", error);
      alert("Sorry, there was an error generating the audio. Please try again.");
    } finally {
      setIsLoadingAudio(false);
    }
  };

  const handleNext = () => {
    stopAudio();
    setCurrentSlideIndex(prev => Math.min(prev + 1, story.slides.length - 1));
  };

  const handlePrev = () => {
    stopAudio();
    setCurrentSlideIndex(prev => Math.max(prev - 1, 0));
  };
  
  const handleLanguageChange = (lang: Language) => {
    stopAudio();
    setLanguage(lang);
  };
  
  const handleGoHome = () => {
    stopAudio();
    onGoHome();
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="p-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-blue-800 tracking-tight">
          {story.title}
        </h1>
      </header>
      <main className="flex-grow flex flex-col justify-center items-center pb-40">
        <StoryViewer 
          slide={story.slides[currentSlideIndex]} 
          language={language} 
        />
      </main>
      <Controls
        onNext={handleNext}
        onPrev={handlePrev}
        onPlayPause={handlePlayPause}
        onLanguageChange={handleLanguageChange}
        onGoHome={handleGoHome}
        currentLanguage={language}
        slideIndex={currentSlideIndex}
        totalSlides={story.slides.length}
        isLoadingAudio={isLoadingAudio}
        isPlaying={isPlaying}
      />
    </div>
  );
};

export default AudiobookPlayer;
